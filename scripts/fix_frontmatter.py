# -*- coding: utf-8 -*-
"""为缺失 permalink / description 的文章补齐字段，统一干净 URL 规范。"""
import re, os, glob, json

POSTS = r'E:\future\yhb\04-项目与开源\Duckweed-yhb.github.io\_posts'

# 特殊 slug 修正（与 README 生成器约定保持一致）
SPECIAL_SLUGS = {
    "2026-02-21-Welcome to Duckweed's Space.md": 'welcome-to-duckweeds-space',
    "2026-08-29-读《给各位天命人的劝退信》.md": '读给天命人的劝退信',
}

def extract_desc(body):
    """从正文提取首段作为 description（去 markdown，截断 120 字）。"""
    lines = body.split('\n')
    cur, paras = [], []
    for ln in lines:
        s = ln.strip()
        if not s:
            if cur:
                paras.append(' '.join(cur)); cur = []
            continue
        cur.append(s)
    if cur:
        paras.append(' '.join(cur))
    for p in paras:
        if p.startswith('#'):
            continue
        p = re.sub(r'!\[.*?\]\(.*?\)', '', p)
        p = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', p)
        p = re.sub(r'`([^`]*)`', r'\1', p)
        p = re.sub(r'[*_>#~|]', '', p)
        p = re.sub(r'<[^>]+>', '', p)
        p = re.sub(r'\s+', ' ', p).strip()
        if len(p) < 20:
            continue
        if len(p) > 120:
            p = p[:119].rstrip() + '…'
        return p
    return None

changed_perm, changed_desc = [], []
for path in sorted(glob.glob(os.path.join(POSTS, '*.md'))):
    name = os.path.basename(path)
    m = re.match(r'^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$', name)
    if not m:
        continue
    with open(path, 'r', newline='', encoding='utf-8') as f:
        text = f.read()
    fm_match = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not fm_match:
        print(f'跳过（无 front matter）: {name}')
        continue
    fm = fm_match.group(1)
    body = text[fm_match.end():]
    lines = fm.split('\n')

    has_perm = any(l.strip().startswith('permalink:') for l in lines)
    has_desc = any(l.strip().startswith('description:') for l in lines)
    year, month, day = m.group(1), m.group(2), m.group(3)
    slug = SPECIAL_SLUGS.get(name, m.group(4).replace(' ', '-'))

    desc_text = None
    if not has_desc:
        desc_text = extract_desc(body)

    out = []
    for line in lines:
        out.append(line)
        st = line.strip()
        if st.startswith('title:') and not has_desc and desc_text:
            safe = json.dumps(desc_text, ensure_ascii=False)
            out.append(f'description: {safe}')
        if st.startswith('date:') and not has_perm:
            out.append(f'permalink: /{year}/{month}/{day}/{slug}/')

    new_text = '---\n' + '\n'.join(out) + '\n---\n' + body
    if new_text != text:
        with open(path, 'w', newline='', encoding='utf-8') as f:
            f.write(new_text)
        if not has_perm:
            changed_perm.append(name)
        if not has_desc:
            changed_desc.append(name)

print(f'补 permalink: {len(changed_perm)} 篇')
for n in changed_perm:
    print('  +', n)
print(f'补 description: {len(changed_desc)} 篇')
