---
layout: page
# 把 title 注释掉，或改名为 nav_title（避免自动导航）
# title: 文章标签
nav_title: 文章标签  # 自定义字段，仅在页面内使用
permalink: /tags/
---

<!-- 以下内容不变 -->
<div class="tag-cloud" style="margin-bottom: 30px;">
  {%- assign tags = site.tags | sort -%}
  {%- for tag in tags -%}
    <a href="#{{ tag[0] | slugify }}" style="display: inline-block; padding: 5px 12px; margin: 0 8px 8px 0; background: #f0f8ff; color: #3498db; border-radius: 20px; text-decoration: none;">
      {{ tag[0] }} ({{ tag[1].size }})
    </a>
  {%- endfor -%}
</div>

<div class="tag-list">
  {%- assign tags = site.tags | sort -%}
  {%- for tag in tags -%}
    <h3 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h3>
    <ul>
      {%- assign posts = tag[1] | sort: 'date' | reverse -%}
      {%- for post in posts -%}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </li>
      {%- endfor -%}
    </ul>
  {%- endfor -%}
</div>