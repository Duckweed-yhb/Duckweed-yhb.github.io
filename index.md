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
</div>