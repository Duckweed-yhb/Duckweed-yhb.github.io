---
layout: default
title: 友链
permalink: /friends/
---

<!-- 移除重复的 # 友链 标题 -->
与志同道合者同行，共赴成长之路。

<style>
  /* 和展览页卡片样式统一 */
  .friends-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin: 40px 0;
    justify-content: center;
  }
  
  .friend-card {
    flex: 1;
    min-width: 300px;
    max-width: 450px;
    background: rgba(255, 255, 255, 0.88);
    padding: 35px 25px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .friend-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
  
  .friend-card h3 {
    color: #2c3e50;
    margin: 0 0 15px;
    font-size: 1.5em;
  }
  
  .friend-card a {
    color: #3498db;
    text-decoration: none;
    font-size: 1em;
    line-height: 1.6;
    display: block;
    margin-bottom: 10px;
  }
  
  .friend-card a:hover {
    text-decoration: underline;
    color: #2980b9;
  }
  
  .friend-card p {
    color: #7f8c8d;
    font-size: 1em;
    margin: 0;
  }
  
  /* 移动端适配 */
  @media (max-width: 768px) {
    .friends-container {
      gap: 20px;
      margin: 20px 0;
    }
    .friend-card {
      min-width: 90%;
      padding: 25px 20px;
      max-width: 100%;
    }
  }
</style>

<div class="friends-container">
  {% for friend in site.data.friends %}
  <div class="friend-card">
    <h3>{{ friend.name }}</h3>
    <a href="{{ friend.url }}" target="_blank">{{ friend.url }}</a>
    <p>{{ friend.desc }}</p>
  </div>
  {% else %}
  <div style="color: #7f8c8d; text-align: center; padding: 40px 0; width: 100%;">
    暂无友链，欢迎交换！<br>
    <small style="font-size: 0.9em;">可私信我添加你的博客链接～</small>
  </div>
  {% endfor %}
</div>