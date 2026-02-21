---
layout: page
# 把 title 注释掉，或改名为 nav_title（避免自动导航）
# title: 文章分类
nav_title: 文章分类  # 自定义字段，仅在页面内使用
permalink: /categories/
---

<!-- 以下内容不变 -->
<div class="category-list">
  {%- assign categories = site.categories | sort -%}
  {%- for category in categories -%}
    <h3 id="{{ category[0] | slugify }}">{{ category[0] }}</h3>
    <ul>
      {%- assign posts = category[1] | sort: 'date' | reverse -%}
      {%- for post in posts -%}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </li>
      {%- endfor -%}
    </ul>
  {%- endfor -%}
</div>

<div class="category-nav" style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
  <h4>所有分类</h4>
  <ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 10px;">
    {%- for category in site.categories -%}
      <li>
        <a href="#{{ category[0] | slugify }}" style="color: #3498db; text-decoration: none;">{{ category[0] }}</a>
      </li>
    {%- endfor -%}
  </ul>
</div>