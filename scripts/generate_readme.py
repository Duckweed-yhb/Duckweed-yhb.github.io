import os
import re
import yaml
from datetime import datetime
from pathlib import Path

def parse_jekyll_post(post_path):
    """解析 Jekyll 博客的 Front Matter 字段（移除摘要解析，增强容错）"""
    try:
        # 检查文件是否存在
        if not os.path.exists(post_path):
            print(f"文件不存在：{post_path}")
            return None
        
        with open(post_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取 Front Matter（--- 包裹的部分）
        fm_start = content.find('---')
        fm_end = content.find('---', fm_start + 3)
        if fm_start == -1 or fm_end == -1:
            print(f"{post_path} 无合法的 Front Matter")
            return None
        
        fm_content = content[fm_start+3:fm_end].strip()
        fm = yaml.safe_load(fm_content)
        if not fm:
            print(f"{post_path} Front Matter 解析为空")
            return None
        
        # 提取并处理日期字段（兼容多种格式）
        post_date = fm.get('date', '')
        if isinstance(post_date, datetime):
            post_date = post_date.strftime('%Y-%m-%d')
        elif isinstance(post_date, str):
            # 处理各种字符串日期格式：2026-02-21 14:30:00 +0800 / 2026-02-21T14:30:00 等
            post_date = re.search(r'(\d{4}-\d{2}-\d{2})', post_date).group(1) if re.search(r'(\d{4}-\d{2}-\d{2})', post_date) else ''
        else:
            post_date = str(post_date).split(' ')[0]
        
        # 提取标题并过滤异常格式（如Markdown链接）
        title = fm.get('title', '无标题').strip()
        # 移除可能的Markdown链接语法、多余空格
        title = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', title)  # 过滤[文本](链接)
        title = re.sub(r'\s+', ' ', title)  # 合并多个空格
        
        # 生成正确的博客链接（优先用permalink，无则用文件名规则）
        if fm.get('permalink'):
            # 使用自定义permalink
            url = f"https://duckweed-yhb.github.io{fm['permalink']}"
        else:
            # 兼容默认文件名规则
            filename = Path(post_path).stem
            # 拆分文件名：2026-02-21-Welcome to Duckweed's Space → Welcome to Duckweed's Space
            slug_parts = filename.split('-')
            if len(slug_parts) >= 4:
                slug = '-'.join(slug_parts[3:])
            else:
                slug = filename
            # 处理中文/特殊字符，直接用日期+slug拼接（Jekyll默认规则）
            url = f"https://duckweed-yhb.github.io/{post_date.replace('-', '/')}/{slug}/"
        
        # 空值校验
        if not post_date:
            print(f"{post_path} 日期字段为空，跳过")
            return None
        
        return {
            'date': post_date,
            'title': title,
            'url': url
        }
    except Exception as e:
        print(f"解析 {post_path} 失败：{str(e)}")
        return None

def generate_latest_posts(posts_dir='_posts', limit=5):
    """读取 Jekyll _posts 目录，生成最新博客列表（无摘要）"""
    posts = []
    
    # 检查posts目录是否存在
    if not os.path.exists(posts_dir):
        print(f"博客目录不存在：{posts_dir}")
        return "| 暂无博客 | 暂无内容 |"
    
    # 遍历所有博客文件
    for file in os.listdir(posts_dir):
        if file.endswith(('.md', '.markdown')):
            post_info = parse_jekyll_post(os.path.join(posts_dir, file))
            if post_info and post_info['date'] and post_info['title'] != '无标题':
                posts.append(post_info)
    
    # 无博客时返回提示
    if not posts:
        return "| 暂无博客 | 暂无内容 |"
    
    # 按发布日期倒序排列
    posts_sorted = sorted(posts, key=lambda x: x['date'], reverse=True)[:limit]
    
    # 生成Markdown表格行
    table_rows = []
    for post in posts_sorted:
        table_rows.append(f"| {post['date']} | [{post['title']}]({post['url']}) |")
    
    return '\n'.join(table_rows)

def main():
    """主函数：读取模板并生成README"""
    # 读取模板
    template_path = 'templates/README.template.md'
    if not os.path.exists(template_path):
        print(f"模板文件不存在：{template_path}")
        return
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # 生成最新博客内容
    latest_posts = generate_latest_posts()
    
    # 填充模板
    readme_content = template.replace('{{ latest_posts }}', latest_posts)
    readme_content = readme_content.replace('{{ update_time }}', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    # 写入README.md
    try:
        with open('README.md', 'w', encoding='utf-8') as f:
            f.write(readme_content)
        print("✅ README.md 已自动更新！")
    except Exception as e:
        print(f"❌ 写入README失败：{str(e)}")

if __name__ == "__main__":
    main()