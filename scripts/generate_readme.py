"""生成仓库 README.md（最新博客 + 项目结构）。

由 .github/workflows/update-readme.yml 在每次 push 后自动执行。
修复要点（2026-11-16）：
  1. 目录树先过滤再计算「是不是最后一项」，避免 `├──` / `└──` 连接符错位；
  2. 显式排除本地验证产物 `.preview-site/`、`.shots/` 与校验插件目录；
  3. 目录优先、文件在后，同类按名称排序，结构更易读；
  4. 最新博客按 Front Matter 的 date 排序，不再按文件 mtime；
  5. 日期/标题/链接解析失败时跳过并给出提示，不静默写入错误数据。
"""

import fnmatch
import os
import re
import urllib.parse
from datetime import date, datetime
from pathlib import Path

import yaml

BASE_URL = "https://duckweed-yhb.github.io"

# 不进入目录树的目录（构建产物、缓存、本地验证、工具目录）
EXCLUDE_DIRS = {
    ".git", "_site", ".jekyll-cache", ".sass-cache",
    "node_modules", "vendor", ".bundle", "__pycache__",
    ".pytest_cache", ".vscode", ".idea",
    ".preview-site", ".shots", ".verify_plugins",
}

# 不进入目录树的文件
EXCLUDE_FILE_PATTERNS = {
    "Gemfile.lock", "package-lock.json", ".DS_Store", "Thumbs.db",
    "*.pyc", "*.pyo", "*.class", "*.o", "*.so", "*.dll", "*.exe",
}


def read_text(path):
    """按 UTF-8 → GBK 顺序读取文本，全部失败返回 None。"""
    for encoding in ("utf-8", "gbk"):
        try:
            return Path(path).read_text(encoding=encoding)
        except UnicodeDecodeError:
            continue
        except OSError as exc:
            print(f"⚠️ 读取文件 {path} 失败：{exc}")
            return None
    print(f"⚠️ 文件编码无法识别：{path}")
    return None


def parse_jekyll_post(post_path):
    """解析一篇文章的 date / title / url；任何一个缺失都返回 None。"""
    content = read_text(post_path)
    if content is None:
        return None

    match = re.match(r"^\ufeff?---\s*\n(.*?)\n---", content, re.S)
    if not match:
        print(f"⚠️ {post_path} 无合法的 Front Matter")
        return None

    try:
        front_matter = yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError as exc:
        print(f"⚠️ {post_path} Front Matter 解析失败：{exc}")
        return None

    raw_date = front_matter.get("date", "")
    if isinstance(raw_date, (datetime, date)):
        post_date = raw_date.strftime("%Y-%m-%d")
    else:
        found = re.search(r"(\d{4}-\d{2}-\d{2})", str(raw_date))
        post_date = found.group(1) if found else ""

    title = str(front_matter.get("title", "")).strip()
    title = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", title)          # 去掉 Markdown 链接外壳
    title = re.sub(r"\s+", " ", title)
    title = title[:50] + "..." if len(title) > 50 else title

    if not post_date:
        print(f"⚠️ {post_path} 缺少 date，跳过")
        return None
    if not title:
        print(f"⚠️ {post_path} 缺少 title，跳过")
        return None

    permalink = front_matter.get("permalink")
    if permalink:
        url = permalink if str(permalink).startswith("http") else f"{BASE_URL}{permalink}"
    else:
        filename = Path(post_path).stem
        parts = filename.split("-")
        if len(parts) >= 4 and re.fullmatch(r"\d{4}", parts[0]):
            date_part = "-".join(parts[:3])
            slug = "-".join(parts[3:])
        else:
            date_part = post_date
            slug = filename
        slug_encoded = urllib.parse.quote(slug)
        url = f"{BASE_URL}/{date_part.replace('-', '/')}/{slug_encoded}/"

    return {"date": post_date, "title": title, "url": url.strip()}


def generate_latest_posts(posts_dir, limit=8):
    """生成最新博客表格；按 date 倒序，同日期按标题排序保证稳定。"""
    if not os.path.isdir(posts_dir):
        print(f"⚠️ 博客目录不存在：{posts_dir}")
        return "| 暂无发布内容 | 你可以期待我的第一篇博客哦～ |"

    posts = []
    for name in sorted(os.listdir(posts_dir)):
        if name.endswith((".md", ".markdown")):
            info = parse_jekyll_post(os.path.join(posts_dir, name))
            if info:
                posts.append(info)

    if not posts:
        return "| 暂无有效博客 | 所有博客文件格式异常或无标题/日期 |"

    posts.sort(key=lambda p: (p["date"], p["title"]), reverse=True)
    rows = [f"| {p['date']} | [{p['title']}]({p['url']}) |" for p in posts[:limit]]
    print(f"ℹ️ 已解析 {len(posts)} 篇文章，表格输出最新 {len(rows)} 篇")
    return "\n".join(rows)


def _visible_entries(path):
    """返回当前目录下应展示的条目：目录在前、文件在后，各自按名称排序。"""
    entries = []
    # 点开头项默认隐藏（缓存/编辑器/预览目录），但 .github 与 .gitignore 是仓库结构的一部分，
    # 不属于构建产物，必须出现在 README 的目录树里。
    VISIBLE_DOT_ENTRIES = {".github", ".gitignore"}
    for name in os.listdir(path):
        full = os.path.join(path, name)
        is_dir = os.path.isdir(full)
        if name.startswith(".") and name not in VISIBLE_DOT_ENTRIES:
            continue
        if is_dir and name in EXCLUDE_DIRS:
            continue
        if not is_dir and any(fnmatch.fnmatch(name, pat) for pat in EXCLUDE_FILE_PATTERNS):
            continue
        entries.append((name, full, is_dir))
    entries.sort(key=lambda item: (not item[2], item[0].lower()))
    return entries


def generate_repo_tree(root="."):
    """递归生成目录树；连接符只取决于过滤后的可见条目。"""

    def walk(path, prefix=""):
        entries = _visible_entries(path)
        lines = []
        for index, (name, full, is_dir) in enumerate(entries):
            is_last = index == len(entries) - 1
            lines.append(f"{prefix}{'└── ' if is_last else '├── '}{name}")
            if is_dir:
                lines.extend(walk(full, prefix + ("    " if is_last else "│   ")))
        return lines

    try:
        return "\n".join(walk(root))
    except OSError as exc:
        print(f"❌ 生成目录树失败：{exc}")
        return "生成目录树失败，请检查脚本权限或目录结构"


def main():
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent

    template_path = project_root / "templates" / "README.template.md"
    if not template_path.exists():
        print(f"❌ 模板文件不存在：{template_path}")
        return

    template = template_path.read_text(encoding="utf-8")
    latest_posts = generate_latest_posts(project_root / "_posts")
    repo_tree = generate_repo_tree(str(project_root))
    update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    readme = (
        template
        .replace("{{ latest_posts }}", latest_posts)
        .replace("{{ repo_tree }}", repo_tree)
        .replace("{{ update_time }}", update_time)
    )

    (project_root / "README.md").write_text(readme, encoding="utf-8", newline="\n")
    print("✅ README.md 已更新（最新博客 + 项目结构）")


if __name__ == "__main__":
    main()
