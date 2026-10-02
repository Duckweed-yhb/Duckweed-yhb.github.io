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
│   ├── series.yml
│   └── social.yml
├── _includes/
│   ├── footer.html
│   ├── head.html
│   ├── header.html（已废弃，导航移入 sidebar.html）
│   ├── search.html
│   ├── sidebar.html
│   └── social.html
├── _layouts/
│   ├── default.html
│   └── post.html
├── _posts/                    （YYYY-MM-DD-文章标题.md，共 46+ 篇）
├── .github/
│   ├── workflows/
│   │   ├── pages-jekyll.yml
│   │   └── update-readme.yml
│   └── dependabot.yml
├── assets/
│   ├── css/
│   │   ├── layout.css
│   │   ├── main.css
│   │   ├── sidebar.css
│   │   ├── star-intro.css      （首页「星海」入场动画）
│   │   ├── theme.css           （视觉体系层：设计令牌 / 星海背景 / 卡片 / 组件）
│   │   ├── theme-light.css     （手动切浅色时，抵消系统深色的覆盖层）
│   │   └── editorial.css       （编辑层：WIRED 派生的报刊式排版与统一页面容器）
│   ├── images/                （背景图、封面、社交图标、文章配图）
│   ├── js/                    （预留目录）
│   └── pdf/                   （课程笔记 PDF 源文件）
├── pages/
│   ├── about.html
│   ├── archive.html
│   ├── blog-map.html
│   ├── contribute.html
│   ├── course-map.html
│   ├── en-about.html
│   ├── en-home.html
│   ├── exhibition.html
│   ├── friends.html
│   ├── future.html
│   └── navigate.html
├── scripts/
│   └── generate_readme.py
├── templates/
│   └── README.template.md
├── .verify_plugins/           （校验构建专用插件目录，不参与发布）
├── .gitignore
├── 404.html
├── DESIGN.md                  （设计规范：编辑层 / 氛围层两套语言的权威文档）
├── favicon.png
├── Gemfile
├── index.html
├── manifest.json
├── README.md
├── repo-guide.md
├── requirements.txt
├── robots.txt
├── search.json
├── _config_verify.yml         （本地校验构建配置，不参与发布）
└── sw.js
```

---

## 二、全量文件/文件夹详细说明

### 📁 一级目录详解

#### 1. `_data/`（全局配置数据中心）

存放全站可复用的 YAML 配置数据，无需修改模板即可快速更新页面内容

| 文件名 | 作用 |
| :--- | :--- |
| `friends.yml` | 友链页面数据配置，管理友链名称、链接、描述 |
| `navigation.yml` | 侧边栏菜单配置，控制侧边导航的栏目、顺序、链接 |
| `series.yml` | 文章系列配置，定义系列名、描述与成员文章，驱动文章页底部「系列导航」 |
| `social.yml` | 社交账号链接配置，管理页脚/侧边栏的社交图标与跳转地址 |

#### 2. `_includes/`（页面可复用组件）

存放可在多个页面引用的 HTML 片段，统一维护公共组件，减少重复代码

| 文件名 | 作用 |
| :--- | :--- |
| `footer.html` | 全站页脚组件，包含版权信息、备案号、社交图标等 |
| `head.html` | 页面头部元信息，包含 SEO 标签、样式引入、JS 加载等 |
| `header.html` | 已废弃：导航移入 `sidebar.html`，此文件仅为占位保留 |
| `search.html` | 站内搜索框组件，实现文章检索功能 |
| `sidebar.html` | 侧边栏组件：站名 logo、搜索框、导航菜单、明暗切换、移动端菜单按钮 |
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
| `layout.css` | 星空背景、侧边栏浮层等布局层样式 |
| `main.css` | 全站核心样式，定义全局字体、配色、排版、响应式布局 |
| `sidebar.css` | 侧边栏专属样式，控制侧边栏的布局、配色、交互效果 |
| `star-intro.css` | 首页「星海」入场动画样式（一次访问只播一次，尊重「减少动态效果」偏好） |
| `theme.css` | **视觉体系层**：设计令牌（颜色 / 字体 / 圆角 / 阴影 / 渐变）、星海与海面背景、卡片体系、文章页、首页、归档、404、打印样式 |
| `theme-light.css` | 手动切换浅色时，用于抵消 `theme.css` 中系统深色 `@media` 规则的覆盖层 |
| `editorial.css` | **编辑层**：按 `DESIGN.md` 落地的报刊式排版 —— 标题阶梯、内链墨蓝、发丝线层级、方角几何、`story-row` 密集列表；并提供全站唯一的 `.page-card` / `.page-header-card` 容器，以及归档、友链、卡片网格等组件定义 |

> 样式分两层，改样式前请先读根目录 `DESIGN.md`：
> **编辑层**（`editorial.css`）负责长文阅读、页面容器、标题、内链与列表；
> **氛围层**（`theme.css` / `layout.css` / `sidebar.css`）负责星空、海面、侧边栏、页脚与浮层。
> 页面自身**不应**再内联 `.page-card` 这类公共容器样式，也不应声明页面级 `:root`。

##### 6.2 `assets/images/`（图片资源）

存放博客封面、文章配图、图标等所有图片资源

| `bg.jpg` | 网站背景图 / 站点 logo |
| `2026-*.png` | 各文章内嵌配图（按日期命名） |
| `bilibili.svg` / `github.svg` / `zhihu.svg` | 各社交平台图标 |
| `probability-notes-cover.jpg` | 概率论笔记文章封面图 |
| `university-physics-notes(thermal-optics-quantum).jpg` | 大学物理笔记文章封面图 |

##### 6.3 `assets/js/`（交互脚本）

存放博客交互逻辑脚本（如目录滚动、搜索、统计等），当前目录为空，后续可扩展

##### 6.4 `assets/pdf/`（PDF 资源）

存放课程笔记 PDF 源文件，用于文章内下载/预览

| 文件名 | 作用 |
| :--- | :--- |
| `electromagnetic-field-notes.pdf` | 电磁场与电磁波笔记 PDF 源文件 |
| `probability-and-statistics-notes.pdf` | 概率论与数理统计笔记 PDF 源文件 |
| `university-physics(thermal-optics-quantum).pdf` | 大学物理笔记 PDF 源文件 |

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
| `contribute.html` | 「投稿/贡献指南」页面，说明投稿方式、格式要求和联系方式 |
| `en-about.html` | 英文版「关于我」页面（`/en/about/`），多语言支持起步 |
| `en-home.html` | 英文版首页（`/en/`），与中文首页结构一致 |

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
| `DESIGN.md` | **设计规范**：以 awesome-design-md 的 WIRED 设计语言为基准，定义编辑层/氛围层两套视觉语言、颜色与排版令牌、组件、Do's & Don'ts。改任何视觉前先读它。已在 `_config.yml` 中排除，不作为访客页面生成 | ⭐⭐⭐⭐⭐ |
| `_config_verify.yml` | 本地校验构建配置（配合 `.verify_plugins/`），仅在离线/沙箱环境下用；不参与 GitHub Pages 发布 | ⭐⭐ |
| `404.html` | 404 错误页面，访问不存在的链接时展示，样式简洁居中 | ⭐⭐ |
| `favicon.png` | 浏览器标签页显示的网站图标，提升辨识度 | ⭐ |
| `Gemfile` | Ruby 依赖配置，指定 Jekyll 及相关插件版本，本地运行博客依赖此文件 | ⭐⭐⭐ |
| `index.html` | 博客首页入口，控制首页文章列表、快速导航、欢迎语等展示逻辑 | ⭐⭐⭐⭐ |
| `README.md` | GitHub 仓库首页展示的说明文档，由脚本自动生成并更新 | ⭐ |
| `repo-guide.md` | 本说明文件，用于快速查阅仓库结构与 Debug 定位 | ⭐⭐⭐ |
| `requirements.txt` | Python 依赖配置，指定 `generate_readme.py` 等脚本所需的 Python 库（如 pyyaml） | ⭐⭐⭐ |
| `search.json` | 站内搜索索引文件，由 Jekyll 自动生成，用于实现文章检索功能 | ⭐⭐ |
| `.gitignore` | Git 忽略文件规则，指定无需提交到 GitHub 的文件（如本地缓存、临时文件） | ⭐⭐⭐ |
| `.verify_plugins/` | 校验构建专用插件目录（默认 `plugins_dir` 是 `_plugins`，正常构建与 GitHub Pages 都不会加载它） | ⭐ |
| `sw.js` | Service Worker 脚本：静态资源离线缓存，页面导航请求 network-first | ⭐⭐ |
| `manifest.json` | PWA 配置，站点名称/主题色/图标（建议补 192/512 尺寸图标） | ⭐ |
| `robots.txt` | 爬虫规则，指向 sitemap.xml | ⭐ |

---

## 三、常见问题 Debug 精准定位表

快速排查博客异常，无需逐一查找文件，提升维护效率

| 问题现象 | 核心排查路径 | 补充检查点 |
| :--- | :--- | :--- |
| 文章不显示/不更新 | `_posts/` 文件名格式、Front Matter 语法、文章日期 | `_config.yml` 构建配置 |
| 图片不显示/样式错乱 | `assets/` 资源路径、文件名大小写、`assets/css/` 样式文件 | 文章内图片链接、`_config.yml` 资源路径配置 |
| 部署失败/构建报错 | `_config.yml` 语法（缩进/冒号）、`.github/workflows/pages-jekyll.yml` | `Gemfile` 依赖版本 |
| 导航栏/页脚异常 | `_includes/sidebar.html`/`footer.html`、`_data/navigation.yml`/`social.yml` | `_layouts/default.html` 模板 |
| 页面结构错乱 | `_layouts/default.html`/`post.html` | `_includes/` 组件引用 |
| 独立页面（关于/友链）异常 | `pages/` 对应页面文件、`_data/friends.yml` | `_layouts/` 页面布局 |
| 自动化脚本运行失败 | `scripts/generate_readme.py`、`requirements.txt` | `templates/README.template.md` |
| 搜索功能失效 | `search.json` 索引、`_layouts/default.html` 侧边栏搜索脚本 | `_config.yml` 搜索配置 |
| 明暗切换在某页失效 / 某页文字颜色不对 | 该页是否**残留页面级 `:root`**，或是否还在用 `@media (prefers-color-scheme: dark)` 做颜色覆盖 | 页面级 `:root` 会污染全局令牌，且只跟随系统、不响应手动切换；颜色一律改用全局令牌（`--paper` / `--text-*` / `--line` / `--link-ink`），规范见 `DESIGN.md` |
| 内链颜色不对 / 墨蓝不生效 | `assets/css/editorial.css` 的 `--link-ink`，以及 `layout.css`、`theme-light.css` 中是否有把颜色写死的 `!important` 规则盖住令牌 | 用无头浏览器读 `getComputedStyle(el).color` 与 CDP `CSS.getMatchedStylesForNode` 定位胜出规则 |
| 圆角/阴影风格不一致 | 编辑层（纸面上的面）应为方角 `--radius-editorial`，氛围层（星空浮层）才用圆角 | `assets/css/editorial.css` 第 9 节「编辑层几何统一」 |
| 文章页版心太窄 / 正文只占屏幕一小块 | `_layouts/post.html` 内联 `<style>` 与 `main.css`、`layout.css` 里 `.post-container` 各自写的 `max-width` | 版心宽度只应来自 `DESIGN.md` 的 `--width-article`（纸面）与 `--width-reading`（阅读栏），见 `editorial.css` 第 5.5 节「文章页版式」 |
| 侧边栏开关按钮与导航面板重叠 | `assets/css/sidebar.css` 的 `.sidebar-toggle` 与 `.site-sidebar.open` | 浮层打开时唤出按钮必须让位（面板右上角另有 ✕） |
| 窄屏下 ☰ 压住文章卡顶部的面包屑 | `main.css` 的 `body.layout-post .page-content { padding: 0 !important }` 清掉了为 ☰ 预留的顶部内边距 | `editorial.css` 响应式一节里 `body.layout-post main.page-content` 的补偿规则 |

---

## 四、补充维护建议

- **资源统一管理**：将 `_posts/` 内的临时图片迁移至 `assets/images/`，统一路径规范，避免图片丢失或路径错乱
- **本地测试优先**：所有修改先本地运行 `jekyll serve` 测试无误后，再提交到 GitHub，避免部署后出现异常
- **文档同步更新**：后续新增目录/文件后，同步更新此文档，保持结构说明的准确性，方便后续维护
- **核心文件备份**：`_config.yml`、`.github/workflows/` 等核心文件定期备份，避免误删导致博客瘫痪
- **改视觉先读规范**：任何涉及配色、字体、圆角、间距的改动，先读根目录 `DESIGN.md`，把改动写进对应的层（编辑层 → `editorial.css`，氛围层 → `theme.css`），不要写进页面
- **随手清历史债**：`layout.css` / `main.css` / `theme-light.css` 里仍有一批早期写死的颜色（只按 `prefers-color-scheme` 分支，不走令牌），后续替换为新页面时优先顺手改成全局令牌

</div>

