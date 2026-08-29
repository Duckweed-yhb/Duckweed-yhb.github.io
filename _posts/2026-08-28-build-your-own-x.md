---
layout: post
title: "从零造轮子：build-your-own-x 指南"
date: 2026-08-28 00:00:00 +0800
categories: [Study, 计算机科学]
tags: [build-your-own-x, 造轮子, 学习路径, 开源]
author: Duckweed
---
# 从零造轮子：build-your-own-x 指南

## 前言

费曼说：**"What I cannot create, I do not understand."（我无法创造的，我便尚未理解。）**

这句话道出了学习计算机最朴素也最深刻的一条路：**亲手从零复刻一个东西**。你用了三年的 Git，是否想过自己写一个？你每天都在用的 shell、数据库、浏览器，它们的内部到底长什么样？

[build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) 这个仓库，正是为这条路准备的。它收录了 500 多篇高质量的分步教程，教你从零复刻各种经典技术——从操作系统到正则引擎，从区块链到文本编辑器。这篇把这套"藏宝图"整理清楚，并给出我挑选的经典教程和入门路线。

---

## 一、为什么值得"造轮子"

很多人觉得"造轮子"是浪费时间，有现成的不用，偏要自己写。但这里有个误区：

**用工具 ≠ 理解工具。**

- 用 Git 提交一百次，不如自己实现一次 `git commit` 深刻——你会真正明白暂存区、对象库、哈希指针是怎么回事；
- 调 API 调一百次，不如自己写一个 HTTP 服务器——你会真正明白 TCP 连接、请求解析、响应报文的关系；
- 用框架写一百个页面，不如自己实现一个迷你 React——你会真正明白虚拟 DOM 和协调（reconciliation）为何存在。

build-your-own-x 的妙处在于：**它把"从零实现"这件事，拆成了可以一步步跟着走的教程**。每个教程都选材精当、步骤清晰，让你在"做"的过程中完成"懂"。

---

## 二、全景：30 个分类一览

这个仓库目前收录了 30 个分类、500+ 篇教程，覆盖之广令人咂舌：

| 分类 | 内容 |
|------|------|
| 3D Renderer | 光线追踪、光栅化、软件渲染 |
| AI Model | LLM、扩散模型、RAG |
| Augmented Reality | AR 应用（Unity/OpenCV） |
| BitTorrent Client | BT 客户端、Bencode 解析 |
| Blockchain / Cryptocurrency | 区块链、加密货币、PoW |
| Bot | Discord / Telegram / Slack 机器人 |
| Command-Line Tool | CLI 工具（lolcat、cowsay…） |
| Database | SQL 数据库、Redis、KV 存储 |
| Distributed Systems | 分布式系统（Kafka 等） |
| Docker | 容器（500 行 C / 100 行 Go） |
| Emulator / Virtual Machine | CHIP-8、Game Boy、LC-3 虚拟机 |
| Front-end Framework | 迷你 React、Redux、Virtual DOM |
| Game | 俄罗斯方块、Roguelike、NES 游戏 |
| Git | 用各种语言重写 Git |
| Memory Allocator | 自己实现 malloc |
| Network Stack | TCP/IP 协议栈、VPN |
| Neural Network | 神经网络、CNN、PyTorch 复刻 |
| Operating System | 操作系统、内核、引导程序 |
| Physics Engine | 物理引擎、碰撞检测 |
| Processor | 处理器（FPGA 实现 RISC-V） |
| Programming Language | 编译器、解释器、垃圾回收器 |
| Regex Engine | 正则引擎（NFA/DFA） |
| Search Engine | 搜索引擎、TF-IDF |
| Shell | 用 C/Rust/Go 写 shell |
| Template Engine | 模板引擎（20 行 JS） |
| Text Editor | 文本编辑器（kilo、Hecto） |
| Visual Recognition | 人脸识别、车牌识别 |
| Voxel Engine | 体素引擎 |
| Web Browser | 浏览器引擎、布局引擎 |
| Web Server | HTTP 服务器、WebSocket |
| （Uncategorized） | 哈希表、DNS、负载均衡、SSO… |

---

## 三、经典教程精选

500 篇不可能都看，这里从每个大类里挑出**公认最经典、最适合入门**的几篇。

### 入门友好（建议第一批尝试）

