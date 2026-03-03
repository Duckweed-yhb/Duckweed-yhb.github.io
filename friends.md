---
layout: page
title: 友链
permalink: /friends/
---

# 友链
与志同道合者同行，共赴成长之路。

<style>
  .friends-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0;
    justify-content: center;
  }
  .friend-card {
    background: rgba(255,255,255,0.88);
    padding: 25px;
    border-radius: 12px;
    width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  .friend-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
</style>

<div class="friends-container">
  {% for friend in site.friends %}
  <div class="friend-card">
    <h3>{{ friend.name }}</h3>
    <a href="{{ friend.url }}" target="_blank">{{ friend.url }}</a>
    <p>{{ friend.desc }}</p>
  </div>
  {% else %}
  <p>暂无友链，欢迎交换！</p>
  {% endfor %}
</div>