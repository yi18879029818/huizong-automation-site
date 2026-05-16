# ARCHITECTURE_INDEX.md - 架构索引

> 项目架构总览和技术栈索引

---

## 一、项目架构

```
cloudflare-pages-site-deploy/
├── public/                      # 原始静态站点（保持稳定）
│   ├── assets/
│   │   ├── site-shell.css       # 全局样式
│   │   ├── site-shell.js        # 全局脚本
│   │   └── ...
│   ├── index.html               # 首页
│   ├── about/
│   ├── contact/
│   ├── products/
│   └── solutions/
│
├── next-migration/              # Next.js 迁移层（活跃开发）
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx             # 首页
│   │   ├── about/
│   │   ├── contact/
│   │   ├── products/
│   │   └── admin/
│   ├── components/              # React 组件
│   │   ├── public-shell.tsx     # 页面壳
│   │   ├── structured-static-pages.js  # 结构化静态页面
│   │   ├── structured-catalog-pages.js # 产品目录页
│   │   └── CountUpValue.tsx
│   ├── content/                 # MDX 内容
│   │   └── pages/
│   │       ├── home.mdx
│   │       ├── about.mdx
│   │       └── ...
│   ├── lib/                     # 工具库
│   ├── styles/
│   │   └── globals.css          # Tailwind + 动画
│   ├── tailwind.config.js      # Tailwind 配置
│   └── package.json
│
└── database/                    # Cloudflare D1
    └── schema.sql
```

---

## 二、技术栈

### 前端框架
| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 14.2.35 | React 框架，App Router |
| **React** | 18.x | UI 库 |
| **Tailwind CSS** | 3.x | 原子化 CSS |

### 样式系统
| 文件 | 用途 |
|------|------|
| `app/globals.css` | Tailwind 基础 + 动画类 |
| `tailwind.config.js` | 主题配置（圆角、阴影、颜色） |
| `public/assets/site-shell.css` | 静态站点全局样式 |

### 后端服务
| 技术 | 用途 |
|------|------|
| **Cloudflare Pages Functions** | API 路由、表单处理 |
| **Cloudflare D1** | 数据库 |
| **Resend API** | 邮件发送 |

### 部署
| 平台 | 项目名 |
|------|--------|
| **Cloudflare Pages** | `huizong-automation-site-next-next` |
| **域名** | www.coolyne.com |

---

## 三、核心组件

### 页面壳组件
| 组件 | 文件 | 说明 |
|------|------|------|
| `PublicPageChrome` | `components/public-shell.tsx` | 页面公共头部和底部 |

### 静态页面生成
| 组件 | 文件 | 说明 |
|------|------|------|
| `HomePage` | `components/structured-static-pages.js` | 首页渲染 |
| `AboutPage` | `components/structured-static-pages.js` | About 页渲染 |
| `StructuredCatalogPages` | `components/structured-catalog-pages.js` | 产品/解决方案页 |

### MDX 内容
| 内容 | 路径 |
|------|------|
| 首页配置 | `content/pages/home.mdx` |
| About 配置 | `content/pages/about.mdx` |
| Contact 配置 | `content/pages/contact.mdx` |
| 产品配置 | `content/products/*.mdx` |
| 解决方案配置 | `content/solutions/*.mdx` |

---

## 四、配置文件

| 文件 | 用途 |
|------|------|
| `wrangler.toml` | Cloudflare Workers 配置 |
| `.dev.vars` | 本地环境变量 |
| `.env.local` | Next.js 环境变量 |
| `opennext.config.js` | OpenNext 构建配置 |

---

## 五、关键路径

### 线上地址
- **网站**：`https://www.coolyne.com`
- **管理后台**：`https://www.coolyne.com/admin`
- **表单提交 API**：`https://www.coolyne.com/api/contact`

### 本地开发
- **静态站点**：`wrangler pages dev public --port 8787`
- **Next.js**：`cd next-migration && npm run dev`
- **构建**：`cd next-migration && npm run build`
- **部署**：`cd next-migration && npm run deploy`

---

## 六、数据流

```
用户请求 → Cloudflare Pages → Next.js App
                              ↓
                         MDX 内容
                              ↓
                    structured-static-pages.js
                              ↓
                         React 组件
                              ↓
                         HTML 输出
```

```
表单提交 → /api/contact → Resend API (邮件)
                    ↓
              Cloudflare D1 (存储)
```

---

## 七、样式层级

| 层级 | 文件 | 说明 |
|------|------|------|
| 1 | `tailwind.config.js` | 基础配置（颜色、圆角、阴影） |
| 2 | `globals.css` | Tailwind 指令 + 自定义动画 |
| 3 | MDX 中的 className | 页面级样式 |
| 4 | 内联 style | 特殊覆盖 |

---

## 八、相关文档

- [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md) - 完整技术参考
- [CURRENT_STATUS.md](./CURRENT_STATUS.md) - 项目状态
- [AGENTS.md](./AGENTS.md) - AI 行为规则
