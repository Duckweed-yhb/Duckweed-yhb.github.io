---
layout: default
title: 档案
permalink: /archive/
---

<!-- 纯 HTML 容器，Liquid 语法仅用于数据渲染，与结构分离 -->
<div class="page-card">
  <!-- 标题区域（纯 HTML，无任何模板/Markdown 混写） -->
  <h1 class="archive-h1">档案</h1>
  <p class="archive-subtitle">所有已发布帖子的汇总与分类索引</p>

  <!-- 切换按钮（纯 HTML 结构，脚本逻辑抽离） -->
  <div class="archive-tabs">
    <div class="archive-tab active" data-tab="time">按时间排序</div>
    <div class="archive-tab" data-tab="category">按分类浏览</div>
    <div class="archive-tab" data-tab="tag">按标签浏览</div>
  </div>

  <!-- 1. 时间排序内容 -->
  <div id="time" class="archive-content active">
    <h3>📅 所有帖子（按发布时间倒序）</h3>
    <ul class="post-list">
      {% comment %} Liquid 注释与 HTML 分离 {% endcomment %}
      {% for post in site.posts %}
      <li class="post-item">
        {{ post.date | date: '%Y-%m-%d' }} - 
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% for tag in post.tags %}
        <span class="post-tag">#{{ tag }}</span>
        {% endfor %}
      </li>
      {% empty %}
      <li class="post-item">暂无发布的帖子</li>
      {% endfor %}
    </ul>
  </div>

  <!-- 2. 分类浏览内容 -->
  <div id="category" class="archive-content">
    <h3>📁 分类索引</h3>
    <div class="cat-tag-container">
      {% assign categories = site.categories | sort %}
      {% for category in categories %}
      <a href="#cat-{{ category[0] | slugify }}" class="cat-tag-btn">
        {{ category[0] }} ({{ category[1] | size }})
      </a>
      {% empty %}
      <p class="empty-tip">暂无分类</p>
      {% endfor %}
    </div>

    {% for category in categories %}
    <h4 id="cat-{{ category[0] | slugify }}" class="cat-tag-title">{{ category[0] }}</h4>
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
    <div class="cat-tag-container">
      {% assign tags = site.tags | sort %}
      {% for tag in tags %}
      <a href="#tag-{{ tag[0] | slugify }}" class="cat-tag-btn">
        #{{ tag[0] }} ({{ tag[1] | size }})
      </a>
      {% empty %}
      <p class="empty-tip">暂无标签</p>
      {% endfor %}
    </div>

    {% for tag in tags %}
    <h4 id="tag-{{ tag[0] | slugify }}" class="cat-tag-title">{{ tag[0] }}</h4>
    <ul class="post-list">
      {% for post in tag[1] %}
      <li class="post-item">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: '%Y-%m-%d' }}
      </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</div>

<!-- 样式（完全抽离，与全站配色/样式统一） -->
<style>
  /* 核心白框容器（和关于/展览/友链页完全一致） */
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

  /* 标题样式（对齐全站主色调 #3498db） */
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

  /* 切换按钮（优化配色，和全站统一） */
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
    background: #3498db; /* 替换为全站主色调 */
    color: #fff;
    border-color: #3498db;
  }
  .archive-tab:hover:not(.active) {
    border-color: #3498db;
    color: #3498db;
  }

  /* 内容容器 */
  .archive-content {
    display: none;
    margin-top: 20px;
  }
  .archive-content.active {
    display: block;
  }

  /* 帖子列表（优化样式，对齐全站） */
  .post-list {
    list-style: none;
    padding-left: 0;
  }
  .post-item {
    padding: 10px 0;
    border-bottom: 1px dashed #eee;
  }
  .post-item a {
    color: #3498db;
    text-decoration: none;
  }
  .post-item a:hover {
    text-decoration: underline;
  }
  .post-tag {
    font-size: 0.8em;
    color: #666;
    margin-left: 5px;
  }

  /* 分类/标签按钮（优化配色，和全站统一） */
  .cat-tag-container {
    margin: 15px 0;
  }
  .cat-tag-btn {
    text-decoration: none;
    background: #e0e0e0;
    padding: 4px 12px;
    border-radius: 16px;
    margin: 4px;
    display: inline-block;
    font-size: 0.9em;
    color: #2c3e50;
  }
  .cat-tag-btn:hover {
    background: #3498db; /* 替换为全站主色调 */
    color: #fff;
  }
  .cat-tag-title {
    color: #3498db;
    font-size: 1.2em;
    margin: 2em 0 1em;
  }

  /* 空状态提示（统一样式） */
  .empty-tip {
    color: #7f8c8d;
    margin: 0;
    padding: 10px 0;
  }

  /* 暗黑模式（完全对齐全站规范） */
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
      background: #3498db;
      border-color: #3498db;
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
    .empty-tip {
      color: #bdc3c7;
    }
  }

  /* 移动端适配（优化细节） */
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

<!-- 脚本（优化逻辑，增加容错，避免全局污染） -->
<script>
  // 页面加载完成后初始化
  document.addEventListener('DOMContentLoaded', function() {
    // 获取所有切换按钮和内容容器
    const tabs = document.querySelectorAll('.archive-tab');
    const contents = document.querySelectorAll('.archive-content');

    // 切换标签函数（优化逻辑，增加容错）
    function switchTab(tabName) {
      // 隐藏所有内容
      contents.forEach(content => {
        content.classList.remove('active');
      });
      // 移除所有按钮激活态
      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
      // 激活目标（增加容错）
      const targetContent = document.getElementById(tabName);
      const targetTab = document.querySelector(`.archive-tab[data-tab="${tabName}"]`);
      if (targetContent) targetContent.classList.add('active');
      if (targetTab) targetTab.classList.add('active');
    }

    // 绑定按钮点击事件（替代内联 onclick，更规范）
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchTab(tabName);
      });
    });

    // 初始化默认标签（确保第一个标签激活）
    switchTab('time');
  });
</script>