---
layout: page
title: 展览
permalink: /exhibition/
---

# 展览
是个人项目、技能与阅读清单的聚合展示。

<!-- 统一样式 + 全站视觉统一 -->
<style>
  .exhibition-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin: 40px 0;
    justify-content: center;
  }

  .exhibition-card {
    flex: 1;
    min-width: 300px;
    max-width: 450px;
    background: rgba(255, 255, 255, 0.88);
    padding: 35px 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .exhibition-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  .card-icon {
    font-size: 45px;
    margin-bottom: 20px;
    color: #3498db;
    transition: all 0.3s ease;
  }

  .exhibition-card:hover .card-icon {
    transform: scale(1.1);
  }

  .card-title {
    font-size: 1.5em;
    color: #2c3e50;
    margin: 0 0 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card-desc {
    color: #7f8c8d;
    margin-bottom: 25px;
    font-size: 1em;
    line-height: 1.6;
  }

  .card-divider {
    width: 80px;
    height: 2px;
    background: #3498db;
    margin: 25px auto;
    border: none;
  }

  .sub-category {
    text-align: left;
    font-size: 1.15em;
    color: #34495e;
    margin: 25px 0 12px;
    padding-left: 10px;
    border-left: 3px solid #3498db;
  }

  .card-list {
    list-style: none;
    padding: 0;
    line-height: 1.8;
  }

  .card-list li {
    padding-left: 8px;
    transition: all 0.2s ease;
  }

  .card-list li:hover {
    color: #3498db;
    padding-left: 12px;
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .exhibition-container {
      gap: 20px;
    }
    .exhibition-card {
      min-width: 90%;
      padding: 25px 20px;
    }
  }
</style>

<div class="exhibition-container">
  <!-- 项目卡片（核心更新：按真实开发状态） -->
  <div class="exhibition-card">
    <div class="card-icon">📂</div>
    <h3 class="card-title" onclick="toggleCard('project')">项目</h3>
    <p class="card-desc">我的开发项目（按开发状态分类）</p>
    <hr class="card-divider">
    <div id="project" class="card-content">
      <div class="sub-category">正在开发</div>
      <ul class="card-list">
        <li>HIT-CampusAI（校园AI生活助手）</li>
        <li>Duckweed-yhb.github.io（个人博客）</li>
      </ul>

      <div class="sub-category">停止开发</div>
      <ul class="card-list">
        <li>Smart-Energy-Monitoring-Automatic-Control-System</li>
      </ul>

      <div class="sub-category">待开发</div>
      <ul class="card-list">
        <li>电力系统故障分析小程序</li>
        <li>Python 自动化办公脚本集</li>
        <li>电力系统智能优化调度平台</li>
        <li>银行金融科技管理系统</li>
        <li>Python 技术学习仓库</li>
      </ul>
    </div>
  </div>

  <!-- 技能卡片（按你的要求最终版） -->
  <div class="exhibition-card">
    <div class="card-icon">⚡</div>
    <h3 class="card-title" onclick="toggleCard('skill')">技能</h3>
    <p class="card-desc">我的技术栈（含入门级嵌入式）</p>
    <hr class="card-divider">
    <div id="skill" class="card-content">
      <div class="sub-category">核心技术栈</div>
      <ul class="card-list">
        <li>Python（数据分析/自动化）</li>
        <li>Java（面向对象/后端基础）</li>
        <li>前端（HTML/CSS/JavaScript）</li>
      </ul>

      <div class="sub-category">入门级别</div>
      <ul class="card-list">
        <li>嵌入式软件（底层开发基础）</li>
        <li>嵌入式硬件（电路+外设入门）</li>
      </ul>

      <div class="sub-category">工具链</div>
      <ul class="card-list">
        <li>MATLAB（电力系统仿真）</li>
        <li>Jekyll / GitHub Pages</li>
        <li>LaTeX（专业文档排版）</li>
      </ul>
    </div>
  </div>

  <!-- 书籍卡片（按截图清单精准整理） -->
  <div class="exhibition-card">
    <div class="card-icon">📚</div>
    <h3 class="card-title" onclick="toggleCard('book')">书籍</h3>
    <p class="card-desc">我的阅读清单（按阅读状态分类）</p>
    <hr class="card-divider">
    <div id="book" class="card-content">
      <div class="sub-category">已读</div>
      <ul class="card-list">
        <li>《巴黎圣母院》（维克多·雨果）</li>
        <li>《白鸟与蝙蝠》《恶意》《放学后》《谁杀了她》《圣女的救济》（东野圭吾）</li>
        <li>《被讨厌的勇气》（岸见一郎、古贺史健）</li>
        <li>《传习录》（王阳明）</li>
        <li>《飞鸟集》（泰戈尔）</li>
        <li>《伽利略的苦恼》《假面饭店》《假面前夜》《假面山庄》《解忧杂货店》《虚无的十字架》（东野圭吾）</li>
        <li>《海子的诗》（海子）</li>
        <li>《花开半季 情暖三生》《一卷大唐的风华》（白落梅）</li>
        <li>《你当像李白长风破浪》（随园散人）</li>
        <li>《你当像鸟飞往你的山》（塔拉·韦斯特弗）</li>
        <li>《你的孤独 虽败犹荣》（刘同）</li>
        <li>《人间词话》（王国维）</li>
        <li>《人生如逆旅，幸好还有苏轼》（倾蓝紫）</li>
        <li>《少年时鲜衣怒马》（佚名/编者）</li>
        <li>《文化苦旅》（余秋雨）</li>
        <li>《我们生活在巨大的差距里》（余华）</li>
        <li>《嫌疑人x的献身》（东野圭吾）</li>
        <li>《月亮与六便士》（毛姆）</li>
        <li>《资治通鉴》（司马光）</li>
        <li>《自卑与救赎》（斯蒂芬·金）</li>
        <li>《纵马踏花向自由》（佚名/编者）</li>
        <li>《悉达多》（赫尔曼·黑塞）</li>
        <li>《毛泽东选集》（毛泽东）</li>
        <li>《刘少奇纪事》（佚名/编者）</li>
      </ul>

      <div class="sub-category">在读</div>
      <ul class="card-list">
        <li>《刻意练习》（安德斯·艾利克森）</li>
      </ul>

      <div class="sub-category">搁置</div>
      <ul class="card-list">
        <li>《沉思录》（马可·奥勒留）</li>
        <li>《理想国》（柏拉图）</li>
        <li>《杀死一只知更鸟》（哈珀·李）</li>
        <li>《资本论》（卡尔·马克思）</li>
        <li>《自卑与超越》（阿尔弗雷德·阿德勒）</li>
      </ul>

      <div class="sub-category">想看</div>
      <ul class="card-list">
        <li>《经济学原理》（N. 格里高利·曼昆）</li>
        <li>《局外人》（阿尔贝·加缪）</li>
        <li>《毛泽东选集》（毛泽东）</li>
        <li>《认知觉醒》（周岭）</li>
        <li>《学习之道》（芭芭拉·奥克利）</li>
        <li>《原则》（瑞·达利欧）</li>
        <li>《蛤蟆先生去看心理医生》</li>
        <li>《人类简史》（尤瓦尔·赫拉利）</li>
        <li>《以诗之名》（席慕蓉）</li>
      </ul>
    </div>
  </div>
</div>

<!-- 核心交互脚本 -->
<script>
function toggleCard(cardId) {
  event && event.stopPropagation();
  const content = document.getElementById(cardId);
  const title = content.closest('.exhibition-card').querySelector('.card-title');
  
  content.classList.toggle('active');
  title.classList.toggle('active');
  
  if (content.classList.contains('active')) {
    setTimeout(() => content.scrollIntoView({ behavior: 'smooth' }), 100);
  }
}

// 图标点击也可展开
document.querySelectorAll('.card-icon').forEach(icon => {
  icon.onclick = function() {
    const cardId = this.nextElementSibling.getAttribute('onclick').match(/'(\w+)'/)[1];
    toggleCard(cardId);
  };
});
</script>