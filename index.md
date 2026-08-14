---
layout: default
title: 首页
permalink: /
---

<div class="page-card">
  <h1>星隅共学社 🌌</h1>
  <p class="community-intro">我们是一群热爱探索的大学生，聚成一片名为「星云」的共同体。在这里，我们不只钻研前沿技术，也分享阅读感悟、记录成长轨迹，甚至一起玩乐与创造。我们相信，真正的成长不止于技术，更在于思想的碰撞与彼此的陪伴。开放、包容、面向未来，是我们的底色。</p>

  <div class="verse-banner">
    <p class="verse-main">且将新火试新茶，诗酒趁年华。</p>
    <p class="verse-sub">—— 苏轼《望江南·超然台作》</p>
  </div>

  <h2>最新星语</h2>
  <ul>
    {% if site.posts.size > 0 %}
      {% for post in site.posts limit:6 %}
        <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <span class="post-date">· {{ post.date | date: "%Y-%m-%d" }}</span></li>
      {% endfor %}
    {% else %}
      <li>暂无发布的内容</li>
    {% endif %}
  </ul>

  <h2>探索星云</h2>
  <ul>
    <li><a href="{{ "/navigate/" | relative_url }}">导航</a> — 按你的身份与方向，找到属于你的入口</li>
    <li><a href="{{ "/course-map/" | relative_url }}">课程地图</a> — 电气与计算机的课程先修脉络</li>
    <li><a href="{{ "/blog-map/" | relative_url }}">博客地图</a> — 全部文章的主题归属总览</li>
    <li><a href="{{ "/exhibition/" | relative_url }}">展览</a> — 我们的项目、技能与书籍</li>
    <li><a href="{{ "/about/" | relative_url }}">关于</a> — 认识星隅，认识我们</li>
  </ul>
</div>
