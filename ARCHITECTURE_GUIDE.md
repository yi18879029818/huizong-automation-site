# ARCHITECTURE_GUIDE.md - 完整技术参考

> 详细的技术方案、代码模式、最佳实践

---

## 一、项目概述

### 业务定位
- **品牌**：Fleet / 汇宗智能自动化
- **主业**：AGV、AMR、智能仓储系统
- **目标**：B2B 工业自动化官网 + 营销转化

### 线上地址
- **网站**：`https://www.coolyne.com`
- **部署平台**：Cloudflare Pages
- **项目名**：`huizong-automation-site-next-next`

---

## 二、技术方案

### 2.1 双架构策略

#### 静态站点 (`public/`)
- **用途**：保持稳定运行，作为 fallback
- **技术**：纯 HTML/CSS/JS
- **维护**：仅做必要修复，不新增功能

#### Next.js 迁移层 (`next-migration/`)
- **用途**：逐步替换静态内容，实现动态化
- **技术**：Next.js 14 + App Router + MDX
- **策略**：低风险迁移，内容优先

### 2.2 样式方案

#### Tailwind CSS 配置 (`tailwind.config.js`)

```javascript
// 圆角系统
borderRadius: {
  sm: "0.25rem",    // 4px
  md: "0.5rem",     // 8px
  lg: "1rem",       // 16px
  xl: "1.5rem",     // 24px
  "2xl": "2rem",    // 32px
}

// 阴影系统
boxShadow: {
  soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
  card: "0 4px 16px rgba(0, 0, 0, 0.08)",
  elevated: "0 8px 24px rgba(0, 0, 0, 0.1)",
  floating: "0 12px 32px rgba(0, 0, 0, 0.12)",
  glow: "0 0 20px rgba(254, 107, 0, 0.2)"
}
```

#### 动画类 (`globals.css`)

```css
/* 动画效果 */
.animate-fade-in       /* 淡入 */
.animate-fade-in-up    /* 上移淡入 */
.animate-fade-in-left  /* 左移淡入 */
.animate-fade-in-right /* 右移淡入 */
.animate-scale-in      /* 缩放淡入 */
.animate-pulse-glow    /* 脉冲光晕 */
.animate-float         /* 漂浮 */
.animate-shimmer       /* 流光 */

/* 交互效果 */
.hover-lift    /* 悬浮上移 + 阴影 */
.hover-scale   /* 悬浮放大 */

/* 渐变文字 */
.text-gradient {
  background: linear-gradient(135deg, #fe6b00 0%, #ff9a43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 2.3 组件架构

#### PublicPageChrome (`public-shell.tsx`)
页面壳组件，包含 Header、Footer、导航逻辑

```tsx
<PublicPageChrome
  theme="home"  // 主题配置
  sectionRefs={...}
  navItems={[...]}
>
  {children}
</PublicPageChrome>
```

#### StructuredStaticPages (`structured-static-pages.js`)
静态页面渲染组件，通过 MDX 配置生成页面

```tsx
<StructuredStaticPages
  page="about"
  content={aboutContent}
/>
```

---

## 三、代码模式

### 3.1 页面开发模式

```tsx
// 1. 创建 MDX 内容文件
// content/pages/about.mdx
export const aboutConfig = {
  hero: {
    kicker: "coolyne Warehouse Automation",
    title: "Engineering the Future",
    stats: [
      { value: "500+", label: "Engineers" },
      { value: "70+", label: "Core Patents" }
    ]
  }
}

// 2. 在页面中引用
// app/about/page.tsx
import { aboutConfig } from '@/content/pages/about.mdx'

export default function AboutPage() {
  return <StructuredStaticPages page="about" content={aboutConfig} />
}
```

### 3.2 组件样式模式

```tsx
// 使用 Tailwind 类
<div className="rounded-xl shadow-card hover-lift transition-smooth">
  <span className="text-gradient">渐变文字</span>
</div>

// 使用 CSS 变量
<div style={{ '--shadow-soft': '0 2px 8px rgba(0,0,0,0.06)' }}>
  自定义样式
</div>
```

### 3.3 动画实现模式

```tsx
// 页面加载动画
<h1 className="animate-fade-in-up delay-100">
  标题
</h1>

// 滚动触发动画 (需要 JS)
<div className="scroll-reveal">
  滚动显示内容
</div>
```

---

## 四、部署指南

### 4.1 本地开发

```bash
# 静态站点
npx wrangler pages dev public --port 8787

# Next.js 开发
cd next-migration
npm run dev

# Next.js 构建
npm run build
```

### 4.2 线上部署

```bash
cd next-migration
npm run deploy
```

部署流程：
1. `npm run prebuild` → 同步静态资源
2. `next build` → 构建 Next.js
3. `opennextjs-cloudflare build` → 打包
4. 自动部署到 Cloudflare Pages

### 4.3 环境变量

| 变量 | 本地 | 线上 |
|------|------|------|
| `RESEND_API_KEY` | `.dev.vars` | Cloudflare 控制台 |
| `D1_DATABASE_ID` | `.dev.vars` | Cloudflare 控制台 |

---

## 五、数据库

### D1 Schema

```sql
CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visitor_tracking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## 六、API 接口

### POST /api/contact
提交联系表单

```typescript
// 请求
{
  name: string
  company?: string
  email: string
  phone?: string
  message: string
}

// 响应
{ success: true, id: number }
```

---

## 七、最佳实践

### 7.1 性能优化
- 图片使用 WebP 格式
- 静态资源使用 CDN 缓存
- 组件使用懒加载

### 7.2 安全
- 邮件发送使用 Resend API
- 环境变量存储在 Cloudflare
- 不在前端暴露敏感信息

### 7.3 缓存策略
- 静态资源：Cache-Control: public, max-age=31536000
- API 响应：Cache-Control: no-store
- 页面：默认静态生成

---

## 八、问题排查

| 问题 | 解决方案 |
|------|----------|
| 样式不生效 | 检查 Tailwind 类名是否正确，尝试强制刷新 |
| 动画不显示 | 确认 `globals.css` 已正确引入，检查动画类名 |
| 部署失败 | 检查 `wrangler.toml` 配置，确认 Cloudflare 登录状态 |
| D1 查询失败 | 确认环境变量 `D1_DATABASE_ID` 已配置 |

---

## 九、相关文档

- [ARCHITECTURE_INDEX.md](./ARCHITECTURE_INDEX.md) - 架构索引
- [CURRENT_STATUS.md](./CURRENT_STATUS.md) - 项目状态
- [AGENTS.md](./AGENTS.md) - AI 行为规则
