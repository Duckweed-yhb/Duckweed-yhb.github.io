---
layout: campus-guide
title: "课内：十二个学期，一条主线"
permalink: /campus/hitsz-ee/curriculum/
---

# 课内：十二个学期，一条主线

这一页是十二个学期页的底稿。三件事：**学分怎么摊**、**校内课怎么接自学路线**、**四年主线的节奏**。

课程的学期归属按学年给出；同一学年内的秋/春切分、以及是否开设，以教务系统执行计划为准——2025 级执行方案的 PDF 附件有验证码，我没能逐条核对。

## 四年主线一句话

**大一把数学和代码练到手熟 → 大二把电路从公式变成可测量的量 → 大三把一门课做成项目 → 大四把四年收成一个能讲的故事。**

每一年的断裂点都很明确：大二上是第一次接线，大三上是第一次面对「系统」，大三春是第一次做完整作品，大四秋是第一次被陌生人追问二十分钟。

## 校内课程怎么接自学路线

同一门课，校内有老师盯、有考试压，公开课讲得更透但没有 deadline。**校内课打底，公开课补漏**，别反过来——先跟校内进度把概念过一遍，卡壳了再去公开课找同一小节对照。

| 校内课程 | 对应板块 | 建议用来补的公开课 | 补什么 |
|---|---|---|---|
| 高等数学 / 线性代数 / 概率统计 | [01](https://duckweed-yhb.github.io/eediy/01-math-programming/README) | MIT 18.01SC、MIT 18.06（Strang） | 线代重点抓特征值与 SVD，后面 Park 变换要用 |
| 大学物理（电磁学） | [01](https://duckweed-yhb.github.io/eediy/01-math-programming/README) | 国防科大《大学物理-电磁学》 | 矢量分析与麦克斯韦方程的物理图像 |
| 高级语言程序设计 | [01](https://duckweed-yhb.github.io/eediy/01-math-programming/README) | CS50x | 不只是语法，练「读报错、查文档」的习惯 |
| 电路（含电路实验） | [02](https://duckweed-yhb.github.io/eediy/02-circuit-electronics/README) | 西安交大《电路原理》 | 节点法、叠加、暂态三块必须手算熟 |
| 模拟 / 数字电子技术（含实验） | [02](https://duckweed-yhb.github.io/eediy/02-circuit-electronics/README) | 哈工大模电、数电（本部同源） | 本校教材体系与公开课基本一致，对照最省力 |
| 电磁场 | [02](https://duckweed-yhb.github.io/eediy/02-circuit-electronics/README) | 同板块电磁学部分 | 先把静场算例做熟，再进时变场 |
| 信号与系统 | [06](https://duckweed-yhb.github.io/eediy/06-signal-communication/README) | MIT RES.6.007 | 频域直觉；后面控制与滤波全靠它 |
| 自动控制理论 | [04](https://duckweed-yhb.github.io/eediy/04-motor-control/README) | 西工大《自动控制原理》（胡寿松体系） | 根轨迹与 Bode 校正，直接对应电流环 PI 整定 |
| 电机学 | [04](https://duckweed-yhb.github.io/eediy/04-motor-control/README) | 同板块电机原理部分 | 把 dq 模型的物理来源讲通，别只背公式 |
| 电力电子技术 | [04](https://duckweed-yhb.github.io/eediy/04-motor-control/README) | 同板块电力电子部分 | 拓扑、开关过程、死区与纹波 |
| 电力系统基础 | [05](https://duckweed-yhb.github.io/eediy/05-power-system/README) | 同板块潮流计算部分 | 手算一次 3 节点潮流，比看十张图有用 |
| DSP 的原理与应用 | [03](https://duckweed-yhb.github.io/eediy/03-embedded-mcu/README) · [06](https://duckweed-yhb.github.io/eediy/06-signal-communication/README) | 同板块 MCU 与定点运算部分 | 会配置外设，也要会算定点溢出 |
| 工程训练 / 电子工艺实习 | [08](https://duckweed-yhb.github.io/eediy/08-hardware-toolchain/README) | 同板块 PCB、测量、焊接部分 | 焊接、EDA、示波器三件套，早会早省时间 |
| 毕业设计 | 全板块 | — | 按题目反查板块，别按顺序补课 |

## 十二个学期

| 学年 | 秋季 | 春季 | 夏季 |
|---|---|---|---|
| 大一 | [换挡期](/campus/hitsz-ee/curriculum/y1-autumn/) | [数学与物理入场](/campus/hitsz-ee/curriculum/y1-spring/) | [第一个自由窗口](/campus/hitsz-ee/curriculum/y1-summer/) |
| 大二 | [电路年上半](/campus/hitsz-ee/curriculum/y2-autumn/) | [电路年下半](/campus/hitsz-ee/curriculum/y2-spring/) | [竞赛启动窗口](/campus/hitsz-ee/curriculum/y2-summer/) |
| 大三 | [分水岭上半](/campus/hitsz-ee/curriculum/y3-autumn/) | [电力电子与课设](/campus/hitsz-ee/curriculum/y3-spring/) | [升学就业决策](/campus/hitsz-ee/curriculum/y3-summer/) |
| 大四 | [收口与秋招](/campus/hitsz-ee/curriculum/y4-autumn/) | [毕设](/campus/hitsz-ee/curriculum/y4-spring/) | [毕业与交接](/campus/hitsz-ee/curriculum/y4-summer/) |

## 每页的固定结构

每学期一页只写六件事，避免变成课程简介的复述：

1. **定位**——这学期在整个四年的坐标。
2. **这学期的课**——学年集合，标参考口径。
3. **主线**——只能做成一件事的那件事。
4. **验收**——可测的过关标准，不是「理解掌握」。
5. **接哪个板块**——课内与自学的接口。
6. **坑与自检**——三条坑、三条自查。

时间不够时，只看「主线」和「验收」两栏就够。

## 先读哪个

- 刚入学：从 [大一秋](/campus/hitsz-ee/curriculum/y1-autumn/) 开始，按顺序往下。
- 已经大二大三：直接跳到当前学期，补前面只看「验收」一栏。
- 已经大三下：先看 [大三夏](/campus/hitsz-ee/curriculum/y3-summer/) 和 [课外三条线](/campus/hitsz-ee/beyond/)，那才是当下的关键路径。
