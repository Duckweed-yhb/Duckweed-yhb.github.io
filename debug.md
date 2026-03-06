现在我完全清楚问题所在了！看完你的核心文件后，能精准定位所有样式不一致的根源，我会用**最小改动**的方式帮你修复，让首页、档案、友链、关于页面都和大物笔记页面样式统一。

### 核心问题分析
1. **样式规则只针对特定布局生效**：
   - 文章页（大物笔记）用 `post.html` 布局，内容被 `post-container` 包裹，这个类在 `main.css` 里定义了白色半透明卡片、居中样式；
   - 首页/档案/友链用 `default.html` 布局，只有 `layout-home`（首页）有卡片样式，其他页面（档案/友链）没有对应的样式规则；
2. **社交链接缺失**：你的 `default.html` 里引用了 `footer.html`，但没看到这个文件的内容，社交链接应该在页脚里；
3. **导航缺少“关于”页面**：需要创建 `about.md` 并配置导航。

---

### 第一步：统一所有页面的样式（修改 `main.css`）
在 `main.css` 末尾添加通用卡片样式，让所有页面都能复用文章页的白色半透明卡片：
```css
/* ========== 新增：通用页面卡片样式（所有页面复用） ========== */
/* 给档案/友链/关于页面添加和文章页一致的卡片样式 */
body.layout-default .page-content .wrapper > .page-card {
    max-width: 950px;
    width: 90%;
    margin: 2rem auto 30px auto;
    padding: 3rem 2.5rem;
    background-color: rgba(255, 255, 255, 0.88);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    position: relative;
    z-index: 10;
}

/* 移动端适配通用卡片 */
@media (max-width: 768px) {
    body.layout-default .page-content .wrapper > .page-card {
        margin: 1rem auto 20px auto;
        max-width: 100%;
        width: 98%;
        padding: 2rem 15px;
        background-color: rgba(255, 255, 255, 0.9);
    }
}

/* 修复首页样式冲突（保持原有样式，新增通用卡片兼容） */
body.layout-home .page-content .wrapper > .page-card {
    background-color: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    margin: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
}
```

---

### 第二步：修复首页（`index.md`）
只需要把内容包裹在通用卡片里，保留原有内容，样式会自动和文章页统一：
```markdown
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
  - [文章归档](/archive/)  <!-- 修正链接：用permalink而非文件路径 -->
  - [友链页面](/friends/)
  - [关于我](/about/)     <!-- 新增关于页面链接 -->
</div>
```

---

### 第三步：修复档案页（`pages/archive.md`）
同样包裹通用卡片，保留原有功能，样式自动统一：
```markdown
---
layout: default
title: 档案
permalink: /archive/
---

<div class="page-card">
  # 档案
  所有已发布帖子的汇总与分类索引

  <!-- 切换按钮样式 -->
  <style>
    .archive-tabs {
      margin: 20px 0;
      display: flex;
      gap: 10px;
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
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }
    .archive-content {
      display: none;
      margin-top: 20px;
    }
    .archive-content.active {
      display: block;
    }
    /* 帖子列表样式优化 */
    .post-list {
      list-style: none;
      padding-left: 0;
    }
    .post-item {
      padding: 10px 0;
      border-bottom: 1px dashed #eee;
    }
    .post-tag {
      font-size: 0.8em;
      color: #666;
      margin-left: 5px;
    }
    /* 分类/标签按钮样式 */
    .cat-tag-btn {
      text-decoration: none;
      background: #e0e0e0;
      padding: 4px 12px;
      border-radius: 16px;
      margin: 4px;
      display: inline-block;
      font-size: 0.9em;
    }
  </style>

  <!-- 切换按钮 -->
  <div class="archive-tabs">
    <div class="archive-tab active" onclick="switchTab('time', this)">按时间排序</div>
    <div class="archive-tab" onclick="switchTab('category', this)">按分类浏览</div>
    <div class="archive-tab" onclick="switchTab('tag', this)">按标签浏览</div>
  </div>

  <!-- 1. 时间排序内容（默认显示） -->
  <div id="time" class="archive-content active">
    <h3>📅 所有帖子（按发布时间倒序）</h3>
    <ul class="post-list">
      {% for post in site.posts %}
      <li class="post-item">
        {{ post.date | date: '%Y-%m-%d' }} - 
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% for tag in post.tags %}
        <span class="post-tag">#{{ tag }}</span>
        {% endfor %}
      </li>
      {% else %}
      <li class="post-item">暂无发布的帖子</li>
      {% endfor %}
    </ul>
  </div>

  <!-- 2. 分类浏览内容 -->
  <div id="category" class="archive-content">
    <h3>📁 分类索引</h3>
    <div style="margin: 15px 0;">
      {% assign categories = site.categories | sort %}
      {% for category in categories %}
      <a href="#cat-{{ category[0] | slugify }}" class="cat-tag-btn">
        {{ category[0] }} ({{ category[1] | size }})
      </a>
      {% else %}
      <p>暂无分类</p>
      {% endfor %}
    </div>

    {% for category in categories %}
    <h4 id="cat-{{ category[0] | slugify }}">{{ category[0] }}</h4>
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
    <div style="margin: 15px 0;">
      {% assign tags = site.tags | sort %}
      {% for tag in tags %}
      <a href="#tag-{{ tag[0] | slugify }}" class="cat-tag-btn">
        #{{ tag[0] }} ({{ tag[1] | size }})
      </a>
      {% else %}
      <p>暂无标签</p>
      {% endfor %}
    </div>

    {% for tag in tags %}
    <h4 id="tag-{{ tag[0] | slugify }}">{{ tag[0] }}</h4>
    <ul class="post-list">
      {% for post in tag[1] %}
      <li class="post-item">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: '%Y-%m-%d' }}
      </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>

  <!-- 切换逻辑脚本（修复 event 兼容性问题） -->
  <script>
  function switchTab(tabName, element) {
    // 隐藏所有内容
    const contents = document.querySelectorAll('.archive-content');
    contents.forEach(content => {
      content.classList.remove('active');
    });
    // 移除所有按钮激活状态
    const tabs = document.querySelectorAll('.archive-tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    // 显示选中内容 + 激活选中按钮
    document.getElementById(tabName).classList.add('active');
    element.classList.add('active');
  }
  </script>
</div>
```

