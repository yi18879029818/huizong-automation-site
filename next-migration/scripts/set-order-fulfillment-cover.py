import copy
import json
import os
from pathlib import Path
import sys
from urllib.parse import urlencode
from urllib.request import build_opener, ProxyHandler, Request
import uuid

OUT = Path('D:/BaiduNetdiskDownload/codex-DP-1/ceshistitch/outputs/order-fulfillment-images')
API = 'https://axzpb83z.api.sanity.io/v2025-05-23/data'
POST = 'post-order-fulfillment'
ASSET = 'image-d04f61db2be51202c999b18cec244217377e7547-1024x1024-jpg'
TOKEN = os.environ.get('SANITY_WRITE_TOKEN', '')
OPENER = build_opener(ProxyHandler({'https': 'http://127.0.0.1:11304'}))


def request(path, data=None):
    headers = {'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
    if TOKEN:
        headers['Authorization'] = 'Bearer ' + TOKEN
    req = Request(API + path, data=json.dumps(data).encode() if data is not None else None, headers=headers)
    with OPENER.open(req, timeout=60) as response:
        return json.load(response)


def query(q):
    return request('/query/production?' + urlencode({'query': q}))['result']


assert TOKEN, 'SANITY_WRITE_TOKEN is required'
post = query('*[_id==' + json.dumps(POST) + '][0]')
assert post and post['slug']['current'] == 'order-fulfillment'
assert len(post['body']) == 150
assert len([b for b in post['body'] if b['_type'] == 'imageWithAlt']) == 5
asset = query('*[_id==' + json.dumps(ASSET) + '][0]')
assert asset and asset['_type'] == 'sanity.imageAsset'
source = next(b for b in post['body'] if b['_type'] == 'imageWithAlt' and b['asset']['_ref'] == ASSET)
cover = {'_type': 'imageWithAlt', 'asset': copy.deepcopy(source['asset']), 'alt': source['alt']}
seo = copy.deepcopy(post['seo'])
seo['ogImage'] = copy.deepcopy(cover)
patch = {'patch': {'id': POST, 'ifRevisionID': post['_rev'], 'set': {'heroImage': cover, 'seo': seo}}}
check = 'token-capability-check-' + uuid.uuid4().hex
request('/mutate/production?dryRun=true', {'mutations': [
    {'create': {'_id': check, '_type': 'tokenCapabilityCheck', 'state': 'created'}},
    {'patch': {'id': check, 'set': {'state': 'updated'}}}, patch
]})
print('Authenticated read and document create/update dry runs passed; existing asset verified', flush=True)
if '--publish' in sys.argv:
    (OUT / 'before-cover.json').write_text(json.dumps(post, ensure_ascii=False, indent=2), encoding='utf-8')
    result = request('/mutate/production', {'mutations': [patch]})
    updated = query('*[_id==' + json.dumps(POST) + '][0]')
    assert updated['heroImage'] == cover and updated['seo'] == seo
    for key, value in post.items():
        if key not in ['_rev', '_updatedAt', 'heroImage', 'seo']:
            assert updated[key] == value, key
    (OUT / 'after-cover.json').write_text(json.dumps(updated, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'cover-publication.json').write_text(json.dumps({'post': POST, 'asset': ASSET, 'transactionId': result.get('transactionId')}, indent=2), encoding='utf-8')
    print('Third image set as article and sharing cover; body and publication date preserved', flush=True)
