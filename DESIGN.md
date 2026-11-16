---
version: alpha
name: 星隅-design-analysis
description: 星隅（Duckweed 的个人博客）的编辑层设计系统 —— 以 awesome-design-md 中 WIRED 的报刊式设计语言为基准，落到「星海 + 浮萍」既有身份上：衬线承载叙事、无衬线承载结构，发丝线取代阴影承担层级，方角几何，并把唯一的一抹彩色留给正文内链。

sources:
  spec: https://getdesign.md/wired/design-md
  collection: https://github.com/VoltAgent/awesome-design-md
  local_path: 05 - 学习资源/skill/07 - 界面与UI设计/awesome-design-md-main/awesome-design-md-main/design-md/wired/DESIGN.md
  implementation: assets/css/editorial.css

colors:
  ink: "#05070f"          # --ink-1000 星海底色
  canvas: "#ffffff"       # 浅色纸面
  canvas-dark: "#181b2b"  # 深色纸面
  paper: "rgba(255,255,255,0.90)"        # --paper 卡片纸面（浅色）
  paper-dark: "rgba(24,27,43,0.88)"      # --paper 卡片纸面（深色）
  hairline: "rgba(74,111,165,0.16)"      # --line 发丝线（浅色）
  hairline-dark: "rgba(164,139,247,0.20)" # --line 发丝线（深色）
  text-strong: "#1b2033"  # --text-strong
  text: "#39415c"         # --text
  text-soft: "#667089"    # --text-soft
  text-muted: "#8b93aa"   # --text-muted
  link-ink: "#057dbc"     # --link-ink WIRED 的内链墨蓝
  link-ink-hover: "#03628f"
  link-ink-dark: "#4aa8d8"
  brand-blue: "#4a6fa5"   # --blue 品牌蓝
  brand-violet: "#7a5cf0" # --violet 品牌紫
  warn: "#9a6b16"         # --warn 警告 / 空状态（深色 #d6a94a）
  error: "#b4483f"        # --error 错误态（深色 #e0857c）
  tag-accent: "#fb7299"   # --tag-accent 标签芯片暖粉
  on-brand: "#ffffff"     # --on-brand 品牌色块上的文字
  code-light: "linear-gradient(160deg,#101628,#141a33)"  # --grad-code 浅色下的深海代码块
  code-dark: "linear-gradient(160deg,#121a2e,#172039)"   # --grad-code 深色变体
  verse-light: "linear-gradient(112deg,#244b7d,#43398f,#5f47a8)"  # --grad-verse 浅色诗词

typography:
  display-hero:
    fontFamily: ["Playfair Display", "Noto Serif SC", "Songti SC", "SimSun", "serif"]
    fontSize: clamp(2.4rem, 1.5rem + 3.4vw, 3.6rem)
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: 0.01em
  display-lg:
    fontFamily: ["Playfair Display", "Noto Serif SC", "Songti SC", "SimSun", "serif"]
    fontSize: clamp(1.95rem, 1.35rem + 2.2vw, 2.9rem)
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: 0.01em
  display-md:
    fontFamily: ["Playfair Display", "Noto Serif SC", "Songti SC", "SimSun", "serif"]
    fontSize: clamp(1.5rem, 1.25rem + 1.1vw, 2rem)
    fontWeight: 400
    lineHeight: 1.22
  display-sm:
    fontFamily: ["Playfair Display", "Noto Serif SC", "Songti SC", "SimSun", "serif"]
    fontSize: clamp(1.25rem, 1.12rem + 0.6vw, 1.6rem)
    fontWeight: 400
    lineHeight: 1.30
  display-xs:
    fontFamily: ["Playfair Display", "Noto Serif SC", "Songti SC", "SimSun", "serif"]
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.40
    letterSpacing: -0.01em
  body-serif-md:
    fontFamily: ["Noto Serif SC", "Songti SC", "SimSun", "serif"]
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: 0.01em
  body-md:
    fontFamily: ["Microsoft Yahei", "-apple-system", "Segoe UI", "sans-serif"]
    fontSize: 16px
    fontWeight: 400
  body-sm:
    fontFamily: ["Microsoft Yahei", "-apple-system", "Segoe UI", "sans-serif"]
    fontSize: 14px
  eyebrow:
    fontFamily: ["Microsoft Yahei", "-apple-system", "Segoe UI", "sans-serif"]
    fontSize: 14px
    fontWeight: 700
    letterSpacing: 0.14em
    textTransform: uppercase
  byline:
    fontFamily: ["Noto Serif SC", "serif"]
    fontSize: 12.7px
    fontWeight: 700
    lineHeight: 2.2
  caption:
    fontFamily: ["Microsoft Yahei", "-apple-system", "Segoe UI", "sans-serif"]
    fontSize: 12px

