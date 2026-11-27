import copy
import hashlib
import json
import os
from pathlib import Path
import sys
import urllib.parse
import urllib.request
import uuid

OUT = Path('D:/BaiduNetdiskDownload/codex-DP-1/ceshistitch/outputs/order-fulfillment-images')
SOURCE = OUT / 'assets'
API = 'https://axzpb83z.api.sanity.io/v2025-05-23'
POST = 'post-order-fulfillment'
TOKEN = os.environ.get('SANITY_WRITE_TOKEN', '')
OPENER = urllib.request.build_opener(urllib.request.ProxyHandler({'https': 'http://127.0.0.1:11304'}))
SPECS = [{'file': '01-order-fulfillment-packing-line.jpg', 'name': 'order-fulfillment-packing-line.jpg', 'key': 'order-fulfillment-packing-line', 'anchor': 'block-54', 'anchorText': 'Fragile, temperature-sensitive', 'alt': 'Warehouse packing stations beside a conveyor carrying outbound cartons', 'caption': 'Packing stations check and prepare orders before parcels move to outbound handling.'}, {'file': '02-goods-to-person-picking.jpg', 'name': 'order-fulfillment-goods-to-person.jpg', 'key': 'order-fulfillment-goods-to-person', 'anchor': 'block-112', 'anchorText': 'These stations can also be equipped', 'alt': 'Operator picking products from mobile totes at a goods-to-person workstation', 'caption': 'Goods-to-person workflows bring storage units to a fixed picking workstation.'}, {'file': '03-warehouse-fulfillment-workstations.jpg', 'name': 'order-fulfillment-warehouse-workstations.jpg', 'key': 'order-fulfillment-warehouse-workstations', 'anchor': 'block-2', 'anchorText': 'Order fulfillment covers the entire process', 'alt': 'Warehouse racks and connected conveyor workstations for order fulfillment', 'caption': 'Storage, picking and packing operations need to work together to keep orders moving.'}, {'file': '04-packing-capacity-workstations.jpg', 'name': 'order-fulfillment-packing-capacity.jpg', 'key': 'order-fulfillment-packing-capacity', 'anchor': 'block-120', 'anchorText': 'If products arrive from several picking zones', 'alt': 'Multiple packing workstations alongside a conveyor with blue order totes', 'caption': 'Packing capacity and the flow of incoming items affect how quickly picked orders can be shipped.'}, {'file': '05-pallet-agv-warehouse-clean.png', 'name': 'order-fulfillment-pallet-agv.png', 'key': 'order-fulfillment-pallet-agv', 'anchor': 'block-113', 'anchorText': 'For small products and a large number of SKUs', 'alt': 'Automated forklift moving palletized goods through a warehouse staging area', 'caption': 'Pallet-handling AGVs can take over repetitive transport between warehouse work areas.'}]


def save(name, data):
    (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def request(path, payload=None, binary=None):
    headers = {'User-Agent': 'Mozilla/5.0', 'Content-Type': ('image/png' if binary.startswith(b'\x89PNG') else 'image/jpeg') if binary is not None else 'application/json'}
    if TOKEN:
        headers['Authorization'] = 'Bearer ' + TOKEN
    data = binary if binary is not None else json.dumps(payload).encode() if payload is not None else None
    with OPENER.open(urllib.request.Request(API + path, data=data, headers=headers), timeout=90) as response:
        return json.load(response)


def query(q):
    return request('/data/query/production?' + urllib.parse.urlencode({'query': q}))['result']


def mutate(items, dry=False):
    return request('/data/mutate/production' + ('?dryRun=true' if dry else ''), {'mutations': items})


def preflight():
    assert TOKEN, 'SANITY_WRITE_TOKEN is required'
    post = query('*[_id==' + json.dumps(POST) + '][0]')
    assert post and post['_type'] == 'post' and post['slug']['current'] == 'order-fulfillment'
    assert len(post['body']) == 145, 'Inspect the post before changing its body'
    assert not any(b.get('_key') in {s['key'] for s in SPECS} for b in post['body']), 'Images already present; verify instead of publishing again'
    for spec in SPECS:
        blocks = [b for b in post['body'] if b.get('_key') == spec['anchor']]
        assert len(blocks) == 1 and ''.join(c.get('text', '') for c in blocks[0].get('children', [])).startswith(spec['anchorText'])
    verified_files = json.loads((OUT / 'verification.json').read_text(encoding='utf-8'))['files']
    expected = {Path(row['file']).name: row['sha256'] for row in verified_files}
    for spec in SPECS:
        assert hashlib.sha256((SOURCE / spec['file']).read_bytes()).hexdigest() == expected[spec['file']]
    check = 'token-capability-check-' + uuid.uuid4().hex
    mutate([{'create': {'_id': check, '_type': 'tokenCapabilityCheck', 'state': 'created'}}, {'patch': {'id': check, 'set': {'state': 'updated'}}}, {'patch': {'id': POST, 'ifRevisionID': post['_rev'], 'set': {'title': post['title']}}}], True)
    mutate([{'create': {'_id': 'image-' + uuid.uuid4().hex + '00000000-1672x941-png', '_type': 'sanity.imageAsset', 'originalFilename': SPECS[0]['name'], 'mimeType': 'image/png', 'size': 100}}], True)
    print('Authenticated target read, document create/update and asset create dry runs passed', flush=True)
    return post


def publish():
    post = preflight()
    save('before-images.json', post)
    assets = []
    for spec in SPECS:
        raw = (SOURCE / spec['file']).read_bytes()
        sha1 = hashlib.sha1(raw).hexdigest()
        asset = query('*[_type=="sanity.imageAsset" && sha1hash==' + json.dumps(sha1) + '][0]')
        if not asset:
            asset = request('/assets/images/production?' + urllib.parse.urlencode({'filename': spec['name']}), binary=raw)['document']
        assert asset['sha1hash'] == sha1
        spec['asset'] = {'_type': 'reference', '_ref': asset['_id']}
        assets.append({'key': spec['key'], 'id': asset['_id'], 'url': asset['url'], 'sha1': sha1, 'source': str(SOURCE / spec['file'])})
        save('uploaded-assets.json', assets)
        print('Asset ready: ' + spec['name'], flush=True)
    body = []
    for block in post['body']:
        body.append(block)
        for spec in SPECS:
            if block.get('_key') == spec['anchor']:
                body.append({'_type': 'imageWithAlt', '_key': spec['key'], **{k: spec[k] for k in ['asset', 'alt', 'caption']}})
    patch = {'patch': {'id': POST, 'ifRevisionID': post['_rev'], 'set': {'body': body}}}
    mutate([patch], True)
    result = mutate([patch])
    save('image-publication.json', {'post': POST, 'transactionId': result.get('transactionId'), 'images': len(assets)})
    updated = query('*[_id==' + json.dumps(POST) + '][0]')
    assert updated['body'] == body
    assert [b for b in updated['body'] if b.get('_key') not in {s['key'] for s in SPECS}] == post['body']
    for key, value in post.items():
        if key not in ['_rev', '_updatedAt', 'body']:
            assert updated[key] == value, key
    save('after-images.json', updated)
    print('Published five inline images. Original text, publication date, SEO and cover fields are unchanged.', flush=True)


if '--publish' in sys.argv:
    publish()
else:
    preflight()
