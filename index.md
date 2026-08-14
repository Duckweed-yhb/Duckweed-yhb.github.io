---
layout: default
title: 首页
permalink: /
render_with_liquid: true
---

<div class="page-card">
  <h1>你好，我是 Duckweed 🌌</h1>
  <p class="community-intro">这里是我的个人博客，记录编程学习、考研备考与读书思考的点滴。我发起了一个名为「星隅共学社」的小社群——一群热爱探索的大学生，聚成一片「星云」，一起钻研技术、分享阅读、记录成长。开放、包容、面向未来，是我们共同的底色。</p>

  <div class="verse-banner">
    <p class="verse-main">且将新火试新茶，诗酒趁年华。</p>
    <p class="verse-sub">—— 苏轼《望江南·超然台作》</p>
  </div>

  <h2>最新文章</h2>
  <ul>
    {% if site.posts.size > 0 %}
      {% for post in site.posts limit:6 %}
        <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <span class="post-date">· {{ post.date | date: "%Y-%m-%d" }}</span></li>
      {% endfor %}
    {% else %}
      <li>暂无发布的内容</li>
    {% endif %}
  </ul>

  <h2>探索本站</h2>
  <ul>
    <li><a href="{{ "/navigate/" | relative_url }}">导航</a> — 按你的身份与方向，找到属于你的入口</li>
    <li><a href="{{ "/course-map/" | relative_url }}">课程地图</a> — 电气与计算机的课程先修脉络</li>
    <li><a href="{{ "/blog-map/" | relative_url }}">博客地图</a> — 全部文章的主题归属总览</li>
    <li><a href="{{ "/exhibition/" | relative_url }}">展览</a> — 我的项目、技能与书籍</li>
    <li><a href="{{ "/about/" | relative_url }}">关于我</a> — 认识我，也认识星隅</li>
  </ul>
</div>