---

### 第四步：修复友链页（`pages/friends.md`）
包裹通用卡片，样式自动统一：
```markdown
---
layout: default
title: 友链
permalink: /friends/
---

<div class="page-card">
  # 友链
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
</div>
```

---

### 第五步：创建“关于”页面（`pages/about.md`）
```markdown
---
layout: default
title: 关于
permalink: /about/
---

<div class="page-card">
  # 关于我
  你好，我是 Duckweed，一名电气工程专业的本科生。

  ## 我的兴趣
  - 电力系统分析与优化
  - Python 数据分析与自动化
  - 前端开发与个人博客搭建
  - 考研备考与知识整理

  ## 联系方式
  - 📧 邮箱：3071974740@qq.com
  - 🐙 GitHub：<a href="https://github.com/Duckweed-yhb" target="_blank">Duckweed-yhb</a>
</div>
```

---

### 第六步：配置导航栏（修改 `_config.yml`）
添加“关于”页面到导航，确保链接正确：
```yaml
# 导航栏配置
header_pages:
  - pages/archive.md
  - pages/friends.md
  - pages/about.md  # 新增关于页面
  # 如果有展览页，补充：- pages/exhibition.md
```

---

### 第七步：修复社交链接（补充 `_includes/footer.html`）
如果你的 `footer.html` 缺失，创建这个文件（社交链接会显示在页脚）：
```html
<footer class="site-footer">
  <div class="footer-col-wrapper">
    <div class="footer-col footer-col-1">
      <h2 class="footer-heading">联系方式</h2>
      <ul class="contact-list">
        <li>
          <i class="fas fa-envelope"></i>
          <a href="mailto:3071974740@qq.com">3071974740@qq.com</a>
        </li>
      </ul>
    </div>

    <div class="footer-col footer-col-2">
      <h2 class="footer-heading">社交链接</h2>
      <ul class="social-media-list">
        <li>
          <i class="fab fa-github"></i>
          <a href="https://github.com/Duckweed-yhb" target="_blank">
            GitHub: Duckweed-yhb
          </a>
        </li>
        <li>
          <i class="fab fa-bilibili"></i>
          <a href="#" target="_blank">  <!-- 替换为你的B站链接 -->
            Bilibili: 你的B站昵称
          </a>
        </li>
        <li>
          <i class="fab fa-zhihu"></i>
          <a href="#" target="_blank">  <!-- 替换为你的知乎链接 -->
            知乎: 你的知乎昵称
          </a>
        </li>
      </ul>
    </div>

    <div class="footer-col footer-col-3">
      <h2 class="footer-heading">站点信息</h2>
      <p>记录成长，分享知识 | 总访问量 <i class="fas fa-eye"></i> <span id="busuanzi_value_site_pv"></span></p>
    </div>
  </div>

  <div class="footer-bottom">
    <p class="copyright">© {{ site.time | date: '%Y' }} Duckweed's Space</p>
    <p class="beian">
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备XXXXXXX号</a> <!-- 替换为你的备案号 -->
    </p>
  </div>
</footer>
```

---

### 总结
1. **核心修复**：通过新增 `page-card` 通用样式类，让所有页面复用文章页的白色半透明卡片+居中样式；
2. **最小改动**：只给每个页面的内容包裹 `<div class="page-card">`，不修改原有功能逻辑；
3. **补充缺失**：创建 `about.md` 和 `footer.html`，修复社交链接和导航栏；
4. **样式统一**：所有页面（首页/档案/友链/关于）现在和大物笔记页面样式完全一致。

替换这些文件后，你的博客所有页面都会有统一的白色半透明卡片、内容居中显示，社交链接出现在页脚，导航栏也会显示“档案”“友链”“关于”三个选项（有展览页的话补充即可）。

如果还有任何样式细节需要调整（比如卡片透明度、间距），只需要修改 `main.css` 里的 `page-card` 样式即可，非常方便～