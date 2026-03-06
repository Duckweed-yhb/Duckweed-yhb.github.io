---
layout: default
title: 档案
permalink: /archive/
---

<!-- 纯 HTML 容器，无任何 Markdown 语法 -->
<div class="page-card">
  <!-- 标题（纯 HTML，替代 Markdown） -->
  <h1 class="archive-h1">档案</h1>
  <p class="archive-subtitle">所有已发布帖子的汇总与分类索引</p>

  <!-- 样式（内联 CSS，包裹在 style 标签内） -->
  <style>
    /* 页面白框容器 */
    .page-card {
      background: rgba(255, 255, 255, 0.88);
      padding: 35px 25px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(8px);
      max-width: 1000px;
      margin: 0 auto;
      box-sizing: border-box;
      line-height: 1.8;
    }

    /* 标题样式 */
    .archive-h1 {
      font-size: 2em;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 0.5em;
      border-bottom: 2px solid #3498db;
      padding-bottom: 0.5em;
    }
    .archive-subtitle {
      font-size: 1em;
      color: #7f8c8d;
      margin-bottom: 2em;
      line-height: 1.6;
      margin-top: 0;
    }

    /* 切换按钮 */
    .archive-tabs {
      margin: 20px 0;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .archive-tab {
      padding: 8px 20px;
      border: 1px solid #ddd;
      border-radius: 20px;
      background: #fff;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .archive-tab.active {
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }

    /* 内容容器 */
    .archive-content {
      display: none;
      margin-top: 20px;
    }
    .archive-content.active {
      display: block;
    }

    /* 帖子列表 */
    .post-list {
      list-style: none;
      padding-left: 0;
    }
    .post-item {
      padding: 10px 0;
      border-bottom: 1px dashed #eee;
    }
    .post-tag {
      font-size: 0.8em;
      color: #666;
      margin-left: 5px;
    }

    /* 分类/标签按钮 */
    .cat-tag-btn {
      text-decoration: none;
      background: #e0e0e0;
      padding: 4px 12px;
      border-radius: 16px;
      margin: 4px;
      display: inline-block;
      font-size: 0.9em;
    }
    .cat-tag-btn:hover {
      background: #007bff;
      color: #fff;
    }

    /* 暗黑模式 */
    @media (prefers-color-scheme: dark) {
      .page-card {
        background: rgba(30, 30, 40, 0.88);
      }
      .archive-h1 {
        color: #ecf0f1;
        border-bottom-color: #3498db;
      }
      .archive-subtitle {
        color: #bdc3c7;
      }
      .archive-tab {
        background: #2c3e50;
        border-color: #34495e;
        color: #ecf0f1;
      }
      .archive-tab.active {
        background: #007bff;
        border-color: #007bff;
      }
      .cat-tag-btn {
        background: #34495e;
        color: #ecf0f1;
      }
      .post-item {
        border-color: #34495e;
      }
      .post-tag {
        color: #bdc3c7;
      }
    }

    /* 移动端 */
    @media (max-width: 768px) {
      .page-card {
        padding: 25px 15px;
        margin: 0 10px;
      }
      .archive-h1 {
        font-size: 1.8em;
      }
      .archive-tab {
        flex: 1 1 auto;
        text-align: center;
        padding: 8px 10px;
      }
    }
  </style>

  <!-- 切换按钮（纯 HTML） -->
  <div class="archive-tabs">
    <div class="archive-tab active" onclick="switchTab('time', this)">按时间排序</div>
    <div class="archive-tab" onclick="switchTab('category', this)">按分类浏览</div>
    <div class="archive-tab" onclick="switchTab('tag', this)">按标签浏览</div>
  </div>

  <!-- 1. 时间排序内容 -->
  <div id="time" class="archive-content active">
    <h3>📅 所有帖子（按发布时间倒序）</h3>
    <ul class="post-list">
      {% for post in site.posts %}
      <li class="post-item">
        {{ post.date | date: '%Y-%m-%d' }} - 
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% for tag in post.tags %}
        <span class="post-tag">#{{ tag }}</span>
        {% endfor %}
      </li>
      {% else %}
      <li class="post-item">暂无发布的帖子</li>
      {% endfor %}
    </ul>
  </div>

  <!-- 2. 分类浏览内容 -->
  <div id="category" class="archive-content">
    <h3>📁 分类索引</h3>
    <div style="margin: 15px 0;">
      {% assign categories = site.categories | sort %}
      {% for category in categories %}
      <a href="#cat-{{ category[0] | slugify }}" class="cat-tag-btn">
        {{ category[0] }} ({{ category[1] | size }})
      </a>
      {% else %}
      <p>暂无分类</p>
      {% endfor %}
    </div>

    {% for category in categories %}
    <h4 id="cat-{{ category[0] | slugify }}">{{ category[0] }}</h4>
    <ul class="post-list">
      {% for post in category[1] %}
      <li class="post-item">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: '%Y-%m-%d' }}
      </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>

  <!-- 3. 标签浏览内容 -->
  <div id="tag" class="archive-content">
    <h3>🏷️ 标签索引</h3>
    <div style="margin: 15px 0;">
      {% assign tags = site.tags | sort %}
      {% for tag in tags %}
      <a href="#tag-{{ tag[0] | slugify }}" class="cat-tag-btn">
        #{{ tag[0] }} ({{ tag[1] | size }})
      </a>
      {% else %}
      <p>暂无标签</p>
      {% endfor %}
    </div>

    {% for tag in tags %}
    <h4 id="tag-{{ tag[0] | slugify }}">{{ tag[0] }}</h4>
    <ul class="post-list">
      {% for post in tag[1] %}
      <li class="post-item">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: '%Y-%m-%d' }}
      </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>

  <!-- 脚本（纯 HTML，放在容器内底部） -->
  <script>
    function switchTab(tabName, element) {
      // 隐藏所有内容
      document.querySelectorAll('.archive-content').forEach(content => {
        content.classList.remove('active');
      });
      // 移除所有按钮激活态
      document.querySelectorAll('.archive-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      // 激活目标
      document.getElementById(tabName).classList.add('active');
      element.classList.add('active');
    }
  </script>
</div>