# -*- coding: utf-8 -*-
"""压缩 assets/images 下的 jpg/png，同名覆盖，保留原始格式与文件名。"""
import os, glob, io
from PIL import Image

IMG = r'E:\future\yhb\04-项目与开源\Duckweed-yhb.github.io\assets\images'
report = []

def size_of(path):
    return os.path.getsize(path)

for path in sorted(glob.glob(os.path.join(IMG, '*'))):
    ext = os.path.splitext(path)[1].lower()
    if ext not in ('.jpg', '.jpeg', '.png'):
        continue
    before = size_of(path)
    im = Image.open(path)
    orig_mode = im.mode

    if ext in ('.jpg', '.jpeg'):
        # JPEG：重编码 quality=82，渐进式，保留 EXIF 中必要的 ICC 信息尽量简化
        im = im.convert('RGB')
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=82, optimize=True, progressive=True)
        data = buf.getvalue()
    else:
        # PNG：先做常规 optimize，再尝试 256 色量化，取更小者
        buf1 = io.BytesIO()
        im.save(buf1, 'PNG', optimize=True)
        d1 = buf1.getvalue()
        buf2 = io.BytesIO()
        try:
            q = im.convert('RGB').quantize(colors=256, method=2, dither=Image.Dither.FLOYDSTEINBERG)
            q.save(buf2, 'PNG', optimize=True)
            d2 = buf2.getvalue()
        except Exception:
            d2 = b'\xff' * (len(d1) + 1)
        data = d1 if len(d1) <= len(d2) else d2

    after = len(data)
    pct = (1 - after / before) * 100 if before else 0
    if after < before:
        with open(path, 'wb') as f:
            f.write(data)
        report.append((os.path.basename(path), before, after, pct))

total_b, total_a = 0, 0
print(f'{"文件":<45}{"压缩前":>8}{"压缩后":>8}{"节省%":>8}')
for name, b, a, p in report:
    print(f'{name:<45}{b//1024:>6}KB{a//1024:>6}KB{p:>7.1f}%')
    total_b += b; total_a += a
print(f'共压缩 {len(report)} 个文件，{total_b//1024}KB → {total_a//1024}KB，节省 {100*(1-total_a/total_b):.1f}%')
