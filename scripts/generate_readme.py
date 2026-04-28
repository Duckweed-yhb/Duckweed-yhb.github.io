import os
import re
import yaml
import urllib.parse
from datetime import datetime
from pathlib import Path

def parse_jekyll_post(post_path):
    """解析 Jekyll 博客的 Front Matter 字段（增强容错+链接准确性）"""
    try:
        if not os.path.exists(post_path):
            print(f"⚠️ 文件不存在：{post_path}")
            return None
        
        try:
            with open(post_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(post_path, 'r', encoding='gbk') as f:
                content = f.read()
        except Exception as e:
            print(f"⚠️ 读取文件 {post_path} 失败：{str(e)}")
            return None
        
        fm_start = content.find('---')
        fm_end = content.find('---', fm_start + 3)
        if fm_start == -1 or fm_end == -1:
            print(f"⚠️ {post_path} 无合法的 Front Matter")
            return None
        
        fm_content = content[fm_start+3:fm_end].strip()
        try:
            fm = yaml.safe_load(fm_content) or {}
        except yaml.YAMLError as e :
            print(f"⚠️ {post_path} Front Matter 解析失败：{str(e)}")
            return None
        
        post_date = fm.get('date', '')
        if isinstance(post_date, datetime):
            post_date = post_date.strftime('%Y-%m-%d')
        elif isinstance(post_date, str):
            date_match = re.search(r'(\d{4}-\d{2}-\d{2})', post_date)
            post_date = date_match.group(1) if date_match else ''
        else:
            post_date = str(post_date).split(' ')[0] if post_date else ''
        
        title = fm.get('title', '无标题').strip()
        title = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', title)
        title = re.sub(r'\s+', ' ', title)
        title = title[:50] + '...' if len(title) > 50 else title
        
        base_url = "https://duckweed-yhb.github.io"
        if fm.get('permalink'):
            permalink = fm['permalink']
            url = permalink if permalink.startswith('http') else f"{base_url}{permalink}"
        else:
            filename = Path(post_path).stem
            slug_parts = filename.split('-')
            if len(slug_parts) >= 4 and re.match(r'\d{4}', slug_parts[0]):
                date_part = '-'.join(slug_parts[:3])
                slug = '-'.join(slug_parts[3:])
            else:
                date_part = post_date
                slug = filename
            
            slug_encoded = urllib.parse.quote(slug)
            url = f"{base_url}/{date_part.replace('-', '/')}/{slug_encoded}/" if date_part else f"{base_url}/{slug_encoded}/"
        
        if not post_date:
            print(f"⚠️ {post_path} 日期字段为空，跳过")
            return None
        if title == '无标题':
            print(f"⚠️ {post_path} 标题为空，跳过")
            return None
        
        return {
            'date': post_date,
            'title': title,
            'url': url.strip()
        }
    except Exception as e:
        print(f"❌ 解析 {post_path} 失败：{str(e)}")
        return None

def generate_latest_posts(posts_dir='_posts', limit=8):
    """读取 Jekyll _posts 目录，生成最新博客列表（优化表格格式）"""
    posts = []
    
    posts_abs_dir = os.path.abspath(posts_dir)
    if not os.path.exists(posts_abs_dir):
        print(f"⚠️ 博客目录不存在：{posts_abs_dir}")
        return "| 暂无发布内容 | 你可以期待我的第一篇博客哦～ |"
    
    files = []
    for file in os.listdir(posts_abs_dir):
        if file.endswith(('.md', '.markdown')):
            file_path = os.path.join(posts_abs_dir, file)
            files.append((file_path, os.path.getmtime(file_path)))
    
    files_sorted = sorted(files, key=lambda x: x[1], reverse=True)
    
    for file_path, _ in files_sorted:
        post_info = parse_jekyll_post(file_path)
        if post_info:
            posts.append(post_info)
    
    if not posts:
        return "| 暂无有效博客 | 所有博客文件格式异常或无标题/日期 |"
    
    posts_sorted = sorted(posts, key=lambda x: x['date'], reverse=True)[:limit]
    
    table_rows = []
    for post in posts_sorted:
        table_rows.append(f"| {post['date']} | [{post['title']}]({post['url']}) |")
    
    return '\n'.join(table_rows)

def generate_repo_tree(root='.', exclude_dirs=None, exclude_files=None):
    """生成仓库目录树（自动排除常见构建/缓存目录）"""
    if exclude_dirs is None:
        exclude_dirs = {
            '.git', '_site', '.jekyll-cache', 'node_modules', 'vendor',
            '.github', '__pycache__', '.pytest_cache', '.vscode', '.idea'
        }
    if exclude_files is None:
        exclude_files = {
            'Gemfile.lock', 'package-lock.json', '.DS_Store', 'Thumbs.db',
            '*.pyc', '*.pyo', '*.class', '*.o', '*.so', '*.dll', '*.exe'
        }
    
    def match_pattern(name, patterns):
        for pat in patterns:
            if re.match(pat.replace('*', '.*'), name):
                return True
        return False
    
    def tree(path, prefix=''):
        entries = sorted(os.listdir(path))
        lines = []
        for i, entry in enumerate(entries):
            full_path = os.path.join(path, entry)
            
            if os.path.isdir(full_path):
                if entry in exclude_dirs or entry.startswith('.'):
                    continue
            else:
                if match_pattern(entry, exclude_files) or entry.startswith('.'):
                    continue
            
            is_last = (i == len(entries) - 1)
            connector = '└── ' if is_last else '├── '
            lines.append(f"{prefix}{connector}{entry}")
            
            if os.path.isdir(full_path):
                new_prefix = prefix + ('    ' if is_last else '│   ')
                lines.extend(tree(full_path, new_prefix))
        return lines
    
    try:
        tree_lines = tree(root)
        return '\n'.join(tree_lines)
    except Exception as e:
        print(f"❌ 生成目录树失败：{str(e)}")
        return "生成目录树失败，请检查脚本权限或目录结构"

def main():
    """主函数：读取模板并生成README（适配GitHub Actions路径）"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    template_path = os.path.join(project_root, 'templates', 'README.template.md')
    if not os.path.exists(template_path):
        template_path = 'README.template.md'
        if not os.path.exists(template_path):
            print(f"❌ 模板文件不存在：{template_path}")
            return
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    posts_dir = os.path.join(project_root, '_posts')
    latest_posts = generate_latest_posts(posts_dir)
    
    repo_tree = generate_repo_tree(project_root)
    
    update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    readme_content = template.replace('{{ latest_posts }}', latest_posts)
    readme_content = readme_content.replace('{{ repo_tree }}', repo_tree)
    readme_content = readme_content.replace('{{ update_time }}', update_time)
    
    readme_path = os.path.join(project_root, 'README.md')
    try:
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(readme_content)
        print("✅ README.md 已自动更新（含最新博客 + 项目结构）！")
    except Exception as e:
        print(f"❌ 写入README失败：{str(e)}")

if __name__ == "__main__":
    main()