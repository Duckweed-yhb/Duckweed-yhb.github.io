---
layout: default
title: 说明
permalink: /instructions/
render_with_liquid: true
---

<!-- 统一的白框容器（和关于/档案/展览/友链页样式一致） -->
<div class="page-card">

<h1>博客仓库完整文件结构说明</h1>

<blockquote>用于快速查阅全量文件/文件夹用途，精准定位 Debug 位置，适配 Jekyll + GitHub Pages 博客架构</blockquote>

---

## 一、完整目录树（100% 对应当前仓库）

```text
./
├── _data/
│   ├── friends.yml
│   ├── navigation.yml
│   └── social.yml
├── _includes/
│   ├── footer.html
│   ├── head.html
│   ├── header.html
│   ├── search.html
│   └── social.html
├── _layouts/
│   ├── default.html
│   └── post.html
├── _posts/
│   ├── 2026-02-10-c语言笔记汇总.md
│   ├── 2026-02-21-Welcome to Duckweed's Space.md
│   ├── 2026-02-23-大学物理(热学光学量子物理)笔记.md
│   ├── 2026-02-23-概率论与数理统计笔记.md
│   ├── 2026-03-16-latex-template.md
│   ├── 2026-03-30-VScode插件管理.md
│   └── 2026-03-30-VScode插件推荐.md
├── .github/
│   ├── workflows/
│   │   ├── pages-jekyll.yml
│   │   └── update-readme.yml
│   └── dependabot.yml
├── assets/
│   ├── css/
│   │   ├── custom-bg.css
│   │   ├── header.css
│   │   └── main.css
│   ├── images/
│   │   ├── bg.jpg
│   │   ├── 2026-03-30-1.png
│   │   ├── 2026-03-30-2.png
│   │   ├── 2026-03-30-3.png
│   │   ├── 2026-03-30-4.png
│   │   ├── 2026-03-30-5.png
│   │   ├── 2026-03-30-6.png
│   │   ├── bilibili.svg
│   │   ├── github.svg
│   │   ├── probability-notes-cover.jpg
│   │   ├── university-physics-notes(thermal-optics-quantum).jpg
│   │   └── zhihu.svg
│   ├── js/
│   ├── pdf/
│   │   ├── electromagnetic-field-notes.pdf
│   │   ├── probability-and-statistics-notes.pdf
│   │   └── university-physics(thermal-optics-quantum).pdf
│   └── videos/
│       └── background.mp4
├── pages/
│   ├── about.html
│   ├── archive.html
│   ├── blog-map.html
│   ├── course-map.html
│   ├── exhibition.html
│   ├── friends.html
│   ├── future.html
│   └── navigate.html
├── scripts/
│   └── generate_readme.py
├── templates/
│   └── README.template.md
├── _config.yml
├── 404.html
├── favicon.png
├── Gemfile
├── index.md
├── README.md
├── repo-guide.md
├── requirements.txt
└── search.json
```

---

## 二、全量文件/文件夹详细说明

### 📁 一级目录详解

#### 1. `_data/`（全局配置数据中心）

存放全站可复用的 YAML 配置数据，无需修改模板即可快速更新页面内容

| 文件名 | 作用 |
| :--- | :--- |
| `friends.yml` | 友链页面数据配置，管理友链名称、链接、描述 |
| `navigation.yml` | 导航栏菜单配置，控制顶部导航的栏目、顺序、链接 |
| `social.yml` | 社交账号链接配置，管理页脚/侧边栏的社交图标与跳转地址 |

#### 2. `_includes/`（页面可复用组件）

存放可在多个页面引用的 HTML 片段，统一维护公共组件，减少重复代码

| 文件名 | 作用 |
| :--- | :--- |
| `footer.html` | 全站页脚组件，包含版权信息、备案号、社交图标等 |
| `head.html` | 页面头部元信息，包含 SEO 标签、样式引入、JS 加载等 |
| `header.html` | 导航栏组件，控制顶部菜单的渲染逻辑、移动端适配 |
| `search.html` | 站内搜索框组件，实现文章检索功能 |
| `social.html` | 社交图标组件，统一渲染各平台的社交链接 |

