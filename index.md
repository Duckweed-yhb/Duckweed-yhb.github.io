---
layout: default
title: 首页
permalink: /
---

<div class="page-card">
  # 欢迎来到 Duckweed's Space 📚
  这里是我的个人成长空间，记录编程学习、考研备考、读书思考的点滴。

  ## 最新笔记
  {% for post in site.posts limit:5 %}
  - [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
  {% endfor %}

  ## 快速导航
  - [文章归档](/archive/)  <!-- 修正为permalink链接，和archive.md的permalink一致 -->
  - [友链页面](/friends/)  <!-- 修正为permalink链接，和friends.md的permalink一致 -->
  - [关于我](/about/)      <!-- 新增关于页面链接，后续创建about.md后生效 -->
</div>