| 方向 | 教程 | 语言 |
|------|------|------|
| 文本编辑器 | [Build Your Own Text Editor](https://viewsourcecode.org/snaptoken/kilo/)（kilo） | C |
| Shell | [Write a Shell in C](https://brennan.io/2015/01/16/write-a-shell-in-c/) | C |
| Web 服务器 | [A Simple Web Server](http://aosabook.org/en/500L/a-simple-web-server.html)（500L 系列） | Python |
| 模板引擎 | [A Template Engine](http://aosabook.org/en/500L/a-template-engine.html)（500L 系列） | Python |
| 正则引擎 | [Regular Expression Matching Can Be Simple And Fast](https://swtch.com/~rsc/regexp/regexp1.html)（Russ Cox 经典） | C |
| 神经网络 | [A Neural Network in 11 Lines of Python](https://iamtrask.github.io/2015/07/12/basic-python-network/) | Python |
| 区块链 | [Learn Blockchains by Building One](https://hackernoon.com/learn-blockchains-by-building-one-117428612f46) | Python |

> 500L（AOSA）系列是「Architecture of Open Source Applications」推出的《500 Lines or Less》项目，每篇用 500 行代码讲清楚一个系统的核心，质量极高，强烈推荐整个系列都过一遍。

### 经典硬核（有基础后再挑战）

| 方向 | 教程 | 语言 |
|------|------|------|
| 数据库 | [Let's Build a Simple Database](https://cstack.github.io/db_tutorial/)（从 B 树到 SQL） | C |
| 数据库 | [Build Your Own Redis from Scratch](https://build-your-own.org/redis) | C++ |
| 操作系统 | [os-tutorial](https://github.com/cfenollosa/os-tutorial)（逐步写内核） | C |
| 操作系统 | [Writing an OS in Rust](https://os.phil-opp.com/)（最系统的 OS 教程之一） | Rust |
| 操作系统 | [Linux from Scratch](https://linuxfromscratch.org/lfs)（从源码构建整个 Linux） | any |
| Git | [Write yourself a Git!](https://wyag.thb.lt/)（wyag） | Python |
| Git | [ugit](https://www.leshenko.net/p/ugit/)（通过造 Git 学内部原理） | Python |
| 编译器 | [Build Your Own Lisp](http://www.buildyourownlisp.com/)（1000 行 C 写 Lisp） | C |
| 编译器 | [mal - Make a Lisp](https://github.com/kanaka/mal)（几十种语言版本） | any |
| 虚拟机 | [Write your Own Virtual Machine](https://justinmeiners.github.io/lc3-vm/)（LC-3） | C |
| 模拟器 | [CHIP-8 解释器](http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/)（模拟器入门经典） | C++ |
| 容器 | [Linux containers in 500 lines of code](https://blog.lizzie.io/linux-containers-in-500-loc.html) | C |
| 容器 | [Build Your Own Container Using Less than 100 Lines of Go](https://www.infoq.com/articles/build-a-container-golang) | Go |
| 网络栈 | [Let's code a TCP/IP stack](http://www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/) | C |
| 前端框架 | [Build your own React](https://pomb.us/build-your-own-react/)（pomb.us 系列） | JavaScript |
| 3D 渲染 | [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html) | C++ |
| 3D 渲染 | [tinyrenderer](https://github.com/ssloy/tinyrenderer/wiki)（500 行软件渲染） | C++ |
| 游戏 | [Handmade Hero](https://handmadehero.org/)（从零写游戏，史诗级） | C |
| 大模型 | [LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)（从零构建 LLM） | Python |
| 浏览器 | [Let's build a browser engine](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html) | Rust |
| 计算机系统 | [From NAND to Tetris](http://nand2tetris.org/)（从与非门到俄罗斯方块） | any |

> NAND to Tetris 单独说一句：从最底层的与非门开始，一步步搭出 CPU、汇编器、编译器、操作系统，最后跑起来一个俄罗斯方块游戏。它是「费曼式学习」的终极实践，任何学计算机的人都值得走一遍。

---

## 四、给新手的学习路线

面对 500 篇教程，别贪多。我的建议是**从小到大、从近到远**：

```
第一阶段：跑通一个最小的
  文本编辑器（kilo）或 Web 服务器（500L）
  → 建立"我居然真的做出来了"的成就感

第二阶段：做日常打交道的
  Shell / 正则引擎 / 模板引擎
  → 用起来的东西，最值得拆开看

第三阶段：挑战系统级
  数据库（B 树）→ 编译器（Lisp）→ 操作系统
  → 从应用层走向系统层，理解力质变

第四阶段：按兴趣深入
  图形学 / 游戏 / 大模型 / 区块链…
  → 你热爱什么，就去造什么
```

**核心原则：每个阶段只挑一个项目做完，做完再换。** 半途而废十个，不如完整做完一个。

---

## 五、几点建议

1. **不要抄代码，要抄思路**：教程的意义在于解释"为什么这么做"。卡住了先自己想，再看答案。

2. **跟着敲，但敲完要能脱离教程**：合上教程，从零重新写一遍，才是真的学会了。

3. **遇到不懂的底层知识，停下来补**：造数据库会碰到 B 树，造编译器会碰到文法——这些正是学习的契机，补完再回来。

4. **善用配套资源**：很多教程配了视频或论坛。比如 [Build your own X](https://codecrafters.io) 还提供了配套的在线闯关平台，用真实测试驱动你一步步实现。

5. **做完发出来**：把项目推到 GitHub，写一篇复盘。教是最好的学，分享会让理解再深一层。

---

## 写在最后

计算机科学的迷人之处在于：**几乎所有"魔法"，底层都是可以亲手复刻的工程**。你离"理解"一个技术，只差一个"从零造一次"的距离。

不必担心造出来的东西简陋——费曼造的东西，也没打算用它改变世界。他只是在用这种方式，确认自己真的懂了。

> —— Duckweed