#### 3. `_layouts/`（页面布局模板）

定义页面的整体骨架结构，所有页面基于模板渲染，保证全站布局统一

| 文件名 | 作用 |
| :--- | :--- |
| `default.html` | 全站默认布局模板，所有页面的基础骨架（包含 head、header、footer） |
| `post.html` | 文章页专属布局，继承 default 模板，适配文章阅读的排版、目录等 |

#### 4. `_posts/`（博客文章核心目录）

存放所有博客文章与文章内临时图片，是博客内容的核心载体

- **文件命名强制规范**：`YYYY-MM-DD-文章标题.md`，不符合格式的文件不会被 Jekyll 渲染
- **文章内图片**：可临时存放于此，建议统一迁移至 `assets/images/` 管理，避免混乱
- **包含文件类型**：技术笔记（C语言、LaTeX、VS Code）、课程笔记（大学物理、概率论）、首页欢迎页、文章临时配图

#### 5. `.github/`（GitHub 自动化配置）

管理 GitHub Actions 自动化任务与依赖更新，实现博客自动部署、文档自动更新

| 目录/文件 | 作用 |
| :--- | :--- |
| `workflows/pages-jekyll.yml` | GitHub Pages 自动部署脚本，提交代码后自动构建并部署博客 |
| `workflows/update-readme.yml` | README 自动更新脚本，定期同步仓库信息、最新博客列表 |
| `dependabot.yml` | 依赖自动更新配置，监控 Ruby/Python 依赖版本并自动提 PR |

#### 6. `assets/`（静态资源总目录）

存放所有非代码静态资源，按类型分类管理，便于维护和查找

##### 6.1 `assets/css/`（样式文件）

| 文件名 | 作用 |
| :--- | :--- |
| `custom-bg.css` | 自定义背景样式，控制页面背景图、视频、透明度等 |
| `header.css` | 导航栏专属样式，控制导航栏的布局、配色、交互效果 |
| `main.css` | 全站核心样式，定义全局字体、配色、排版、响应式布局 |

##### 6.2 `assets/images/`（图片资源）

存放博客封面、文章配图、图标等所有图片资源

| 文件名 | 作用 |
| :--- | :--- |
| `bg.jpg` | 网站背景图 |
| `bilibili.svg` / `github.svg` / `zhihu.svg` | 各社交平台图标 |
| `probability-notes-cover.jpg` | 概率论笔记文章封面图 |
| `university-physics-notes(thermal-optics-quantum).jpg` | 大学物理笔记文章封面图 |

##### 6.3 `assets/js/`（交互脚本）

存放博客交互逻辑脚本（如目录滚动、搜索、统计等），当前目录为空，后续可扩展

##### 6.4 `assets/pdf/`（PDF 资源）

存放课程笔记 PDF 源文件，用于文章内下载/预览

| 文件名 | 作用 |
| :--- | :--- |
| `probability-and-statistics-notes.pdf` | 概率论与数理统计笔记 PDF 源文件 |
| `university-physics(thermal-optics-quantum).pdf` | 大学物理笔记 PDF 源文件 |
| `electromagnetic-field-notes.pdf` | 电磁场与电磁波笔记 PDF 源文件 |

##### 6.5 `assets/videos/`（视频资源）

存放视频类静态资源，当前包含网站背景视频

| 文件名 | 作用 |
| :--- | :--- |
| `background.mp4` | 网站背景视频（可替代静态背景图） |

#### 7. `pages/`（独立页面文件）

存放非文章类的独立页面，直接渲染为博客的二级页面，功能独立

| 文件名 | 作用 |
| :--- | :--- |
| `about.html` | 「关于我」页面，展示个人介绍、联系方式、技能栈等 |
| `archive.html` | 文章归档页，按时间/分类/标签聚合所有博客文章 |
| `exhibition.html` | 作品集页面，展示项目、技能、书籍等个人成果 |
| `friends.html` | 友链页面，渲染 `_data/friends.yml` 中的友链数据 |
| `future.html` | 「未研」页面，展示博客间关系建设与功能迭代方向 |
| `navigate.html` | 「导航」页面，按访客身份（高中生/准大学生/大学生）+ 专业细分提供针对性引导 |
| `course-map.html` | 「课程地图」页面，参考 UC Berkeley EECS 设计，SVG 可视化课程先修依赖关系 |
| `blog-map.html` | 「博客地图」页面，SVG 网络图展示全部文章按五大主题分组的归属与关联 |

