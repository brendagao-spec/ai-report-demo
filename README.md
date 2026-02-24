# 产后成长管理 MVP（Next.js + Prisma + SQLite）

本项目是一个可本地运行的 Web App MVP，用于管理“产后成长周期”：

- `/dashboard`：显示当前周期状态（第几天、阶段）与模块进展。
- `/settings`：设置周期总天数与开始日期。
- `/modules/body`：身体恢复模块。
- `/modules/milk`：母乳与精力模块。
- `/modules/learning`：学习结构模块。
- `/modules/emotion`：情绪稳定模块。
- `/modules/multichild`：多娃适应模块。
- `/modules/growth`：能力升级模块。
- `/review`：周期复盘统计。

每个模块页都包含：

- 今日填写表单（日期、评分、备注）
- 最近 14 天历史记录

## 技术栈

- Next.js 14 + TypeScript（App Router）
- Tailwind CSS
- Prisma ORM
- SQLite

---

## 本地运行步骤

### 1) 安装依赖

```bash
npm install
```

### 2) 配置环境变量

复制示例环境变量文件：

```bash
cp .env.example .env
```

默认会使用 SQLite 数据库文件（`prisma/dev.db`）。

### 3) 建立 Prisma 数据库

先生成 Prisma Client：

```bash
npm run prisma:generate
```

再执行迁移（首次会创建 SQLite 数据库与表结构）：

```bash
npm run prisma:migrate
```

### 4) 启动开发服务器

```bash
npm run dev
```

启动后访问：<http://localhost:3000>

---

## 常用脚本

```bash
npm run dev             # 启动开发环境
npm run build           # 构建生产包
npm run start           # 运行生产服务
npm run lint            # 代码检查
npm run prisma:generate # 生成 Prisma Client
npm run prisma:migrate  # 执行 Prisma migration
```
