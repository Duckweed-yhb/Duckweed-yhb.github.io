---
layout: post
title: "VSCode + GitHub 下的 LaTeX 多源文档协作"
date: 2026-08-27 00:00:00 +0800
categories: [Tools, LaTeX]
tags: [LaTeX, VSCode, GitHub, 协作, 多文件]
author: Duckweed
---
# VSCode + GitHub 下的 LaTeX 多源文档协作

## 前言

一个人写 LaTeX，单文件就够用。但论文、课程大作业、社团手册这类多人协作的文档，一上来就是几千行——一个 `.tex` 文件堆到底，光是滚动查找章节就让人崩溃。

更好的做法是**主文件 + 多个子文件**：一个文件管结构，每个章节独立成文件，谁负责哪一章就只改哪一章，互不干扰。再配合 GitHub，多人协作、版本回溯都顺理成章。

这篇整理一套「VSCode + LaTeX + GitHub」的多源文档协作方案，把环境、结构、编译、协作一次讲清。

---

## 一、为什么要拆成多文件

先看一个不拆文件的痛点：

```
整篇文档 3000 行
├── 找"实验方法"这一节 → 滚动半天
├── 两个人同时改 → 合并冲突频繁
└── 编译一次 → 全文重排，改一章全文档变
```

拆成多文件之后：

```
main.tex        ← 主文件：文档类、宏包、结构骨架
chapters/
├── 01-引言.tex
├── 02-实验方法.tex
├── 03-实验结果.tex
└── 04-结论.tex
```

好处是实打实的：

| 优势 | 说明 |
|------|------|
| 结构清晰 | 一个章节一个文件，定位、修改都快 |
| 冲突更少 | 不同人改不同文件，Git 合并几乎不打架 |
| 编译可控 | 用 `\includeonly` 只编译正在改的章节，秒出 PDF |
| 便于分工 | 按章节认领任务，责任边界清楚 |

---

## 二、主文件 + 子文件的结构设计

### 项目目录结构

```
project/
├── main.tex            # 主文件（唯一被编译的文件）
├── chapters/
│   ├── 01-引言.tex
│   ├── 02-实验方法.tex
│   └── 03-实验结果.tex
├── figures/            # 图片统一放这里
│   └── flow-chart.png
├── refs.bib            # 参考文献（如果有 BibTeX）
├── .gitignore          # 忽略编译产物
└── README.md           # 协作说明
```

### 主文件写法

主文件只做三件事：声明文档类、加载宏包、按顺序引入子文件。

```latex
\documentclass[UTF8]{ctexart}

\usepackage{amsmath}
\usepackage{graphicx}
\usepackage{geometry}
\geometry{a4paper, margin=1in}

\title{多源文档协作示例}
\author{Duckweed \and 合作者}
\date{\today}

\begin{document}
\maketitle
\tableofcontents
\newpage

% 按顺序引入各章节
\include{chapters/01-引言}
\include{chapters/02-实验方法}
\include{chapters/03-实验结果}

\end{document}
```

### 子文件写法

子文件**不带** `\documentclass` 和 `\begin{document}`，直接从 `\section` 开始：

```latex
% chapters/01-引言.tex
\section{引言}

这里是第一章的内容，可以正常使用
宏包提供的命令，比如行内公式 $E = mc^2$。
```

> 关键认知：子文件不是"独立文档"，而是主文件的一部分。编译永远针对主文件，子文件只是被"拼"进来。

---

## 三、\input 与 \include 怎么选

LaTeX 提供两种引入子文件的命令，区别很重要：

| 命令 | 行为 | 适用场景 |
|------|------|---------|
| `\input{file}` | 直接嵌入内容，不换页 | 附录、表格、小幅片段 |
| `\include{file}` | 嵌入内容并**强制换页** | 章节（配合 `\includeonly` 使用） |

章节用 `\include` 更合适，因为它支持 `\includeonly` 单独编译：

```latex
% 只编译第 2 章，其他章节跳过
% （放在导言区）
\includeonly{chapters/02-实验方法}
```

配合 VSCode 的快捷编译，只改哪章就编译哪章，调试时体验极好。