#### 8. `scripts/`（自动化脚本）

存放仓库自动化维护的 Python 脚本，减少手动操作

| 文件名 | 作用 |
| :--- | :--- |
| `generate_readme.py` | README 自动生成脚本，基于 `templates/README.template.md` 生成仓库首页说明，同步最新博客和目录树 |

#### 9. `templates/`（模板文件）

存放自动化生成文件的源模板，定义生成文件的结构和占位符

| 文件名 | 作用 |
| :--- | :--- |
| `README.template.md` | README 生成模板，定义 README 的结构、内容占位符（最新博客、目录树、更新时间） |

---

### 📄 根目录全量文件说明

| 文件名 | 作用 | Debug 优先级 |
| :--- | :--- | :--- |
| `_config.yml` | Jekyll 全局核心配置，控制博客标题、域名、主题、插件、构建规则等，修改后需重新构建生效 | ⭐⭐⭐⭐⭐（最高） |
| `404.html` | 404 错误页面，访问不存在的链接时展示，样式简洁居中 | ⭐⭐ |
| `favicon.png` | 浏览器标签页显示的网站图标，提升辨识度 | ⭐ |
| `Gemfile` | Ruby 依赖配置，指定 Jekyll 及相关插件版本，本地运行博客依赖此文件 | ⭐⭐⭐ |
| `index.md` | 博客首页入口，控制首页文章列表、快速导航、欢迎语等展示逻辑 | ⭐⭐⭐⭐ |
| `README.md` | GitHub 仓库首页展示的说明文档，由脚本自动生成并更新 | ⭐ |
| `repo-guide.md` | 本说明文件，用于快速查阅仓库结构与 Debug 定位 | ⭐⭐⭐ |
| `requirements.txt` | Python 依赖配置，指定 `generate_readme.py` 等脚本所需的 Python 库（如 pyyaml） | ⭐⭐⭐ |
| `search.json` | 站内搜索索引文件，由 Jekyll 自动生成，用于实现文章检索功能 | ⭐⭐ |
| `.gitignore` | Git 忽略文件规则，指定无需提交到 GitHub 的文件（如本地缓存、临时文件） | ⭐⭐⭐ |
| `CNAME` | 自定义域名配置，指定博客绑定的自定义域名，删除后域名无法访问 | ⭐⭐⭐⭐ |

---

## 三、常见问题 Debug 精准定位表

快速排查博客异常，无需逐一查找文件，提升维护效率

| 问题现象 | 核心排查路径 | 补充检查点 |
| :--- | :--- | :--- |
| 文章不显示/不更新 | `_posts/` 文件名格式、Front Matter 语法、文章日期 | `_config.yml` 构建配置 |
| 图片不显示/样式错乱 | `assets/` 资源路径、文件名大小写、`assets/css/` 样式文件 | 文章内图片链接、`_config.yml` 资源路径配置 |
| 部署失败/构建报错 | `_config.yml` 语法（缩进/冒号）、`.github/workflows/pages-jekyll.yml` | `Gemfile` 依赖版本 |
| 导航栏/页脚异常 | `_includes/header.html`/`footer.html`、`_data/navigation.yml`/`social.yml` | `_layouts/default.html` 模板 |
| 页面结构错乱 | `_layouts/default.html`/`post.html` | `_includes/` 组件引用 |
| 独立页面（关于/友链）异常 | `pages/` 对应页面文件、`_data/friends.yml` | `_layouts/` 页面布局 |
| 自动化脚本运行失败 | `scripts/generate_readme.py`、`requirements.txt` | `templates/README.template.md` |
| 域名无法访问 | 根目录 `CNAME` 文件、DNS 解析配置 | GitHub Pages 域名设置 |
| 搜索功能失效 | `search.json` 索引、`_includes/search.html` 组件 | `_config.yml` 搜索插件配置 |

