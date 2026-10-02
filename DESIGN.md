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
  ink-raised: "#121729"   # --ink-800 抬升的深海面
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

typography:
  display-hero:
    fontFamily: "Noto Serif SC", Songti SC, SimSun, serif
    fontSize: clamp(2.4rem, 1.5rem + 3.4vw, 3.6rem)
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: 0.01em
  display-lg:
    fontFamily: "Noto Serif SC", Songti SC, SimSun, serif
    fontSize: clamp(1.95rem, 1.35rem + 2.2vw, 2.9rem)
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: 0.01em
  display-md:
    fontFamily: "Noto Serif SC", Songti SC, SimSun, serif
    fontSize: clamp(1.5rem, 1.25rem + 1.1vw, 2rem)
    fontWeight: 400
    lineHeight: 1.22
  display-sm:
    fontFamily: "Noto Serif SC", Songti SC, SimSun, serif
    fontSize: clamp(1.25rem, 1.12rem + 0.6vw, 1.6rem)
    fontWeight: 400
    lineHeight: 1.30
  display-xs:
    fontFamily: "Microsoft Yahei", -apple-system, Segoe UI, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.40
    letterSpacing: -0.01em
  body-serif-md:
    fontFamily: "Noto Serif SC", Songti SC, SimSun, serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: 0.01em
  body-md:
    fontFamily: "Microsoft Yahei", -apple-system, Segoe UI, sans-serif
    fontSize: 16px
    fontWeight: 400
  body-sm:
    fontFamily: "Microsoft Yahei", -apple-system, Segoe UI, sans-serif
    fontSize: 14px
  eyebrow:
    fontFamily: "Microsoft Yahei", -apple-system, Segoe UI, sans-serif
    fontSize: 14px
    fontWeight: 700
    letterSpacing: 0.14em
    textTransform: uppercase
  byline:
    fontFamily: "Noto Serif SC", serif
    fontSize: 12.7px
    fontWeight: 700
    lineHeight: 2.2
  caption:
    fontFamily: "Microsoft Yahei", -apple-system, Segoe UI, sans-serif
    fontSize: 12px

rounded:
  editorial: 2px      # --radius-editorial 编辑层方角
  sm: 8px             # --radius-sm
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
    activeTextColor: "#ffffff"
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
站点目前没有独立的错误 / 成功 / 警告调色板。表单与状态提示复用「墨色 + 灰阶」层级，
这一点与 WIRED 一致（WIRED 的营销面同样没有语义色）。

## Typography

### Font Family

三个字族，三个角色（与原规范一一对应）：

| 角色 | WIRED | 星隅落地 | 用途 |
|---|---|---|---|
| 标题衬线 | `WiredDisplay` | `--font-serif`（Noto Serif SC / 宋体） | H1–H3、文章标题、卡片大标题 |
| 正文衬线 | `BreveText` | `--font-serif` | 正文、署名 |
| 结构无衬线 | `Apercu` | `--font-sans`（Microsoft Yahei / 系统栈） | 导航、眉标、元信息、按钮、表头 |
| 等宽 | — | `--font-mono` | 代码 |

> **中文本地化说明**：WIRED 用两个不同衬线区分 display 与 body。中文环境下 Noto Serif SC
> 同时承担两者会丢失那层对比，因此改用**字号阶梯 + 字重恒 400**来建立层级，而不是换字族。

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
| 文章页 | 由 `_layouts/post.html` + `main.css` 决定 | 长文阅读 |

- 页面容器一律 `.page-card`，页头一律 `.page-header-card`。**页面内不得再内联容器外观样式。**
- WIRED 用 ~1400px 的宽容器 + 大量留白；星隅收窄到 1080/1200px，因为中文方块字在长行上回读成本更高。

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
- **诗词横幅** `.verse-banner` — 星隅自有签名，保留楷体与 ✦ 角饰，只统一圆角到编辑层。

## Do's and Don'ts

### Do
- 页面容器只用 `.page-card` / `.page-header-card`；**不要在页面里内联容器外观**。
- 标题字重保持 400；用字号阶梯与眉标建立层级。
- 用 `--line` / `--line-soft` 的发丝线切分区块、行与表格。
- 正文内链用 `{colors.link-ink}`；导航与按钮各用各自令牌。
- 新增间距一律引用 `--sp-*` 令牌。
- 深色适配**只能**通过令牌（`--paper` / `--text-*` / `--line` / `--link-ink`）。

### Don't
- **不要在任何页面里声明页面级 `:root`。** 这会污染全局令牌，并让手动明暗切换失效
  （这正是本次修复的问题）。
- 不要写 `@media (prefers-color-scheme: dark)` 的颜色覆盖来替代令牌。
  手动切换依赖 `html.force-dark` / `html.force-light`，只有令牌能同时覆盖两种路径。
- 不要给编辑层元素加投影来表达层级；先试发丝线。
- 不要把 display 字重提到 700 来表达强调。
- 不要把内链墨蓝用到按钮、导航或卡片标题上。
- 不要在编辑层用胶囊圆角（标签芯片与圆形图标按钮除外）。

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

- **字体未自托管**：WIRED 依赖专有字面（WiredDisplay / BreveText / Apercu），星隅用系统字体栈兜底，
  因此 display 的高对比笔画特征无法完全复刻；中文环境下 Noto Serif SC 同时承担 display 与 body
  两个角色，缺少西文那层「两个衬线」的对比。
- **`_layouts/post.html` 的文章版心**仍由 `main.css` 与布局控制，尚未纳入本文档的令牌体系。
- **`_includes/search.html` 已无任何页面引用**（站内搜索实际由 `_includes/sidebar.html` +
  `default.html` 内的脚本实现）。本次只修掉了它的深色模式缺陷，未做删除；
  建议后续择机移除，避免两套搜索实现并存。
- **`pages/course-map.html`、`pages/blog-map.html`、`pages/navigate.html` 等页面**
  仍有各自的 SVG / 地图 / 标签页组件，本次只做了令牌对齐，未纳入统一组件层。
- **`theme.css` 中有一批定义但从未引用的令牌**（`--ink-600/700/800/900`、`--azure`、
  `--blue-deep`、`--sea`、`--paper-veil`、`--radius-sm`），属于历史遗留，可在后续清理。
- **早期样式层里仍有一批写死的颜色**，它们只按 `@media (prefers-color-scheme: dark)` 分支，
  没有走令牌，因此会与令牌打架。本次已实测并修掉的典型一例：`layout.css` 里
  `html.force-dark .post-link, .page-card a, .page-content a { color: #7fb3d5 !important }`
  会把 `--link-ink` 在深色下整个盖掉（正文内链永远是 `--blue` 而不是墨蓝）。
  `layout.css` 的 `@media (prefers-color-scheme: dark)` 块与 `theme-light.css` 的
  对应覆盖层已完成令牌化，但 **`layout.css` 的 `html.force-dark` 大块（约 170 行）
  与 `main.css` 的若干硬编码色仍然是历史债**，建议后续逐块替换为令牌。
- **语义色缺失**：站点没有错误 / 成功 / 警告色板，表单校验只能靠墨色与灰阶
  （`_includes/search.html` 的 `.search-error` 仍在用一次性红色 `#e74c3c`）。
- **首页诗词横幅 `.verse-banner` 的对比度偏低**：`.verse-main` 走 `--grad-title` 渐变文字，
  叠在同色系淡紫底上，浅色模式下实测偏淡。属既有观感问题，本次未改动其配色，
  如需提升可读性建议单独调整渐变或底色的明度差。
