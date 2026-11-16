---
layout: default
title: 说明
permalink: /instructions/
render_with_liquid: true
---

<!-- 统一的白框容器（和关于/档案/展览/友链页样式一致） -->
<div class="page-card">

<h1>仓库结构与文件说明</h1>

<p>这份文档对应仓库当前的真实状态：目录树逐项核对过，文件数量、职责、加载顺序都以实际文件为准。用途是让你在改东西之前先知道「该改哪个文件」，出问题时能直接定位。最后更新：2026-11-16。</p>

---

## 一、目录树

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
│   ├── header.html
│   ├── sidebar.html
│   └── social.html
├── _layouts/
│   ├── campus-guide.html
│   ├── default.html
│   └── post.html
├── _posts/
├── .github/
│   ├── workflows/
│   │   ├── pages-jekyll.yml
│   │   └── update-readme.yml
│   └── dependabot.yml
├── assets/
│   ├── css/
│   │   ├── bloom.css
│   │   ├── campus-guide.css
│   │   ├── editorial.css
│   │   ├── layout.css
│   │   ├── main.css
│   │   ├── sidebar.css
│   │   ├── star-intro.css
│   │   ├── starsea.css
│   │   ├── theme-light.css
│   │   └── theme.css
│   ├── fonts/
│   │   ├── OFL.txt
│   │   └── playfair-display-latin-400.woff2
│   ├── images/
│   │   ├── 2026-03-30-1.png … 2026-03-30-6.png
│   │   ├── 2026-04-28-1.png … 2026-04-28-4.png
│   │   ├── bg.jpg
│   │   ├── bilibili.svg
│   │   ├── github.svg
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── zhihu.svg
│   ├── js/
│   │   ├── enhance.js
│   │   └── star-intro.js
│   └── pdf/
│       └── electromagnetic-field-notes.pdf
├── pages/
│   ├── campus/
│   │   └── hitsz-ee/
│   │       ├── beyond/
│   │       │   ├── README.md
│   │       │   ├── competition.md
│   │       │   ├── internship.md
│   │       │   └── project.md
│   │       ├── curriculum/
│   │       │   ├── README.md
│   │       │   ├── y1-autumn.md
│   │       │   ├── y1-spring.md
│   │       │   ├── y1-summer.md
│   │       │   ├── y2-autumn.md
│   │       │   ├── y2-spring.md
│   │       │   ├── y2-summer.md
│   │       │   ├── y3-autumn.md
│   │       │   ├── y3-spring.md
│   │       │   ├── y3-summer.md
│   │       │   ├── y4-autumn.md
│   │       │   ├── y4-spring.md
│   │       │   └── y4-summer.md
│   │       └── index.md
│   ├── about.html
│   ├── ai-dictionary.html
│   ├── archive.html
│   ├── blog-map.html
│   ├── contribute.html
│   ├── course-map.html
│   ├── en-about.html
│   ├── en-home.html
│   ├── exhibition.html
│   ├── friends.html
│   ├── future.html
│   ├── navigate.html
│   └── network.html
├── scripts/
│   ├── compress_images.py
│   ├── fix_frontmatter.py
│   └── generate_readme.py
├── templates/
│   └── README.template.md
├── _config.yml
├── _config_verify.yml
├── .gitignore
├── 404.html
├── DESIGN.md
├── favicon.png
├── Gemfile
├── index.html
├── LICENSE
├── LICENSE-posts.txt
├── manifest.json
├── README.md
├── repo-guide.md
├── requirements.txt
├── robots.txt
├── search.json
└── sw.js
```

`_posts/` 下是 60 篇文章，命名 `YYYY-MM-DD-标题.md`，日期范围 2026-02-21 ~ 2026-10-15。`assets/images/` 里的 `2026-03-30-1 … 6` 与 `2026-04-28-1 … 4` 是按文章日期命名的配图。

> `.git/`、`.jekyll-cache/`、`.sass-cache/`、`vendor/`、`.bundle/`、`node_modules/` 属于构建与版本控制产物；`.preview-site/`、`.shots/`、`.verify_plugins/` 是本地校验目录，均被 `.gitignore` 忽略，不属于站点内容，故未列入上面的树。

---

## 二、目录与文件职责

### 1. `_data/`（全站数据）

改内容不改模板的地方。四个 YAML 分别驱动友链、导航、系列、社交链接；新增文章系列要同时改 `series.yml` 和文章 Front Matter 里的 `series` 字段。

### 2. `_includes/`（组件）

| 文件 | 职责 |
| :--- | :--- |
| `footer.html` | 页脚三栏（站名 / 社交 / 关于本站）与页脚诗词 `.footer-verse` |
| `head.html` | 字符集、viewport、SEO 标签、`theme-light.css`、RSS、favicon、PWA |
| `header.html` | **已废弃**：早期顶部导航的占位文件，全站无 `include` 引用，可随时删除 |
| `sidebar.html` | 侧边栏：站名、搜索框、导航、明暗三态、十套色板、移动端开关 |
| `social.html` | 按 `social.yml` 渲染社交图标 |

站内搜索现在只有一套实现：`_layouts/default.html` 内联的侧边栏搜索（读 `search.json`，180 ms 防抖，最多 8 条）。原先的第二套 `_includes/search.html` 已于 2026-11-16 删除，不要恢复。

### 3. `_layouts/`

| 文件 | 职责 |
| :--- | :--- |
| `default.html` | 全站骨架：head、星空背景、侧边栏、主内容、页脚；并内联侧边栏开合、三态明暗、色板切换、搜索、Service Worker 注册 |
| `post.html` | 文章页：面包屑、标题区、正文容器、系列导航、相关文章、目录抽屉 |
| `campus-guide.html` | 同校指南专用，额外加载 `assets/css/campus-guide.css` |

### 4. `_posts/`

60 篇文章，命名必须为 `YYYY-MM-DD-标题.md`，否则不参与渲染。Front Matter 默认：`layout: post`、`render_with_liquid: true`、`math: false`（需要公式的文章单独写 `math: true`）。文章日期以 Front Matter 的 `date` 为准，排序也按它。

### 5. `assets/css/`（10 个文件，分层明确）

| 文件 | 层 | 职责 |
| :--- | :--- | :--- |
| `theme.css` | 氛围层 / 令牌 | 设计令牌（颜色、字体、圆角、阴影、渐变）、星海与海面背景、卡片、文章页、首页、归档、404、打印；`@font-face` 也在这里 |
| `theme-light.css` | 令牌覆盖 | 手动切浅色时抵消系统深色，仅 `html.force-light` 生效 |
| `layout.css` | 布局 | 星空/流星、页面容器盒模型、内容区标题与正文、`html.force-dark` 整块 |
| `main.css` | 基础 | 全站字体与排版、文章卡、代码块盒模型、标签与归档组件、页脚、响应式 |
| `sidebar.css` | 组件 | 侧边栏布局、搜索框与结果、明暗与色板按钮 |
| `editorial.css` | 编辑层 | 报刊式排版：标题阶梯、内链墨蓝、发丝线、方角几何、`.page-card` / `.page-header-card` 容器 |
| `starsea.css` | 首页组件 | 首页「星海拾句」诗词横幅 `.starsea` |
| `star-intro.css` | 首页组件 | 首屏「星海」入场动画 |
| `bloom.css` | 色板覆盖 | 十套 Bloom 色板（`html[data-palette]`），对令牌与组件做局部覆盖 |
| `campus-guide.css` | 页面级 | 同校指南页面的表格、阶段卡、代码块 |

加载顺序（`_layouts/default.html`）：`head.html`（含 `theme-light.css`）→ `main.css` → `sidebar.css` → `layout.css` → `theme.css` → `editorial.css` → `bloom.css`。首页额外加载 `star-intro.css`、`starsea.css`、`star-intro.js`，campus 页额外加载 `campus-guide.css`。

颜色只走令牌。改样式前先读 `DESIGN.md`：编辑层写进 `editorial.css`，氛围层写进 `theme.css`，页面里不要再写 `:root`、不要内联公共容器样式。深色有三条路径（系统 `@media`、`html.force-dark`、`html.force-light`），新增令牌三处都要补齐。

### 6. `assets/js/`

| 文件 | 职责 |
| :--- | :--- |
| `enhance.js` | 代码块语言标签与复制、标题锚点、图片懒加载与灯箱、回到顶部、搜索快捷键（`/`、`Ctrl/Cmd+K`）、外链新窗口、阅读进度条 |
| `star-intro.js` | 首页入场动画，`sessionStorage` 保证一次访问只播一次，尊重 `prefers-reduced-motion` |

### 7. `assets/fonts/`

只自托管了 Playfair Display Latin 400（用于西文与数字的衬线对比），中文仍由系统字体（Noto Serif SC / 宋体 / 楷体）承担，避免整站拖入数 MB 的中文字库。新增字体必须同时放许可证文件，并在 `theme.css` 写 `@font-face`（`font-display: swap` + `unicode-range`）。

### 8. `assets/images/` 与 `assets/pdf/`

图片按「文章日期-序号」命名；`bg.jpg` 是站点背景图；`icon-192.png` / `icon-512.png` 供 PWA 使用。PDF 只有一份电磁场笔记，供文章内下载。

### 9. `pages/`（13 个 HTML + 18 篇 Markdown）

| 文件 | 路由 | 职责 |
| :--- | :--- | :--- |
| `about.html` | `/about/` | 关于我 |
| `navigate.html` | `/navigate/` | 按身份与专业分流的入口页 |
| `archive.html` | `/archive/` | 归档：按时间、分类、标签聚合 |
| `network.html` | `/network/` | 星网：文章之间的关系图 |
| `course-map.html` | `/course-map/` | 课程地图：电气与计算机先修脉络（SVG） |
| `blog-map.html` | `/blog-map/` | 博客地图：全部文章的主题归属 |
| `ai-dictionary.html` | `/ai-dictionary/` | AI 编程词典 |
| `exhibition.html` | `/exhibition/` | 展览：项目、技能、书籍 |
| `friends.html` | `/friends/` | 友链 |
| `future.html` | `/future/` | 未研：功能与关系建设方向 |
| `contribute.html` | `/contribute/` | 投稿与贡献指南 |
| `en-home.html` | `/en/` | 英文首页 |
| `en-about.html` | `/en/about/` | 英文关于页 |

`pages/campus/hitsz-ee/` 共 18 篇：`index.md` 总览；`curriculum/` 下 12 个学期页 + 1 个 README；`beyond/` 下 README、竞赛、项目、实习 4 篇。页面 Front Matter 使用 `layout: campus-guide`，新增页面后要同步 `index.md` 与 `_data/navigation.yml`。

### 10. `scripts/`

| 文件 | 职责 |
| :--- | :--- |
| `generate_readme.py` | 扫描真实目录与 `_posts/`，按 `templates/README.template.md` 生成根目录 README；目录树排除构建产物与本地校验目录，文章按 Front Matter `date` 倒序取 8 篇 |
| `compress_images.py` | 图片压缩（需要 Pillow） |
| `fix_frontmatter.py` | 批量修正文章 Front Matter |

README 由脚本生成，**不要手改**：手改会在下次 `update-readme.yml` 运行时被覆盖。本地生成需要 Python 3 与 `pyyaml`（见 `requirements.txt`）。

### 11. `templates/`

`README.template.md` 是 README 的唯一结构来源，占位符由脚本填充；改 README 版式改这里，不要改产物。

### 12. `.github/`

`pages-jekyll.yml`：push 到 `main` → Ruby 3.1 → `bundle exec jekyll build` → 上传 artifact → `deploy-pages` 部署。
`update-readme.yml`：手动或定时运行 README 生成脚本并提交回仓库。
`dependabot.yml`：Ruby 与 GitHub Actions 依赖更新。

---

## 三、根目录文件

| 文件 | 职责 | 改动风险 |
| :--- | :--- | :--- |
| `_config.yml` | 站点主配置：标题、域名、主题、插件、文章与页面默认值、`exclude` | 最高，改完必须重新构建 |
| `_config_verify.yml` | 离线校验用配置，配合 `.verify_plugins/`，不参与发布 | 低 |
| `Gemfile` | Ruby 依赖，锁 `github-pages ~> 231`（Jekyll 3.9 系） | 高，版本一变部署就可能失败 |
| `requirements.txt` | Python 依赖（`pyyaml`） | 低 |
| `index.html` | 首页：欢迎语、最新文章、探索入口、星海拾句 | 中 |
| `404.html` | 404 页，页面上方独立卡片 + 页脚 | 低 |
| `search.json` | 侧边栏搜索索引，由 Jekyll 渲染生成 | 中，改字段要同步侧边栏脚本 |
| `sw.js` | Service Worker：导航 network-first、静态资源 cache-first，缓存名带构建时间戳 | 中 |
| `manifest.json` | PWA 名称、主题色、图标 | 低 |
| `robots.txt` | 爬虫规则与 sitemap 指向 | 低 |
| `favicon.png` | 浏览器图标 | 低 |
| `DESIGN.md` | 设计规范：令牌表、组件、Do's & Don'ts、已知取舍 | 改视觉前必读 |
| `README.md` | 仓库门面，脚本生成 | 不要手改 |
| `repo-guide.md` | 本文件 | 结构变化后同步 |
| `LICENSE` | 代码授权 | 低 |
| `LICENSE-posts.txt` | 文章内容授权 | 低 |
| `.gitignore` | 忽略构建产物、本地预览、校验目录 | 低 |

---

## 四、构建、预览与文档生成

**线上**：GitHub Actions 用 Ruby 3.1 跑 `bundle exec jekyll build`，产物交给 Pages。`_config.yml` 的 `exclude` 已排除 `README.md`、`DESIGN.md`、`scripts/`、`templates/`、`requirements.txt`、`Gemfile` 等非站点文件。

**本地**：`Gemfile` 锁的是 `github-pages ~> 231`，它要求 Ruby 3.1 左右。本机若是 Ruby 3.4，直接 `bundle install` 大概率在原生扩展上失败，这属于版本约束问题，不是配置写错。想在本地真实构建，用 Ruby 3.1（rbenv / Docker `ruby:3.1`）再 `bundle exec jekyll serve`。

**本机可用的离线校验构建**：仓库里有 `_config_verify.yml` 与 `.verify_plugins/`，专门用来绕过 `github-pages` 元 gem：本机已装 Jekyll 4.4.1 与站点所需插件，用 `JEKYLL_NO_BUNDLER_REQUIRE=true` 直接跑即可。`_config_verify.yml` 里用 `disable_scss.rb` 让 SCSS 转换器不匹配任何扩展名，因为 minima 自带的 `assets/main.scss` 在本机会因 `IO.pipe` 权限报错，而本站从未引用它。

```powershell
$env:JEKYLL_NO_BUNDLER_REQUIRE = "true"
# PATH 里没有 jekyll binstub 时，用 gem 安装目录里的 exe 入口（版本号按本机实际改）
$exe = Join-Path (gem env home) 'gems\jekyll-4.4.1\exe\jekyll'
ruby $exe build --disable-disk-cache --config _config.yml,_config_verify.yml -d "$env:TEMP\site_verify"
```

构建成功会打印 `done in x seconds`，退出码 0；产物在 `%TEMP%\site_verify`，可直接用 `python -m http.server` 起服务做截图验收。

**没有 Jekyll 时的静态校验**：仓库里有被忽略的 `.preview-site/` 完整静态产物。把 `assets/css/*` 与 `assets/fonts/*` 同步进去，用 `python -m http.server` 起服务，再用无头 Chrome 截图，就能验证浅色、深色、404 与说明页的真实渲染。注意两点：`Invoke-WebRequest` 可能被系统代理拖到超时，用 `curl.exe --noproxy "*"`；`Copy-Item -LiteralPath` 不展开通配符，要 `Get-ChildItem | Copy-Item`。

**README 生成**：

```powershell
python -m pip install --quiet pyyaml
python scripts/generate_readme.py
```

脚本会打印解析到的文章数与输出的条数，写完直接 `git diff README.md` 看树是否符合预期。

---

## 五、Debug 定位表

| 现象 | 先查 | 再查 |
| :--- | :--- | :--- |
| 文章不显示 / 日期不对 | `_posts/` 文件名格式、Front Matter `date` 与 `published` | `_config.yml` 的 `future`/`timezone` |
| 图片不显示 | `assets/images/` 路径与大小写 | 文章里的相对路径、`relative_url` |
| 构建失败 | `_config.yml` 缩进与冒号 | `Gemfile` 版本、workflow 的 Ruby 版本 |
| 导航 / 页脚异常 | `_data/navigation.yml`、`social.yml`、`_includes/sidebar.html`、`footer.html` | `_layouts/default.html` |
| 侧边栏搜索失效 | `search.json` 是否生成、`default.html` 内联搜索脚本 | 浏览器控制台的 JSON 解析报错 |
| 手动深色下某处颜色不对 | 该选择器是否还在写 `#hex`/`rgba()`，而不是 `var(--…)` | `theme.css` 的 `html.force-dark` 令牌块是否漏了该令牌 |
| 手动浅色下仍是深色 | `theme-light.css` 的 `html.force-light` 是否缺该令牌 | 是否有 `!important` 在 `html.force-dark` 之外把颜色写死 |
| 内链颜色被盖 | `editorial.css` 的 `--link-ink` | `layout.css` / `theme-light.css` 里有没有 `!important` 抢先 |
| 404 数字不是红色 | `.error-404-code` 是否被 `.page-content h1` 的渐变裁剪与 `-webkit-text-fill-color: transparent` 盖住 | `--error` 令牌是否在三条深色路径里都定义 |
| 代码块与正文配色不一致 | 代码块统一由 `theme.css` 的 `--grad-code` 控制 | `bloom.css` 的色板覆盖是否生效 |
| 版心宽度打架 | `_layouts/post.html` 内联样式、`main.css`、`layout.css` 里各自的 `max-width` | `DESIGN.md` 的 `--width-article` / `--width-reading` |
| 字体没生效 | `assets/fonts/` 是否真的存在、`@font-face` 的 `url` 是否相对 `assets/css/` | `font-family` 调用方是否用了 `var(--font-display)` |
| 圆角 / 阴影风格不统一 | 编辑层用方角，氛围层才用圆角 | `editorial.css` 的几何统一一节 |
| 窄屏 ☰ 压住面包屑 | `main.css` 清掉了文章页顶部内边距 | `editorial.css` 响应式补偿规则 |

---

## 六、维护约定

1. **新增文章**：放 `_posts/`，命名 `YYYY-MM-DD-标题.md`，Front Matter 写 `title`、`date`、`categories`、`tags`，需要系列就加 `series`；然后重跑 README 脚本。
2. **新增页面**：放 `pages/`，Front Matter 写 `layout: default` 与 `permalink`，再加进 `_data/navigation.yml`，最后同步本文件与 README。
3. **新增同校指南**：放 `pages/campus/hitsz-ee/`，`layout: campus-guide`，并更新 `index.md` 的目录。
4. **改样式**：只改 `assets/css/`。颜色、字体、圆角、阴影、渐变一律用 `theme.css` 的令牌；新增令牌必须同时补 `@media`、`html.force-dark`、`html.force-light` 三处。
5. **改结构**：同步改 `README.template.md`（README 的树）与本文件；不要手改 `README.md`。
6. **提交前自检**：CSS 花括号配平、`assets/css` 里不再出现新的写死颜色、无头截图看浅色与深色、404 与说明页各一张。
7. **不要恢复**：`_includes/search.html`（第二套搜索）、`_includes/header.html`（废弃导航），以及页面里的 `:root` 颜色块。

</div>