---

## 四、补充维护建议

- **资源统一管理**：将 `_posts/` 内的临时图片迁移至 `assets/images/`，统一路径规范，避免图片丢失或路径错乱
- **本地测试优先**：所有修改先本地运行 `jekyll serve` 测试无误后，再提交到 GitHub，避免部署后出现异常
- **文档同步更新**：后续新增目录/文件后，同步更新此文档，保持结构说明的准确性，方便后续维护
- **核心文件备份**：`_config.yml`、`.github/workflows/` 等核心文件定期备份，避免误删导致博客瘫痪

</div>

<!-- 样式单独放在容器外，避免 Markdown 解析干扰（和关于/档案/展览/友链页完全一致） -->
<style>
  /* 核心：统一的白框容器 */
  .page-card {
    background: rgba(255, 255, 255, 0.88);
    padding: 35px 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    line-height: 1.8;
  }

  /* 标题与文本样式 */
  .page-card h1 {
    font-size: 2em;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5em;
    color: #2c3e50;
    margin-top: 0 !important;
    margin-bottom: 0.5em;
  }
  .page-card h2 {
    font-size: 1.5em;
    border-left: 4px solid #3498db;
    padding-left: 0.5em;
    color: #2c3e50;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  .page-card h3 {
    font-size: 1.2em;
    color: #3498db;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  .page-card h4 {
    font-size: 1.1em;
    color: #2c3e50;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  .page-card blockquote {
    border-left: 4px solid #eee;
    padding-left: 1em;
    color: #7f8c8d;
    margin: 1em 0;
  }
  .page-card a {
    color: #3498db;
    text-decoration: none;
  }
  .page-card a:hover {
    text-decoration: underline;
  }
  .page-card ul {
    padding-left: 1.5em;
  }
  .page-card li {
    margin: 0.5em 0;
  }
  .page-card hr {
    border: none;
    border-top: 1px dashed #eee;
    margin: 2em 0;
  }

  /* 表格样式 */
  .page-card table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 0.95em;
  }
  .page-card table th {
    background: #f0f7ff;
    color: #2c3e50;
    font-weight: 600;
    padding: 10px 15px;
    border: 1px solid #dcdfe6;
    text-align: left;
  }
  .page-card table td {
    padding: 8px 15px;
    border: 1px solid #ebeef5;
  }
  .page-card table tr:hover {
    background: #f5f7fa;
  }

  /* 代码块样式 */
  .page-card pre {
    background: rgba(247, 250, 252, 0.95);
    padding: 1.2rem;
    border-radius: 8px;
    overflow-x: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin: 1.5rem 0;
    font-size: 0.9em;
    line-height: 1.6;
  }
  .page-card code {
    background: rgba(247, 250, 252, 0.95);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
    font-size: 0.9em;
  }
  .page-card pre code {
    background: transparent;
    padding: 0;
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .page-card {
      padding: 25px 15px;
      margin: 0 10px;
    }
    .page-card h1 {
      font-size: 1.8em;
    }
    .page-card h2 {
      font-size: 1.3em;
    }
    .page-card table {
      font-size: 0.85em;
    }
    .page-card table th,
    .page-card table td {
      padding: 6px 10px;
    }
  }

  /* 暗黑模式适配 */
  @media (prefers-color-scheme: dark) {
    .page-card {
      background: rgba(30, 30, 40, 0.88);
    }
    .page-card h1, .page-card h2, .page-card h4 {
      color: #ecf0f1;
    }
    .page-card blockquote {
      color: #bdc3c7;
      border-left-color: #34495e;
    }
    .page-card hr {
      border-top-color: #34495e;
    }
    .page-card a {
      color: #3498db;
    }
    .page-card table th {
      background: #2c3e50;
      color: #ecf0f1;
      border-color: #34495e;
    }
    .page-card table td {
      border-color: #2c3e50;
    }
    .page-card table tr:hover {
      background: rgba(44, 62, 80, 0.4);
    }
  }
</style>