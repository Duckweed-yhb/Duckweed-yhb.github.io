---
layout: campus-guide
title: "项目：三个阶梯，一次比一次真"
permalink: /campus/hitsz-ee/beyond/project/
---

# 项目：三个阶梯，一次比一次真

课程给你知识，项目给你「这件事我真的做成过」的底气。三个项目按顺序做，每个都能独立写进简历；做不完第三个不算失败，前两个做完就已经甩开大多数人。

<div class="campus-ladder" markdown="0">
  <div class="campus-ladder__row">
    <span class="campus-ladder__no">01</span>
    <div class="campus-ladder__body">
      <div class="campus-ladder__title">面包板上的共射放大电路</div>
      <div class="campus-ladder__meta">配 02 电路与电子学 · 验收：工作点、中频增益、上限截止频率都测得准，并能解释削顶</div>
    </div>
  </div>
  <div class="campus-ladder__row campus-ladder__row--2">
    <span class="campus-ladder__no">02</span>
    <div class="campus-ladder__body">
      <div class="campus-ladder__title">MCU 上的单环闭环</div>
      <div class="campus-ladder__meta">配 03 嵌入式与单片机 · 验收：串口画出阶跃响应，且 PI 参数改动肉眼可见</div>
    </div>
  </div>
  <div class="campus-ladder__row campus-ladder__row--3">
    <span class="campus-ladder__no">03</span>
    <div class="campus-ladder__body">
      <div class="campus-ladder__title">PMSM 的 FOC 双环</div>
      <div class="campus-ladder__meta">配 04 电机与运动控制 · 验收：稳速不抖、突加负载能恢复、留下波形记录</div>
    </div>
  </div>
</div>

## 项目一 · 面包板上的共射放大电路

- **需要**：面包板、三极管、若干电阻电容、万用表、示波器、信号发生器。
- **验收标准**：测出静态工作点并解释为什么取这个值；测出中频电压增益与上限截止频率；故意把工作点调偏，拍下削顶波形并说明原因。
- **这一步的意义**：让你第一次分清「仿真里对」和「板子上对」的差别。

## 项目二 · MCU 上的单环闭环

- **需要**：一块 STM32（G4 或 F4 系列更合适）、编码器或电位器做反馈、PWM 驱动一个小直流电机、串口。
- **验收标准**：串口能把「给定—实际」画成曲线；改变 PI 参数后，超调与调节时间肉眼可见地变化；能说清采样周期为什么选这个值。
- **这一步的意义**：把自动控制理论从纸面搬到你手上，PI 不再是三个字母。

## 项目三 · PMSM 的 FOC 双环

- **需要**：三相逆变桥、电流采样、PMSM、Clarke/Park 变换、电流环 + 速度环。
- **验收标准**：空载能稳速运行不抖；突加负载后能恢复；留下电流波形与阶跃响应记录；能解释 SVPWM 与死区补偿在做什么。
- **这一步的意义**：本校电气最对口、也最容易被复试和面试追问的项目。做到这里，大三的方向选择基本不用犹豫。

## 把一个项目写成简历条目

一条项目写四句，缺一句就说服力减半：

| 句子 | 写什么 | 反例 |
|---|---|---|
| 背景 | 为什么要做，解决什么问题 | 「参与电机控制项目」 |
| 方案 | 你选了什么、放弃什么、为什么 | 「使用 STM32 实现控制」 |
| 结果 | **数字**：效率、误差、响应时间、成本 | 「效果良好」 |
| 复盘 | 失败过什么，后来怎么改 | （省略） |

例：

> 设计并实现一台 24V/2A 同步 Buck 变换器，采用峰值电流模式控制。实测满载效率 91.3%，负载阶跃恢复时间 8ms，纹波 45mV。第一版因驱动死区设置不当导致上下管直通，改用 RC 死区加比较器后解决。

这段没有夸张，但每一句都能被追问，且答得出来。

## 三个仓库规矩

1. **一项目一仓库**，README 写清：做什么、怎么跑、接线/参数、已知问题。
2. **每次调试留一份数据**：波形截图命名带日期与工况（`2026-03-14_24V2A_step10-90.png`）。
3. **失败也提交**：把不工作的版本留在分支里，半年后你会感谢自己。

## 接哪个板块

- [02 电路与电子学](https://duckweed-yhb.github.io/eediy/02-circuit-electronics/README) · [03 嵌入式与单片机](https://duckweed-yhb.github.io/eediy/03-embedded-mcu/README) · [04 电机与运动控制](https://duckweed-yhb.github.io/eediy/04-motor-control/README)
- [08 硬件工具链](https://duckweed-yhb.github.io/eediy/08-hardware-toolchain/README)：仓库、文档、测量，项目做得好不好全看这些基本功