rounded:
  editorial: 2px      # --radius-editorial 编辑层方角
  md: 14px            # --radius
  lg: 20px            # --radius-lg 氛围层玻璃面
  pill: 999px         # --radius-pill 标签芯片 / 圆形图标按钮

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  4xl: 48px

elevation:
  level-0-flat: none                             # 默认：无阴影无边框
  level-1-hairline: 1px solid var(--line)        # 分隔行 / 输入框 / 表头 / 标题下横线
  level-2-soft: var(--shadow-md)                 # 纸面卡片落座于星海
  level-3-float: var(--shadow-lg) + var(--shadow-glow)  # 悬停 / 浮层

components:
  page-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.editorial}"
    padding: 34px 28px
    maxWidth: 1080px
    variant-wide-maxWidth: 1200px
  page-header-card:
    backgroundColor: "{colors.paper}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.editorial}"
    padding: 34px 28px
  heading-h1:
    typography: "{typography.display-lg}"
    borderBottom: "1px solid {colors.hairline}"
  heading-h2:
    typography: "{typography.display-md}"
  heading-h3:
    typography: "{typography.display-sm}"
  heading-h4:
    typography: "{typography.display-xs}"
  eyebrow:
    typography: "{typography.eyebrow}"
    textColor: "{colors.text-soft}"
  inline-link:
    textColor: "{colors.link-ink}"
    underlineColor: "rgba(5,125,188,0.35)"
    hoverColor: "{colors.link-ink-hover}"
  hairline-rule:
    borderColor: "{colors.hairline}"
  story-row:
    borderColor: "{colors.hairline}"
    padding: "16px 0"
    hoverBorderColor: "{colors.brand-blue}"
  table-header:
    backgroundColor: "var(--line-soft)"
    typography: "{typography.body-sm}"
    cellPadding: "10px 14px"
  archive-tab:
    rounded: "{rounded.editorial}"
    activeBackgroundColor: "{colors.brand-blue}"
    activeTextColor: "var(--on-brand)"
    typography: "{typography.eyebrow}"
  card-grid:
    rounded: "{rounded.editorial}"
    padding: "32px 24px"
    hoverBorderColor: "{colors.brand-blue}"
---

# 星隅 DESIGN.md

