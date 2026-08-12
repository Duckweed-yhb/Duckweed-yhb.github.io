---
layout: default
title: 首页
permalink: /
---

<div class="page-card">
  <h1>欢迎来到 Duckweed's Space 📚</h1>
  <p>这里是我的个人成长空间，记录编程学习、考研备考、读书思考的点滴。</p>

  <h2>最新笔记</h2>
  <ul>
    {% if site.posts.size > 0 %}
      {% for post in site.posts limit:5 %}
        <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}</li>
      {% endfor %}
    {% else %}
      <li>暂无发布的笔记</li>
    {% endif %}
  </ul>

  <h2>快速导航</h2>
  <ul>
    <li><a href="{{ "/archive/" | relative_url }}">文章归档</a></li>
    <li><a href="{{ "/friends/" | relative_url }}">友链页面</a></li>
    <li><a href="{{ "/about/" | relative_url }}">关于我</a></li>
  </ul>

  <h2>📊 博客统计</h2>
  <p>目前已发布 <strong>{{ site.posts | size }}</strong> 篇文章，涵盖电气工程、计算机科学、大学成长、工具方法、教育思考五大主题。</p>

  <h2>⭐ 精选推荐</h2>
  <ul>
    <li><a href="/2026/08/08/%E7%94%B5%E6%B0%94%E8%87%AA%E5%AD%A6%E4%B9%8B%E8%B7%AF/">电气工程自学之路</a> — 从数学基础到电力系统分析，四阶段完整路线</li>
    <li><a href="/2026/08/08/%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%87%AA%E5%AD%A6%E4%B9%8B%E8%B7%AF/">计算机自学之路</a> — 非科班友好的编程入门全指南</li>
    <li><a href="/2026/08/06/%E5%A4%A7%E5%AD%A6%E6%88%90%E9%95%BF%E8%A7%84%E5%88%92%E9%97%B2%E8%81%8A/">大学成长规划闲聊</a> — 学业、实习、读研与就业避坑经验</li>
    <li><a href="/2026/08/10/%E6%88%91%E7%9A%84%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF/">我的学习路线</a> — 从大一到现在的完整知识版图</li>
  </ul>

  <h2>🗺️ 探索本站</h2>
  <ul>
    <li><a href="{{ "/course-map/" | relative_url }}">课程地图</a> — 电气工程 & 计算机科学课程依赖关系可视化</li>
    <li><a href="{{ "/blog-map/" | relative_url }}">博客地图</a> — 全部文章按主题分组的归属网络</li>
    <li><a href="{{ "/navigate/" | relative_url }}">导航页</a> — 按你的身份和需求精准定位内容</li>
  </ul>
</div>