> 注意：`\include` 的子文件名**不能带 `.tex` 后缀**，路径用 `/` 分隔。

---

## 四、VSCode 环境配置

### 1. 安装三件套

| 工具 | 用途 |
|------|------|
| TeX Live / MiKTeX | 编译引擎（推荐 TeX Live） |
| VSCode | 编辑器 |
| LaTeX Workshop 扩展 | 编译、预览、快捷键 |

### 2. 告诉编辑器"谁是主文件"

多文件项目里，VSCode 需要知道从哪个文件开始编译。在**每个子文件第一行**加魔法注释：

```latex
% !TeX root = ../main.tex
```

这样无论你当前打开哪个子文件，按编译快捷键都会去编译主文件。

### 3. 配置 recipes（可选）

如果默认的编译方式不合用，可以在 VSCode 设置里自定义：

```json
"latex-workshop.latex.recipes": [
  {
    "name": "xelatex x2",
    "tools": ["xelatex", "xelatex"]
  }
]
```

中文文档建议用 **XeLaTeX**，编译两次可以解决目录、交叉引用未更新的问题。

---

## 五、用 Git 管理协作

### 1. 先写 .gitignore

LaTeX 编译会生成一大堆临时文件，**绝不能让它们进仓库**：

```gitignore
# 编译产物
*.aux
*.log
*.out
*.toc
*.synctex.gz
*.fls
*.fdb_latexmk
*.blg
*.bbl
*.nav
*.snm
*.vrb

# 构建目录
build/
```

只提交 `.tex` 源文件、图片、`.bib` 和 PDF（如果你愿意保留成品）。

### 2. 按文件分工，冲突就少

多文件结构最大的红利在 Git 上：两个人改不同章节 = 改不同文件，Git 合并时互不干扰。只有当**同一个人同时改同一个文件**时才会冲突，而这种情况在一个章节一个文件的结构下已经很少了。

### 3. 基本协作流程

```
1. git clone 仓库（或 fork + PR）
2. git checkout -b feat/chap02     # 开新分支，认领章节
3. 只改自己负责的 chapters/02-*.tex
4. 本地编译确认无报错、PDF 正常
5. git add + commit（提交信息写清楚改了哪章）
6. git push，发起 Pull Request
7. 合并前检查冲突，解决后合入 main
```

### 4. 冲突了怎么办

万一真的冲突（比如两个人同时改了主文件的宏包），Git 会在文件里标出：

```latex
<<<<<<< HEAD
\usepackage{amsmath}
=======
\usepackage{mathtools}
>>>>>>> feat/chap02
```

手动保留想要的那一行，删掉 `<<<<<<<`、`=======`、`>>>>>>>` 标记，重新编译验证即可。冲突不可怕，**编译一遍 PDF** 就是最好的检查。

---

## 六、几条实战建议

1. **主文件只做骨架**：宏包、标题、章节引用都放主文件，子文件专注内容，别在子文件里 `\usepackage`。

2. **图片统一放 `figures/`**：路径写 `figures/xx.png` 要相对主文件而言——因为编译发生在主文件所在目录。

3. **章节文件加编号前缀**：`01-引言.tex`、`02-实验方法.tex`，既保证顺序，也方便人识别。

4. **用 `\includeonly` 快速调试**：大文档全量编译可能几十秒，调某章时只编译它，效率翻倍。

5. **提交信息写清楚**：`docs: 完成第二章实验方法初稿` 比 `update` 有用一百倍。想写好提交信息，可以看看我之前的 [《如何写好提交信息》](https://duckweed-yhb.github.io/tools/git/2026/08/14/如何写好提交信息.html)。

6. **命名别用中文文件名**：`.tex` 文件名和图片名尽量用英文/拼音，规避编码和跨平台问题。

---

## 写在最后

多源文档协作这件事，核心就一句话：**把"一篇大文档"拆成"一个骨架 + 若干章节文件"，然后让 Git 去管协作**。

单打独斗时，它是让长文档变清爽的整理术；团队协作时，它是让并行分工变可能的底层结构。学会了这套，不管是课程大作业还是社团手册，都能写得从容。

> —— Duckweed
