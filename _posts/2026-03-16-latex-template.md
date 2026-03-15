---
layout: post
title:  "LaTeX模板分享：多文件课程笔记/读书感悟/年度总结"
date:   2026-03-16 21:00:00 +0800
categories: [工具分享, LaTeX]
tags: [LaTeX, 多文件模板, 课程笔记, 排版]
author: Duckweed
permalink: /latex-template-share/
---
{% raw %}

# LaTeX模板分享：多文件课程笔记/读书感悟/年度总结
> 3 套可直接复制使用的 LaTeX 模板，支持中文、公式、表格、多文件结构化管理

## 一、模板说明
分享多场景 LaTeX 模板，其中课程笔记为**多文件结构化模板**（主文件+封面+分章节），代码可直接复制使用：
- 课程笔记：多文件拆分（主文件+封面+章节），适配公式/代码/列表排版
- 读书感悟：简洁单文件，侧重文字+引用格式
- 年度总结：分模块布局，适配数据/总结/计划

所有模板均使用 **XeLaTeX 编译**，完美支持中文。

---

## 二、核心模板示例

### 1. 多文件课程笔记模板（重点）
#### 1.1 主文件：1.main.tex
```latex
\documentclass[oneside, UTF8]{ctexbook}
\usepackage{amsmath,amssymb,amsfonts,geometry}
\usepackage{graphicx,enumitem,booktabs}
\geometry{a4paper, margin=2.5cm}

\usepackage{tocbibind}
\setcounter{tocdepth}{3}
\setcounter{secnumdepth}{3}

\usepackage{titlesec}
\titleformat{\chapter}{\bfseries\Large}{\thechapter}{1em}{}
\titleformat{\section}{\bfseries\large}{\thesection}{1em}{}
\titleformat{\subsection}{\normalsize}{\thesubsection}{1em}{}

\title{课程笔记总标题}
\author{}
\date{}

\begin{document}

\input{2.cover.tex}

\newpage
\thispagestyle{empty}
\renewcommand{\contentsname}{\bfseries 目\quad 录}
\tableofcontents
\clearpage
\setcounter{page}{1}

\input{3.复数与复变函数.tex}
\input{3.解析函数.tex}

\end{document}
```

#### 1.2 封面文件：2.cover.tex
```latex
\newcommand{\makeCover}
{
  \begin{titlepage}
    \newgeometry{left=2cm, right=2cm, top=2cm, bottom=2cm}
    
    \centering
    \vspace*{1cm}
    
    {\Large \itshape 他以近乎神性的心智，\\以数学为炬，\\照亮行星运转、彗星行迹与海洋潮汐。\\ 艾萨克·牛顿的墓志铭}\\[0.5cm]
    \rule{\textwidth}{1pt}\\[0.5cm]
    
    {\Huge \bfseries 大学物理}\\[8pt]
    {\Huge \bfseries 核心公式与考点汇总}\\[12pt]
    {\Large \itshape —— 简洁版复习讲义 ——}\\[1cm]
    
    \rule{0.6\textwidth}{0.5pt}\\[1cm]
    
    {\Large \textbf{内容概要：} 热学 | 光学 | 量子物理}\\[8pt]
    {\Large \textbf{适用场景：} 课程复习 · 公式速查}\\[1.5cm]
    
    {\Large \textbf{整理者：}浮萍}\\[6pt]
    {\large \textbf{联系邮箱：}\href{mailto:3071974740@qq.com}{3071974740@qq.com}}\\[6pt]
    {\large \textbf{GitHub：}\url{https://github.com/Duckweed-yhb}}\\[6pt]
    {\Large 整理日期：\today}\\[1cm]
    
    \rule{0.6\textwidth}{0.5pt}\\[1cm]
    
    {\large \textbf{版本：} v1.0 简洁版}\\[6pt]
    {\small \itshape Copyright © \the\year\ 浮萍 · 禁止商用 · 欢迎交流}\\[0.5cm]
    
    \rule{\textwidth}{1pt}
    \vfill
    
    \restoregeometry
  \end{titlepage}
}

\makeCover
```

#### 1.3 章节文件示例：3.复数与复变函数.tex
```latex
\chapter{复数与复变函数}

\section{复数的基本运算}
\subsection{欧拉公式}
欧拉公式核心表达式：
$$ e^{i\theta} = \cos\theta + i\sin\theta $$

\subsection{柯西积分公式}
核心结论：
$$ \oint_C \frac{f(z)}{z - z_0} dz = 2\pi i \cdot f(z_0) $$
```

---

### 2. 读书感悟模板（单文件）
```latex
\documentclass[UTF8]{ctexart}
\usepackage{geometry}
\geometry{a4paper, margin=2.5cm}
\begin{document}
\title{《书名》读书感悟}
\section{核心收获}
- 要点1：xxx
- 要点2：xxx

\section{个人思考}
引用格式：\textit{原文内容} —— 作者
\end{document}
```

---

### 3. 年度总结模板（单文件）
```latex
\documentclass[UTF8]{ctexart}
\usepackage{geometry,booktabs}
\geometry{a4paper, margin=2.5cm}
\begin{document}
\title{202X年度总结}
\section{年度完成}
\begin{tabular}{@{}ll@{}}
\toprule
类别 & 完成情况 \\
\midrule
学习 & xxx \\
工作 & xxx \\
\bottomrule
\end{tabular}

\section{下年计划}
- 计划1：xxx
- 计划2：xxx
\end{document}
```

---

## 三、使用说明
1. 课程笔记模板：将 `1.main.tex` / `2.cover.tex` / `3.章节名.tex` 放在同一目录，编译主文件即可生成完整笔记；
2. 章节命名规则：按 `3.章节的名字.tex` 格式，在主文件中用 `\input{}` 引入；
3. 适配编译器：推荐 **XeLaTeX** 编译，支持中文无乱码。

---

## 四、反馈与交流
若需定制模板/有使用疑问，可通过邮箱反馈：  
📧 3071974740@qq.com

{% endraw %}
```

