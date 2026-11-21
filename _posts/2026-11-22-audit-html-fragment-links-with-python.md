---
layout: post
date: 2026-11-22
title: "静态网页上线前，用 Python 检查页内锚点"
description: "用 Python 标准库检查生成后的 HTML，找出目录链接跳不到的位置和重复的 id。"
categories: [Blog, 编程入门]
tags: [Python, HTML, 静态网站, 项目实践]
author: Jake Tao
---

# 静态网页上线前，用 Python 检查页内锚点

给课程笔记、项目文档加上目录后，读者点一下就能跳到对应小节。假设你把模板里的 `id="setup"` 改成了 `id="installation"`，旧目录还是指向 `#setup`。整个页面照样返回 HTTP 200，点击却不会到达安装说明。单测如果只看状态码，也不会发现这个改动。

把检查放到构建后，直接读浏览器将收到的 HTML。这样也能看到两处模板渲染出同一个 ID，或者构建时某个标题根本没有输出的问题。

## 从 HTML 提取链接和目标

处理以 `#` 开头的链接时，先对片段做 URL 解码，再按原文查找 ID。中文标题的片段可以写成百分号编码。`a+b` 里的加号会保留，所以这里用 `unquote`。

保存 ID 对应的行号列表。缺少目标时，行号能定位到链接。发现重复目标时，行号列表能指出所有定义的位置。

```python
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit


class DocumentLinks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = {}
        self.local_fragments = []

    def handle_starttag(self, tag, raw_attrs):
        attrs = dict(raw_attrs)
        element_id = attrs.get('id')
        if element_id:
            self.ids.setdefault(element_id, []).append(self.getpos()[0])
        if tag != 'a':
            return
        href = attrs.get('href') or ''
        if href.startswith('#') and len(href) > 1:
            self.local_fragments.append((self.getpos()[0], unquote(urlsplit(href).fragment)))


def review(document):
    parser = DocumentLinks()
    parser.feed(document)
    parser.close()
    return {
        'fragment_links': len(parser.local_fragments),
        'missing_targets': [(line, fragment) for line, fragment in parser.local_fragments if fragment not in parser.ids],
        'duplicate_ids': {target: lines for target, lines in parser.ids.items() if len(lines) > 1},
    }
```

把代码保存成 `fragment_audit.py`。构建后在同一目录下运行下面的命令，把 `output.html` 改成实际生成的文件名。

```bash
python -c "from pathlib import Path; from fragment_audit import review; print(review(Path('output.html').read_text(encoding='utf-8')))"
```

## 用六行 HTML 做一次回归检查

把这段保存为 `output.html`。

```html
<a href="#first">第一节</a>
<a href="#%E6%96%87%E6%A1%A3">文档</a>
<a href="#lost">丢失的小节</a>
<section id="first"></section>
<div id="文档"></div>
<div id="first"></div>
```

预期报告有 3 个片段链接。编码后的中文片段能匹配 `文档`，第 3 行的 `lost` 进入缺失列表，`first` 在第 4 和第 6 行重复。

11 月 21 日，我用同一段代码抽查了 [资料星球](https://resources.packscena.com/) 的 3 份公开 HTML。全部资料页和一个分类页各有 1 个页内锚点链接，一份详情页有 4 个。这 6 个链接都找到了目标，三个页面均未发现重复 ID。把相同检查放进构建产物目录，可以逐页执行并保存报告。

这段脚本只处理当前 HTML 文档里的片段链接。跨页面链接、JavaScript 动态插入的节点、旧式 `name` 锚点和浏览器文本片段需要另测。跳转到主内容的无障碍快捷链接也值得用键盘走一次，依次确认 Tab 聚焦时链接可见，按回车后能接着从主内容操作。

署名 Jake Tao，资料星球运营者。本文由 AI 协助整理并复核运行结果。
