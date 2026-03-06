---
layout: default  # 改为default布局，和其他页面保持一致
title: 关于
permalink: /about/
---

<!-- 添加统一的白框容器，和档案/展览页样式一致 -->
<div class="page-card">
  # 关于我

  你好，我是 **Duckweed**，一名就读于哈尔滨工业大学（深圳）的电气工程及其自动化专业本科生，目前的研究方向是电力系统。

  这里是我的个人空间，用于记录编程学习、考研备考和读书思考的点滴。欢迎交流！

  ---

  ## 🎓 专业背景

  - **专业方向**：电气工程及其自动化（电力系统方向）
  - **核心领域**：电力系统分析、电力系统仿真、电气控制与PLC
  - **学习目标**：深耕电力系统自动化，同时拓展编程与工程应用能力

  ---

  ## 💻 技术栈

  ### 专业能力
  - 电力系统潮流计算与故障分析
  - 电力系统继电保护原理
  - 电气控制与PLC编程应用

  ### 编程与工具
  - **MATLAB**：电力系统仿真、数值计算
  - **Java**：面向对象编程、后端开发基础
  - **前端**：HTML / CSS / JavaScript 开发
  - **Jekyll / GitHub Pages**：静态博客搭建与部署
  - **LaTeX**：专业文档排版、考研笔记整理

  ---

  ## 📚 学习与成长

  ### 考研备考
  - 数学分析、线性代数、概率论与数理统计
  - 电力系统分析、继电保护
  - 英语一、政治

  ---

  ## 📖 阅读清单

  - 《你当像鸟飞往你的山》（塔拉·韦斯特弗）
  - 《被讨厌的勇气》（岸见一郎、古贺史健）
  - 《悉达多》（赫尔曼·黑塞）

  ---

  ## 🌐 关于本网站

  ### 框架
  这个博客网络是基于 **Jekyll** 构建的，使用 **minima** 主题进行二次开发，部署于 **GitHub Pages**。

  > Jekyll 是一个简单的博客形态的静态站点生成器，适合用于构建个人博客、文档网站等静态内容站点。

  ### 字体
  本博客使用 **Sarasa Mono SC** 等开源字体，兼顾中文显示与代码阅读体验。

  > 本站内容仅限个人学习，如有任何侵权，请联系我以便删除。

  ---

  ## 📫 联系方式

  - **GitHub**：<a href="https://github.com/Duckweed-yhb" target="_blank">Duckweed-yhb</a>
  - **知乎**：<a href="https://www.zhihu.com/people/54-62-1-34-68" target="_blank">待价而沽</a>
  - **邮箱**：<a href="mailto:3071974740@qq.com">3071974740@qq.com</a>

  ---

  > 持续学习，持续分享，持续成长。

  <!-- 样式优化：整合白框样式 + 原有排版优化 -->
  <style>
    /* 核心：统一的白框容器（和档案/展览页一致） */
    .page-card {
      background: rgba(255, 255, 255, 0.88);
      padding: 35px 25px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(8px);
      max-width: 900px;
      margin: 0 auto;
      box-sizing: border-box;
      line-height: 1.8;
    }

    /* 原有排版优化 */
    h1, h2, h3 {
      color: #2c3e50;
      margin-top: 2em;
      margin-bottom: 1em;
    }
    h1 {
      font-size: 2em;
      border-bottom: 2px solid #3498db;
      padding-bottom: 0.5em;
      margin-top: 0 !important; /* 去掉h1顶部多余间距 */
    }
    h2 {
      font-size: 1.5em;
      border-left: 4px solid #3498db;
      padding-left: 0.5em;
    }
    h3 {
      font-size: 1.2em;
      color: #3498db;
    }
    blockquote {
      border-left: 4px solid #eee;
      padding-left: 1em;
      color: #7f8c8d;
      margin: 1em 0;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      padding-left: 1.5em;
    }
    hr {
      border: none;
      border-top: 1px dashed #eee;
      margin: 2em 0;
    }

    /* 移动端适配 */
    @media (max-width: 768px) {
      .page-card {
        padding: 25px 15px;
        margin: 0 10px;
      }
      h1 {
        font-size: 1.8em;
      }
      h2 {
        font-size: 1.3em;
      }
    }

    /* 暗黑模式适配 */
    @media (prefers-color-scheme: dark) {
      .page-card {
        background: rgba(30, 30, 40, 0.88);
      }
      h1, h2 {
        color: #ecf0f1;
      }
      blockquote {
        color: #bdc3c7;
        border-left-color: #34495e;
      }
      hr {
        border-top-color: #34495e;
      }
      a {
        color: #3498db;
      }
    }
  </style>
</div>