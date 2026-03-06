---
layout: default
title: 首页
permalink: /
---

<div class="page-card">
  <h1>欢迎来到 Duckweed's Space 📚</h1>
  <p>这里是我的个人成长空间，记录编程学习、考研备考、读书思考的全部。</p>

  <h2>最新笔记</h2>
  <ul>
    {% for post in site.posts limit:5 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}</li>
    {% empty %}
    <li>暂无发布的笔记</li>
    {% endfor %}
  </ul>

  <h2>快速导航</h2>
  <ul>
    <li><a href="/archive/">文章归档</a></li>
    <li><a href="/friends/">友链页面</a></li>
    <li><a href="/about/">关于我</a></li>
  </ul>
</div>