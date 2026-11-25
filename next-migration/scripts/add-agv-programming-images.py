import copy
import hashlib
import json
import os
from pathlib import Path
import sys
import urllib.parse
import urllib.request
import uuid

OUT = Path('D:/BaiduNetdiskDownload/codex-DP-1/ceshistitch/outputs/agv-programming-images')
SOURCE = Path('D:/推文文件/所有博文/博文11.25/已去标识')
API = 'https://axzpb83z.api.sanity.io/v2025-05-23'
POST = 'post-agv-programming'
TOKEN = os.environ.get('SANITY_WRITE_TOKEN', '')
OPENER = urllib.request.build_opener(urllib.request.ProxyHandler({'https': 'http://127.0.0.1:11304'}))
SPECS = [
    {'file': '01-AGV调度界面-去标识.png', 'name': 'agv-programming-route-interface.png', 'key': 'agv-programming-route-interface', 'anchor': 'block-22', 'anchorText': 'For more on how these navigation methods work', 'alt': 'AGV programming interface showing route nodes, vehicle positions and transport task status', 'caption': 'Example of route nodes, vehicle positions and transport task status in AGV configuration software.'},
    {'file': '02-系统架构图-去标识.png', 'name': 'agv-programming-system-architecture.png', 'key': 'agv-programming-system-architecture', 'anchor': 'block-44', 'anchorText': 'When multiple AGVs operate together', 'alt': 'Diagram connecting ERP, MES and WMS systems with PLC controls, equipment and mobile robots', 'caption': 'Illustrative relationships between enterprise systems, equipment controls and mobile robots.'},
    {'file': '03-滚筒AGV现场-去标识.png', 'name': 'agv-programming-roller-transfer.png', 'key': 'agv-programming-roller-transfer', 'anchor': 'block-42', 'anchorText': 'Once the conveyor sends a ready signal', 'alt': 'Roller-top AGV positioned beside a conveyor workstation for load transfer', 'caption': 'A roller-top AGV at a conveyor workstation.'},
    {'file': '04-仓储叉车AGV-去标识.png', 'name': 'agv-programming-forklift-warehouse.png', 'key': 'agv-programming-forklift-warehouse', 'anchor': 'block-50', 'anchorText': 'For forklift AGVs, verify fork movements', 'alt': 'Automated forklift operating between pallet storage racks in a warehouse', 'caption': 'An automated forklift operating between pallet storage racks.'}
]


def save(name, data):
    (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def request(path, payload=None, binary=None):
    headers = {'Content-Type': 'image/png' if binary is not None else 'application/json'}
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
    assert post and post['_type'] == 'post' and post['slug']['current'] == 'agv-programming'
    assert len(post['body']) == 69, 'Inspect the post before changing its body'
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
    cover = {'_type': 'imageWithAlt', 'asset': SPECS[0]['asset'], 'alt': SPECS[0]['alt']}
    seo = copy.deepcopy(post['seo'])
    seo['ogImage'] = copy.deepcopy(cover)
    patch = {'patch': {'id': POST, 'ifRevisionID': post['_rev'], 'set': {'body': body, 'heroImage': cover, 'seo': seo}}}
    mutate([patch], True)
    result = mutate([patch])
    save('image-publication.json', {'post': POST, 'transactionId': result.get('transactionId'), 'cover': assets[0]['id']})
    updated = query('*[_id==' + json.dumps(POST) + '][0]')
    assert updated['body'] == body and updated['heroImage'] == cover and updated['seo'] == seo
    assert [b for b in updated['body'] if b.get('_key') not in {s['key'] for s in SPECS}] == post['body']
    for key, value in post.items():
        if key not in ['_rev', '_updatedAt', 'body', 'heroImage', 'seo']:
            assert updated[key] == value, key
    save('after-images.json', updated)
    print('Published four inline images; first image is the hero and Open Graph cover. Original content and publication date are unchanged.', flush=True)


if '--publish' in sys.argv:
    publish()
else:
    preflight()
