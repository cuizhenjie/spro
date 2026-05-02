# 赛博衣橱 · Spro

> **AI 时尚百宝箱** — 让每个人的穿搭决策都有 AI 加持，让每位创作者都能将审美变现。

[简体中文](README.md) · [English](README.en.md)

---

## 产品定位

**赛博衣橱**是一个 AI 原生的时尚消费与创作平台。

它不是又一个"AI 换装"工具，也不是单纯的电商网站。它解决的是一个真实却长期悬而未决的矛盾：

> **消费者不知道自己穿什么最好看；创作者无法将自己的审美转化为可持续收入。**

我们通过三个层面来构建答案：

| 层级 | 用户价值 |
|------|---------|
| **个人诊断层** | AI 分析你的肤色基调、风格象限、色彩季型，给出你专属的穿搭公式——而不是通用建议 |
| **消费决策层** | 基于诊断结果，在平台商品中找到匹配单品，缩短"种草→决策→购买"的链路 |
| **创作者变现层** | 任何人都可以将自己的穿搭审美打包成 AI 工具，上架销售，从内容消费者变成收入创造者 |

---

## 行业背景

### 穿搭美学市场正在被 AI 重新定义

全球时尚消费市场年规模超过 **1.7 万亿美元**（Euromonitor 2024），中国线上时尚GMV突破 **3.2 万亿**（艾瑞咨询 2024）。在这片巨大的市场中，三个结构性变化正在同时发生：

**1. 从"跟着买"到"我适合"**
消费者决策逻辑正在从kol种草驱动转向个人数据驱动。Pantone 色彩研究院数据显示，68% 的消费者希望获得基于个人特征的穿搭建议，而非通用搭配。AI 个人色彩诊断、面部风格分析市场规模年增速超过 40%。

**2. 从内容流量到审美变现**
小红书穿搭内容年增长 210%，但创作者变现路径仍以广告为主。真正的机会在于：创作者的审美能不能变成可销售的产品？穿搭风格数据包、AI 诊断工具、定制化风格报告——这些才是创作者经济的下一跳。

**3. 从工具到社区，从社区到市场**
成熟的时尚平台最终都会走向"工具沉淀内容→内容吸引用户→用户产生交易→交易激励创作者"的飞轮。Reddit的r/femalet Fashion Advice、Pinterest的风格看板、小红书的穿搭笔记，本质上都是在做这件事。但它们都缺少一个关键环节：**AI 驱动的个性化闭环**。

**赛博衣橱**就是这个闭环的基础设施。

---

## 核心功能

### 🧬 AI 个人诊断工具矩阵

| 工具 | 功能 | 技术实现 |
|------|------|---------|
| 手相趣味解读 | 面部+手相命理趣味分析，生成可视化报告 | AI 图像识别 + 生成 |
| 风格测试 | 15道题定位风格象限（直线/曲线 × 大量感/小量感） | AI 规则引擎 |
| 四季色彩诊断 | 上传正面照，判断春/夏/秋/冬色彩季型 + 推荐色板 | AI 图像分析 |
| 个人形象诊断 | 完整形象报告：穿搭示例、妆容指南、发型建议 | AI 多维度分析 |
| 口红推荐 | 分析肤色冷暖，匹配 Dior/YSL/Armani/Chanel 色号 | AI 色彩分析 |
| 四季穿搭指南 | 上传人物照片，生成春夏秋冬四套完整造型方案图 | AI 图像生成 |
| 个人色彩分析 | 基于色彩学原理，生成个人专属色板报告图 | AI 图像生成 |
| 妆容分析 | 专业级妆容评估与改进建议报告 | AI 图像分析 |

### 🛍️ AI 时尚市场（Marketplace）

创作者将自己的审美能力转化为可销售工具，消费者用 Coins 购买并使用，使用结果生成专属报告。全程 AI 驱动，无需人工介入。

### 📦 商品闭环

- **商品详情页**：真实商品数据展示（名称/作者/稀有度/价格/评分/销量）
- **购物车**：商品加入购物车，生成订单
- **订单系统**：localStorage 持久化订单记录
- **创作者后台**：实时查看新订单、收入统计、已售工具管理

### 👤 创作者中心（Seller Dashboard）

创作者可查看自己的工具销售数据、订单记录、收入统计，并发布新工具到市场。

### 💳 订阅与积分体系

- **三级订阅**：Scavenger（免费）/ Cyberpunk（月付）/ Overlord（高阶）
- **Coins 充值**：按次付费购买 AI 工具，支持 Coins 赠送机制
- **每日签到**：免费获取 Coins，维持用户活跃

---

## 技术架构

### 核心技术栈

| 层级 | 技术选型 |
|------|---------|
| 前端框架 | **Next.js 15** (App Router) |
| UI 样式 | **Tailwind CSS 3** + 自定义 CyberUI 组件库 |
| 动画引擎 | **GSAP** (GreenSock) — ScrollTrigger / 扫描线 / 打字机动画 |
| 图标 | **Lucide React** + Material Symbols |
| AI 模型（对话/分析） | **GLM-5.1** via Z.ai / bigmodel.cn |
| AI 图像生成 | **Stepfun step-image-edit-2** |
| 状态管理 | React `useState` + `useEffect` + localStorage |
| 部署平台 | 适配 Vercel / Cloudflare Pages / 任意 Node 部署环境 |

