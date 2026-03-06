---
layout: default
title: 友链
permalink: /friends/
---

<!-- 标题白框容器（纯 HTML，避免 Markdown 解析冲突） -->
<div class="page-header-card">
  <h1>友链</h1>
  <p>与志同道合者同行，共赴成长之路</p>
</div>

<!-- 样式单独放在容器外，作用域完全隔离 -->
<style>
  /* ========== 标题白框样式（和全站统一） ========== */
  .page-header-card {
    background: rgba(255, 255, 255, 0.88);
    padding: 35px 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
    max-width: 1200px;
    margin: 0 auto 40px;
    box-sizing: border-box;
    line-height: 1.8;
  }
  .page-header-card h1 {
    font-size: 2em;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5em;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .page-header-card p {
    color: #7f8c8d;
    margin: 0;
  }

  /* ========== 内容白框样式（和全站统一） ========== */
  .page-card {
    background: rgba(255, 255, 255, 0.88);
    padding: 35px 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  /* ========== 友链卡片样式（和展览页统一） ========== */
  .friends-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin: 0;
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

  /* ========== 空状态样式优化 ========== */
  .friends-empty {
    color: #7f8c8d;
    text-align: center;
    padding: 40px 0;
    width: 100%;
  }
  .friends-empty small {
    font-size: 0.9em;
    display: block;
    margin-top: 8px;
  }

  /* ========== 暗黑模式适配 ========== */
  @media (prefers-color-scheme: dark) {
    .page-header-card, .page-card {
      background: rgba(30, 30, 40, 0.88);
    }
    .page-header-card h1 {
      color: #ecf0f1;
      border-bottom-color: #3498db;
    }
    .page-header-card p {
      color: #bdc3c7;
    }
    .friend-card {
      background: rgba(30, 30, 40, 0.88);
    }
    .friend-card h3 {
      color: #ecf0f1;
    }
    .friend-card p {
      color: #bdc3c7;
    }
    .friends-empty {
      color: #bdc3c7;
    }
  }
  
  /* ========== 移动端适配 ========== */
  @media (max-width: 768px) {
    .page-header-card, .page-card {
      padding: 25px 15px;
      margin: 0 10px 30px;
    }
    .page-header-card h1 {
      font-size: 1.8em;
    }
    .friends-container {
      gap: 20px;
      margin: 0;
    }
    .friend-card {
      min-width: 90%;
      padding: 25px 20px;
      max-width: 100%;
    }
  }
</style>

<!-- 友链内容容器 -->
<div class="page-card">
  <div class="friends-container">
    {% if site.data.friends and site.data.friends.size > 0 %}
      {% for friend in site.data.friends %}
        <div class="friend-card">
          <h3>{{ friend.name }}</h3>
          <a href="{{ friend.url | relative_url }}" target="_blank">{{ friend.url }}</a>
          <p>{{ friend.desc }}</p>
        </div>
      {% endfor %}
    {% else %}
      <div class="friends-empty">
        暂无友链，欢迎交换！
        <small>可私信我或者发送到我的邮箱添加你的博客链接～</small>
      </div>
    {% endif %}
  </div>
</div>