> 本文件是「星隅」博客的权威设计规范。任何改动视觉的提交都应先读它。
> 规范来源：[awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 的
> [WIRED DESIGN.md](https://getdesign.md/wired/design-md)，由 `assets/css/editorial.css` 落地。

## Overview

星隅的视觉分两层，这是全站最重要的架构约定：

| 层 | 承载 | 实现文件 | 语言来源 |
|---|---|---|---|
| **编辑层** | 长文阅读、页面容器、标题阶梯、内链、发丝线、列表与表格 | `assets/css/editorial.css` | **WIRED**（报刊式严谨） |
| **氛围层** | 星空夜、海面潮光、侧边栏、页脚、灯箱、浮动交互 | `theme.css` / `layout.css` / `sidebar.css` | 星隅自有（星海 + 浮萍） |

WIRED 提供的是**严谨度**，不是配色。它把一本印刷杂志搬到网页上：
白纸黑字、三个字族各司其职、发丝线分隔、方角几何、**唯一的一抹彩色只留给正文内链**。

星隅保留了自有的深蓝夜空与蓝紫渐变，但把 WIRED 的结构纪律完整接了过来：

**Key Characteristics**

- **衬线叙事，无衬线结构。** 正文与标题一律衬线；导航、眉标、元信息、按钮、表头一律无衬线。两侧不越界。
- **display 字重恒为 400。** 标题的优雅来自字面设计，不来自加粗——这是 WIRED 最反直觉、也最有效的一条。
- **发丝线是主要层级手段。** 1px 的 `--line` 分隔行、表头、卡片边框；阴影只在需要「落座」和「浮起」时出场。
- **编辑层方角 2px。** 卡片、按钮、输入框、表格、标签一律直角观感；只有标签芯片与圆形图标按钮允许胶囊形。
- **眉标（eyebrow）** 是全大写 + 0.14em 宽字距的无衬线小字，用来给章节和分类立形。
- **内链墨蓝 `#057dbc`** 是全站唯一的「引用色」，只出现在正文内链，不上按钮、不上导航。

## Colors

### Surface（面）
- **Canvas 纸面** `{colors.paper}`：卡片与页面容器的底。浅色为 90% 白，深色为 `rgba(24,27,43,0.88)`，均带 10px 毛玻璃。
- **星海底色** `{colors.ink}` `#05070f` → 由 `--grad-sea` 渐变到 `{colors.brand-blue}` `#5b93d0`，构成从夜到海的垂直过渡。

### Hairline（发丝线）
- **Hairline** `{colors.hairline}` 浅色 `rgba(74,111,165,0.16)` / 深色 `rgba(164,139,247,0.20)`。
  用于：卡片边框、标题下横线、表格行列分隔、list 行分隔、输入框边框。
- **Hairline soft** `--line-soft`：更弱一档，用于表格行、list 行、悬停底。

### Text（文字）
- **Text strong** `{colors.text-strong}`：标题、加粗、激活态。
- **Text** `{colors.text}`：正文。
- **Text soft** `{colors.text-soft}`：次要说明、引用块、卡片描述。
- **Text muted** `{colors.text-muted}`：时间戳、图注、占位提示。

### Link（内链）
- **Link ink** `{colors.link-ink}` `#057dbc`（深色下 `{colors.link-ink-dark}` `#4aa8d8`）。
  只用于 `.post-content` / `.page-card` / `.page-content` 里 `p`、`li`、`blockquote` 内的普通链接。
  导航、按钮、卡片标题各有自己的令牌，**不得**改用内链色。

### Brand（品牌色，星隅自有）
- **Brand blue** `{colors.brand-blue}` `#4a6fa5`：分类、激活态、悬停描边、归档标签激活底。
- **Brand violet** `{colors.brand-violet}` `#7a5cf0`：标签芯片、焦点环、星光点缀。
- 渐变 `--grad-title` / `--grad-primary` / `--grad-hairline` 只用于标题文字、进度条与顶缘星光。

### Semantic（语义色）

只有两个，都只服务于「状态」，不参与装饰：

- **`--warn`** 浅色 `#9a6b16` / 深色 `#d6a94a`：空状态与提示（如侧栏搜索无结果）。
- **`--error`** 浅色 `#b4483f` / 深色 `#e0857c`：真正的错误态（404 数字、错误提示）。

刻意**不设** `--ok`：站点没有成功态 UI，加一个没人引用的令牌只会扩大维护面。

语义色不得挪用为类别色或代码着色：`pages/course-map.html` 的课程类别红点、`pages/contribute.html` 的代码着色都保留各自颜色，不走 `--error`。

## Typography

### Font Family

三个字族 + 一个 display 面，四个角色：

| 角色 | WIRED | 星隅落地 | 用途 |
|---|---|---|---|
| 标题衬线（display） | `WiredDisplay` | `--font-display`（Playfair Display + 中文衬线回退） | H1–H4、文章标题、404 数字 |
| 标题/正文衬线 | `WiredDisplay` / `BreveText` | `--font-serif`（Noto Serif SC / 宋体） | 正文、署名 |
| 结构无衬线 | `Apercu` | `--font-sans`（Microsoft Yahei / 系统栈） | 导航、眉标、元信息、按钮、表头 |
| 等宽 | — | `--font-mono` | 代码 |

> **双语对比说明**：Playfair Display 只自托管了 Latin 子集（`assets/fonts/playfair-display-latin-400.woff2`，19.4 KB，
> `font-display: swap` + `unicode-range`）。西文与数字因此获得 WIRED 那层高对比衬线；中文仍走系统衬线，
> 用**字号阶梯 + 字重恒 400** 建立层级。完整 Noto Serif SC 有数 MB，不自托管是体积取舍，不是遗漏。
> 新增字体必须同时放 `OFL.txt` 一类许可证到 `assets/fonts/`。

### Hierarchy

| Token | Size | Weight | Line Height | Family | Use |
|---|---|---|---|---|---|
| `display-hero` | clamp(2.4→3.6rem) | 400 | 1.16 | serif | 首页主视觉 / 404 |
| `display-lg` | clamp(1.95→2.9rem) | 400 | 1.16 | serif | 页面 H1 |
| `display-md` | clamp(1.5→2rem) | 400 | 1.22 | serif | 章节 H2 |
| `display-sm` | clamp(1.25→1.6rem) | 400 | 1.30 | serif | 小节 H3 |
| `display-xs` | 20px | 700 | 1.40 | sans | H4 |
| `body-serif-md` | 17px | 400 | 1.85 | serif | 正文 |
| `body-lg` | 19px | 400 | 1.72 | serif | 导语段 |
| `body-md` | 16px | 400 | 1.5 | sans | 导航 / 元信息 |
| `body-sm` | 14px | 400 | 1.5 | sans | 次要元信息 |
| `eyebrow` | 14px | 700 | 1.4 | sans | 眉标（大写 + 0.14em） |
| `byline` | 12.7px | 700 | 2.2 | serif | 署名 |
| `caption` | 12px | 400 | 1.35 | sans | 图注 / 小字 |

### Principles

- **display 字重恒为 400。** 不要给 H1–H3 加粗；要强调就换字号或加眉标。
- **衬线管叙事，无衬线管结构。** 不把按钮标签排成衬线，也不把正文排成无衬线。
- **层级靠字号阶梯，不靠字重与颜色。** H3 用字号区分，不该额外染成品牌蓝。

## Layout

### Spacing System

4px 基准，令牌 `--sp-xxs` … `--sp-4xl`（2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48px）。
新代码**不得**再出现裸数值（如 `padding: 35px 25px`），一律引用令牌。

### Grid & Container

| 令牌 | 值 | 用途 |
|---|---|---|
| `--width-page` | 1080px | 常规页面白框（关于 / 档案 / 投稿 / 导航…） |
| `--width-wide` | 1200px | 网格型页面（友链 / 展览），用 `.is-wide` 修饰 |
| `--width-article` | `min(1400px, 94vw)` | 文章纸面：宽屏撑开到 1400px，给长文页气势 |
| `--width-reading` | 1120px | 文章阅读栏：约 56 个中文字/行，可读性上限 |

- 页面容器一律 `.page-card`，页头一律 `.page-header-card`。**页面与布局里都不得内联容器外观与宽度。**
- **文章页采用「宽纸面 + 量度合适的阅读栏」**（WIRED 的宽容器 + 受控正文列）：
  纸面 `--width-article` 尽可能撑开，正文以及标题、元信息、上下篇、系列、
  相关阅读、评论区统一收在 `--width-reading` 的列里并居中，
  这样整页气派、正文好读，且各块左缘完全对齐。
- 中文方块字的回读成本高于西文，所以阅读栏不跟着纸面一起放大：
  纸面宽度负责「大气」，阅读栏宽度负责「好读」，两者不要混为一谈。

### Whitespace Philosophy

- 章节之间用 `--sp-3xl`(32px) 起步的垂直间距，靠发丝线而非阴影切分区块。
- 列表行内边距 `--sp-md`~`--sp-lg`，追求报刊式**高信息密度**：一屏能看到更多条目。

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | 无阴影、无边框 | 默认。绝大多数面都在这一层 |
| 1 — Hairline | 1px `{colors.hairline}` | 卡片边框、标题下横线、表格与列表分隔、输入框、首页文章行 |
| 2 — Soft | `var(--shadow-md)` | 纸面卡片落在星海之上（`.page-card`） |
| 3 — Float | `var(--shadow-lg)` + `var(--shadow-glow)` | 悬停上浮、灯箱、抽屉 |

WIRED 原文不使用任何投影，只用发丝线。星隅**刻意偏离**：纸面卡片浮在深色星海上，
需要一点柔光才能「落座」，否则会读成贴纸。但柔光只服务落座与浮起，
**分隔与层级永远优先交给发丝线**。
首页的「最新文章」列表已完全去掉卡片阴影，改为纯发丝线行，最接近 WIRED 原意。

## Shapes

**一条可陈述的规则 —— 纸面与星空的分别：**

> 凡是在「纸面」上的面：页面容器、文章容器、卡片、代码块、图片、表格、
> 横幅、上一篇/下一篇 —— **一律方角** `{rounded.editorial}`。
> 凡是浮在「星空」上的浮层：侧边栏面板、目录抽屉、灯箱、返回顶部、
> 搜索下拉、标签芯片、圆形图标按钮 —— **保留圆角与胶囊**。
> 前者是印刷物，后者是界面。

| Token | Value | Use |
|---|---|---|
| `{rounded.editorial}` | 2px | 纸面上的一切面：卡片、容器、按钮、输入框、表格、代码块、图片、横幅、列表行 |
| `{rounded.sm}` | 8px | 预留小圆角 |
| `{rounded.md}` | 14px | 预留中圆角 |
| `{rounded.lg}` | 20px | 星空浮层（侧边栏、目录抽屉、灯箱、搜索下拉） |
| `{rounded.pill}` | 999px | 标签芯片、圆形图标按钮、进度条、滚动条 |

> 相对 WIRED 的取舍：WIRED 的 `{rounded.none}` 是 0px。星隅取 2px —— 在深色星海上，
> 0px 的一像素边缘容易被读成「渲染缺角」，2px 保留直角观感又不会显脏。

## Components

### 页面容器
- **`page-card`** — 唯一的内容白框。`background: {colors.paper}`、`1px {colors.hairline}`、
  `{rounded.editorial}`、`padding: 34px 28px`、`max-width: 1080px`，顶缘一道 `--grad-hairline` 星光。
- **`page-header-card`** — 页头白框，同外观，下外边距 `--sp-3xl`。
- **`.is-wide`** — 修饰符，把版心放宽到 1200px。

### 标题
- **`heading-h1`** — `display-lg`，下方 1px 发丝线。
- **`heading-h2/h3`** — `display-md` / `display-sm`，字重 400。
- **`heading-h4`** — `display-xs`，无衬线 700。

### 文字与链接
- **`inline-link`** — 墨蓝，默认无下划线但保留一条 35% 透明度的墨蓝细底边，悬停加深。
  站外链接追加 `↗` 角标。
- **`eyebrow`** — 大写 + 0.14em 字距的无衬线小字，用于分类、章节标签。
- **`hairline-rule`** — `.rule`，1px 发丝线，上下 32px 外边距。

### 列表与表格
- **`story-row`** — 单列高密度列表行：16px 上下内边距、发丝线分隔、无卡片阴影，悬停时底边转品牌蓝并右移 8px。
- **`table`** — 报刊式密集表：`border-collapse: collapse`、方角、表头用无衬线 14px/700 加 0.04em 字距、底 `--line-soft`。

### 归档
- **`archive-tab`** — 眉标字体的方角按钮，激活态填 `{colors.brand-blue}` 白字。
- **`cat-tag-btn`** — 方角描边小标签，悬停填品牌蓝。
- **`cat-tag-title`** — 眉标样式，品牌蓝。

### 卡片网格
- **`card-grid`**（`.friend-card` / `.exhibition-card`）— 同 `page-card` 的面与边框，居中文本，
  悬停上浮 4px 且边框转品牌蓝，圆角 `{rounded.editorial}`。

### 首页（`body.layout-home`）
- **封面标题** — `.page-card > h1` 用 `display-hero`，下方一道发丝线。
- **导语** — `.community-intro` 与 `.page-header-card > p` 用 `body-lg`(19px)，颜色 `{colors.text-soft}`。
- **最新文章** — `.home-posts` 是 WIRED 的 `story-row` 目录行：无卡片、无阴影、
  发丝线分隔、悬停时底边转品牌蓝并向右移 8px。这是全站最接近 WIRED 原意的一处。
- **探索本站** — `.home-explore` 入口卡片，`{rounded.editorial}` 方角，悬停边框转品牌蓝、底色转透明。
- **诗词组件** — 首页「星海拾句」是独立的 `.starsea`（`assets/css/starsea.css`），带月亮、海面与诗句轮换；
  `.verse-banner` 只用于英文首页与页脚的 `.footer-verse`。两者共用 `--grad-verse`，
  浅色下压暗到 `#244b7d → #43398f → #5f47a8`，并保留 `color: var(--text-strong)` 兜底与
  `@supports not (background-clip: text)` 的实色退路。

## Do's and Don'ts

### Do
- 页面容器只用 `.page-card` / `.page-header-card`；**不要在页面或布局里内联容器外观与宽度**。
- 标题字重保持 400；用字号阶梯与眉标建立层级。
- 用 `--line` / `--line-soft` 的发丝线切分区块、行与表格。
- 正文内链用 `{colors.link-ink}`；导航与按钮各用各自令牌。
- 新增间距一律引用 `--sp-*` 令牌。
- 深色适配**只能**通过令牌（`--paper` / `--text-*` / `--line` / `--link-ink`）。
- 文章页版式改动走 `--width-article` / `--width-reading` 两个令牌。

### Don't
- **不要在任何页面里声明页面级 `:root`。** 这会污染全局令牌，并让手动明暗切换失效
  （这正是某次修复的问题）。
- **不要在 `_layouts/` 或页面里写死容器宽度。** `_layouts/post.html` 曾内联
  `.post-layout .post-container { max-width: 920px !important }`，靠内联样式的高优先级
  把文章卡死在 920px —— 2560px 屏上正文只占 36% 宽，整页显得局促。
  版心宽度只应来自本文件的令牌。
- 不要写 `@media (prefers-color-scheme: dark)` 的颜色覆盖来替代令牌。
  手动切换依赖 `html.force-dark` / `html.force-light`，只有令牌能同时覆盖两种路径。
- 不要给编辑层元素加投影来表达层级；先试发丝线。
- 不要把 display 字重提到 700 来表达强调。
- 不要把内链墨蓝用到按钮、导航或卡片标题上。
- 不要在编辑层用胶囊圆角（标签芯片与圆形图标按钮除外）。
- 不要让固定在左上角的唤出按钮（`.sidebar-toggle`）与它唤出的浮层重叠：
  浮层打开时它必须让位（见 `assets/css/sidebar.css`）。

## Responsive Behavior

### Breakpoints

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| Mobile | < 768px | 容器内边距降到 24/16px；H1/H2 固定 1.6rem；卡片网格 1 列；归档 tab 撑满 |
| Tablet | 768–1023px | 卡片网格 2 列 |
| Desktop | ≥ 1024px | 完整版心；标题走 clamp 上限 |

### Touch Targets
按钮垂直内边距 ≥ 12px，行高 ≥ 20px，保证约 44px 命中高度。

### Collapsing Strategy
- 页面容器：宽度撑满，仅收内边距，**不做**横向缩放。
- 卡片网格：`flex: 1 1 300px`，窄屏落到 `1 1 100%`。
- 表格：≤900px 转为自身横向滚动（`theme.css` 负责），避免撑破布局。
- 归档 tab：`flex: 1 1 auto` 均分。

### Image Behavior
正文图片最大宽度 100%，圆角 `{rounded.md}`，可点击开灯箱。

## Iteration Guide

1. 改视觉前先读本文件，确认改动属于编辑层还是氛围层。
2. 编辑层改动写进 `assets/css/editorial.css`，并在本文件同步令牌表。
3. 氛围层改动写进 `theme.css`，不要反向影响编辑层的令牌语义。
4. 页面只写「该页独有的组件」，公共容器与排版一律不下沉到页面。
5. 改完必须能被 Jekyll 构建通过，并确认浅色 / 深色 / 手动切换三条路径都正常。

## Known Gaps

### 已清理（2026-11-16）

- **`_includes/search.html` 已删除**（573 行）。站内搜索只剩一套实现：`_includes/sidebar.html` +
  `default.html` 内联脚本。不要恢复。
- **`layout.css` 的 `html.force-dark` 大块已全部令牌化**（原约 170 行硬编码，现为 `--ink-1000` /
  `--paper` / `--text-*` / `--blue` / `--link-ink` / `--line*` / `color-mix`），
  手动深色与系统深色共用同一套值。`main.css` 的 UI 颜色同步令牌化，`grep` 复查已无 `#hex` / `rgba(`。
- **未用令牌已删除**：`--ink-600/700/800/900`、`--sea`、`--radius-sm`。
  保留 `--azure` / `--blue-deep` / `--paper-veil`：`bloom.css` 的十套色板仍在引用，不是死令牌。
- **语义色已建立**：`--warn` / `--error`（三条深色路径都补齐）。404 数字改用 `--error`，
  并显式解掉 `.page-content h1` 的渐变裁剪与 `-webkit-text-fill-color: transparent`；
  侧栏搜索空结果与空状态改用 `--warn`，不再写死 `#95a5a6`。
- **字体已自托管**：Playfair Display Latin 400（19.4 KB）+ `OFL.txt`，用于西文/数字的 display 对比；
  `--font-display` 进入标题角色。
- **诗词对比度已修**：`.verse-banner` / `.footer-verse` 的 `.verse-main` 改用 `--grad-verse`
  （浅色下压暗到 `#244b7d → #43398f → #5f47a8`），加 `color: var(--text-strong)` 兜底，
  并提供 `@supports not (background-clip: text)` 的实色退路。
- **代码块配色令牌化**：`--grad-code`（浅色 `#101628 → #141a33`，深色 `#121a2e → #172039`），
  `main.css` 里重复且被 `!important` 覆盖的 `--code-bg` 声明一并删除。

### 仍然存在

- **文章页版心仍未统一**：`main.css` 的 `max-width: 1080px !important`、`layout.css` 的 `1100px`、
  `_layouts/post.html` 的内联样式三处并存，尚未收敛到 `--width-article` / `--width-reading`。
  改版心前必须三处一起看，否则会出现「改了一个没反应」。
- **页面级组件未纳入统一组件层**：`course-map`、`blog-map`、`navigate`、`network` 各自持有
  SVG / 图 / 标签页组件，本轮只做令牌对齐，没有抽象成公共组件。
- **中文衬线未自托管**：完整 Noto Serif SC 数 MB，会拖垮首屏；因此中文的 display 与 body 仍是
  同一字面，只靠字号阶梯分层。这是体积取舍，接受。
- **装饰性白色是刻意的**：`layout.css` 的 `.star` / `.meteor` 仍用 `#ffffff`，因为星星与流星本体
  就该是白色，不随主题变；不要把它们「令牌化」。
- **类别色与语法色不是错误色**：`pages/course-map.html` 的课程类别红点、`pages/contribute.html`
  的代码着色仍写死颜色，属类别 / 语法用途，未走 `--error`。
- **`_includes/header.html` 是零引用占位文件**：已确认无任何 `include`，保留未删；下次整理可直接移除。
- **本机构建口径**：`Gemfile` 锁 `github-pages ~> 231`，在 Ruby 3.4 上无法 `bundle install`；
  但本机装有 Jekyll 4.4.1 与全部站点插件，用 `JEKYLL_NO_BUNDLER_REQUIRE=true` +
  `_config_verify.yml` 已实测构建通过（exit 0、无警告）。正式部署仍由 CI 的 Ruby 3.1 承担。
- **令牌扫描**：全站 82 个自定义属性中只剩 `--sp-xxs`（2px）未被 `var()` 引用，
  它属于间距刻度表的完整性，保留。


## 2026-11-06 阅读与导航修订

- 文章外层使用 `post-page`，不再嵌套两个 `page-content`。
- 纸面上限 1160px，正文阅读栏上限 46rem；桌面正文 17px / 1.9，窄屏 16px / 1.85。
- 首页顺序为介绍、快捷入口、最新文章、探索本站、星海拾句，保留原有诗词交互。
- 侧栏关闭时 inert；打开时移入焦点并约束 Tab，关闭回到菜单按钮。搜索快捷键复用同一开关。
- 搜索具备明确标签与结果播报，输入延迟 180ms，并避免旧查询覆盖新查询。
- 章节目录关闭时 inert，新增展开状态与焦点返回。减少动态效果偏好下不再生成背景星星与流星。
- 本轮沿用已有编辑层令牌，不新增主题覆盖文件。十套色板继续保留。


## 星网调整（2026-11-14）

图区使用局部点阵与轻边界；节点布局根据实际容器尺寸归一化，限制放大上限。少量结果或高连接节点显示标题，悬停突出直接相邻关系。文章列表提供不依赖图形交互的访问路径；缩放使用画布中心坐标。ResizeObserver 在尺寸变化后重建布局。页面样式限定在 network-page，避免覆盖博客其他页面。

本轮完成脚本语法与差异检查；本机缺少 Jekyll 可执行依赖，完整构建与浏览器视觉验收未完成。


## 星网图文探索（2026-11-14）

采用左侧搜索/分类/文章索引、中间关系图、右侧文章详情。节点选择不立即跳转；详情展示构建时生成的纯文本摘要、日期及直接关联文章，并提供全文链接。局部模式显示选中文章的一跳邻居，返回全局保留搜索分类状态；聚焦操作主动清除筛选以完整显示邻居。

力布局增加按分类的环形吸引中心，保留系列与标签边。1150px 以下详情移至下一行，700px 以下上下排列。列表按钮提供键盘可达的选择入口，无脚本时链接到文章归档。完整 Jekyll 构建因本机缺少可执行依赖未完成；脚本语法、元素 ID 和差异检查通过，尚未完成浏览器视觉验收。


## 星网沉浸浏览与简洁页脚

页脚保留居中的诗词与署名，下方为版权、作者及必要联系链接的紧凑栏，取消三栏站点介绍，保留诗词。星网采用宽幅画布和紧凑索引；详情以可关闭的浮动卡片呈现，手机固定在底部。标题默认隐藏，悬停显示标题与关系；首次选中显示简介卡片，重复点击同一节点进入文章，卡片亦提供“开始阅读”。简介优先使用文章 description，回退 excerpt。检查了 60 篇文章均有 description，修复其中一个 URL 型简介。

本轮脚本语法和差异检查通过。未进行浏览器视觉验收，完整构建仍需具备 Jekyll 的环境验证。


## 页脚恢复原结构

按作者要求恢复三栏信息、两行诗词及底部构建说明。仅将桌面内边距调整为 24px / 28px，标题约 1.05em，正文约 .9rem，并缩小列间距、段距和诗词上下留白；移动端继续保留原有单列结构。此规则替代此前紧凑单行页脚方案。


## 星网移除侧栏

删除文章索引、检索框、匹配列表及重新布局/重置按钮；分类筛选位于全宽关系图下方，不重复显示分类图例。介绍改为简短的阅读引导。保留节点悬停、文章卡片、局部聚焦及返回全局；节点可通过键盘聚焦并打开简介，补偿移除文章索引后的访问路径。


## 一次性清样式债（2026-11-16）

- **搜索**：删除无人引用的 `_includes/search.html`（573 行），站内搜索只保留侧边栏一套。
- **令牌化**：`layout.css` 的 `html.force-dark` 整块（约 170 行）、`main.css` 的全部 UI 颜色、
  `theme-light.css` 的 `html.force-light` 覆盖层改为引用全局令牌；深色适配三路径
  （系统 `@media`、`html.force-dark`、`html.force-light`）取值一致。
- **令牌增删**：新增 `--font-display`、`--warn`、`--error`、`--grad-verse`、`--grad-code`、`--tag-accent`、
  `--on-brand`、`--shadow-up`；删除 `--ink-600/700/800/900`、`--sea`、`--radius-sm`。
  `--azure` / `--blue-deep` / `--paper-veil` 保留，因 `bloom.css` 仍在引用。
- **语义色**：404 数字用 `--error` 并解掉渐变文字裁剪；空状态用 `--warn`；不引入 `--ok`。
- **字体**：自托管 Playfair Display Latin 400 + `OFL.txt`，`--font-display` 接管 H1–H4 的西文部分。
- **诗词对比度**：`--grad-verse` 浅色下压暗，`color` 兜底与 `@supports` 实色退路。
- **验证**：10 个 CSS 花括号配平；`_config_verify.yml` + 本机 Jekyll 4.4.1 真实构建通过（exit 0、无警告）；
  用产物 + 无头 Chrome 核对浅色首页、深色首页、404、说明页、归档，以及手动 `force-dark` / `force-light` 两条路径；
  本机无法 `bundle install` 的 `github-pages 231` 仍由 CI 承担。
- **同步文档**：`README.md` 由修正后的 `scripts/generate_readme.py` 重新生成（目录树与 60 篇文章一致，
  并补回此前被点号过滤掉的 `.github/` 与 `.gitignore`）；
  `repo-guide.md` 按实际目录重写（补 `bloom.css` / `starsea.css` / `ai-dictionary.html` / `network.html` /
  `campus-guide.html` / `assets/fonts` / `scripts` 三个脚本，删除 `search.html` 条目）。
- **规范文本**：`DESIGN.md` front matter 的 `fontFamily` 改为合法 YAML 数组（原文是逗号分隔裸值，无法被解析）；
  令牌表补 `--warn` / `--error` / `--grad-code` / `--grad-verse` / `--tag-accent` / `--on-brand` / `--font-display`，
  删除 `--ink-600~900` 与 `--radius-sm`。