### 项目结构

```
spro/
├── app/                          # Next.js App Router 页面
│   ├── page.tsx                  # 首页（商品展示 + 入口）
│   ├── ai-listing/               # AI 商品智能上架工具
│   ├── marketplace/               # AI 工具市场
│   ├── product/[id]/             # 商品详情页
│   ├── upload/[tool]/            # AI 工具使用上传页
│   ├── result/[tool]/            # AI 分析结果展示页
│   ├── orders/                   # 用户订单历史
│   ├── seller/                   # 创作者中心
│   ├── pricing/                  # 订阅与积分方案
│   ├── profile/                  # 个人中心
│   ├── history/                  # 分析历史
│   └── api/                      # API 路由
│       ├── style-guide/           # 四季穿搭指南 API
│       ├── personal-color/       # 个人色彩分析 API
│       └── makeup-analysis/       # 妆容分析 API
├── components/
│   ├── CyberUI/                  # CyberUI 设计系统组件
│   │   ├── GlassCard.tsx         # 毛玻璃卡片
│   │   ├── HUDBrackets.tsx       # HUD 边框装饰
│   │   ├── DataCard.tsx          # 数据展示卡片
│   │   ├── TerminalLog.tsx       # 终端日志组件
│   │   └── NeuralViz.tsx         # 神经网络可视化
│   ├── TopNav.tsx                # 顶部导航
│   ├── Sidebar.tsx               # 侧边栏（已移除）
│   └── AnimationProvider.tsx      # GSAP 动画全局注入
├── lib/
│   ├── animations.ts             # GSAP 动画函数库
│   ├── marketplace-data.ts       # AI 工具市场数据
│   ├── products-data.ts          # 平台商品数据
│   └── order-store.ts            # 订单 localStorage 管理
└── types/
    └── marketplace.ts            # TypeScript 类型定义
```

### 设计系统

**视觉风格**：赛博朋克（Cyberpunk）× 瑞士网格
- 主色：霓虹粉 `#ffabf3`（Primary）
- 辅色：翡翠绿 `#ecffe3`（Secondary）
- 强调色：荧光绿 `#bfd043`（Tertiary）
- 背景：深紫黑 `#0a0610` / `#160a15`
- 字体：Syne（标题）+ Space Grotesk（正文）+ JetBrains Mono（数据）

**核心组件**：`GlassCard` / `HUDBrackets` / `DataCard` / `TerminalLog` / `NeuralViz`

---

## 商业模式

### 收入路径

```
用户（充值 Coins）
    ↓
购买 AI 工具（Coins 消耗）
    ↓
创作者获得收入分成
    ↓
平台抽佣
```

### 定价锚点

| 工具类型 | 价格区间 | 策略 |
|----------|---------|------|
| 趣味测试类 | ¥9-19 | 低门槛引流，社交传播 |
| 专业诊断类 | ¥29-69 | 核心利润产品 |
| 高端定制报告 | ¥99-199 | 高净值用户 |
| 订阅会员 | ¥19-99/月 | 稳定订阅收入 |

### 创作者经济飞轮

```
创作者发布工具 → 用户购买 → 创作者获得收入
       ↑                            ↓
   优化迭代                   口碑传播 + 平台推荐
       ↑                            ↓
    更多创作者 ← ← ← ← ← ← ← ← 更多用户
```

---

## 产品路线图

### 已完成（Production Ready）

- [x] 8 个 AI 诊断工具（3个已接入真实图像生成）
- [x] 完整商品闭环（浏览→详情→购买→订单）
- [x] 创作者后台（订单管理 + 收入统计）
- [x] 订阅体系 + Coins 积分
- [x] CyberUI 设计系统（Dark Theme + 赛博朋克视觉）
- [x] GSAP 全局动画（扫描线 / 脉冲 / 打字机 / 视差）
- [x] 响应式设计（Desktop + Mobile）
- [x] 商品详情页 + localStorage 订单持久化

### 下一阶段

- [ ] 接入真实支付渠道（微信/支付宝）
- [ ] 创作者工具发布表单（自助上架）
- [ ] 用户画像 + 诊断报告历史
- [ ] AI 实时对话风格顾问
- [ ] 社交分享 + 邀请裂变机制
- [ ] 后台管理系统（Admin Panel）

### 长期愿景

- **穿搭 AI 搜索引擎**：用自然语言搜索"适合黄皮小个子显高的通勤穿搭"
- **AI 穿搭师 API**：为第三方电商平台提供穿搭推荐 API
- **线下场景延伸**：AR 虚拟试衣 + 智能穿搭镜

---

## 快速开始

```bash
# 克隆项目
git clone https://github.com/cuizhenjie/spro.git
cd spro

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 API Key

# 开发模式
npm run dev

# 构建生产版本
npm run build
npm start
```

### 环境变量

```env
# AI 对话模型（GLM-5.1）
BIGMODEL_API_KEY=your_key_here

# AI 图像生成（Stepfun）
STEPFUN_API_KEY=your_key_here
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request。

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

## 许可证

[MIT License](LICENSE)

---

## 联系方式

- **GitHub Issues**: [cuizhenjie/spro](https://github.com/cuizhenjie/spro/issues)
- **作者**: cuizhenjie

---

*穿什么，由 AI 更懂你。*
