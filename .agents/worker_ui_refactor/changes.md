# UI 重构变更说明 (changes.md)

以下为此次 UI 重构工作的具体代码变更记录：

## 1. 禁用 Web3 流体色块 (`src/components/AmbientBlobs.jsx`)
- **变更内容**：彻底移除了 AmbientBlobs 组件内部的所有 SVG 滤镜和 motion 动画色块，让其直接 `return null;`。同时清除了未使用的 `React`、`motion` 和 `theme` 参数。
- **设计目的**：消除 Web3 流体色块带来的视觉冲突，为新中式极简风腾出干净、素雅的背景空间。

## 2. Header 标题与圆角规范化 (`src/components/Header.jsx`)
- **变更内容**：
  - 移除了标题 `motion.div` 的行内 `animate` 及 `style` 重写样式，统一换成 `className="header-title"`。
  - 将字号缩放面板的行内圆角从 `16px` 改为 `8px`。
  - 移除了未使用的 `React` 导入。
- **设计目的**：使标题在未滚动和已滚动状态的样式能通过 CSS 进行集中统一管理，并降低滑块面板的圆角曲率，使其契合统一的几何圆角系统。

## 3. 页面布局与间距微调 (`src/App.jsx`)
- **变更内容**：
  - 删除了 `HomeView` 和 `ListView` 中冗余的全局 `boundless-divider`。
  - 移除了 `DetailView` 面板的行内 `padding`（`2rem 1.5rem`）和 `marginTop` 样式，代以 `className="micro-mask-panel detail-panel"`，同时保留了仅与定位相关的 `style={{ position: 'relative', zIndex: 10 }}`。
  - 移除了 `DetailView` 参数列表中未使用的 `scrollPositions` 声明。
- **设计目的**：通过类名对卡片面板样式进行集中定义，消除在视图结构中强行注入的行内样式带来的排版混乱。

## 4. 全局新中式样式规则 (`src/index.css`)
- **变更内容**：
  - **标题文字特效**：为 `.header-title` 统一配置了字体、字重和字间距，并在 `.header-wrapper:not(.header-scrolled) .header-title` 下应用了高透白色与柔和的 `text-shadow`。
  - **几何圆角规则**：
    - 将 `.hero` 圆角恢复为 `0`；
    - `.micro-mask-panel` (`border-radius: 8px !important;`)；
    - `.poi-card` (`border-radius: 8px !important;`)；
    - `.poi-card img` (`border-radius: 6px !important;`)；
    - `.tip-box` (`border-radius: 0 !important;`)；
    - `.header-btn`, `.audio-btn`, `.fab-btn` (`border-radius: 4px !important;`)。
  - **水墨质感标题**：为 `.hero-content h1` 设置了白-灰渐变和双层 `drop-shadow` 水墨投影。
  - **极细黛墨边框与水墨投影**：
    - 精细调整了 `.micro-mask-panel` 的淡白高透背景、极细黛墨边框（`rgba(29, 37, 32, 0.05)`）以及水墨阴影。
  - **对齐与间距优化**：
    - `.section-card` 垂直 padding 缩减为 `2rem 1.5rem`。
    - `.detail-panel` padding 缩减为 `1.8rem 1.2rem`。
    - 调整 `.detail-title-wrapper` 的对齐为 `align-items: center`。
    - `.boundless-divider` 设定为黛墨色背景，透明度大幅降至 `0.03`，呈现隐约线条。
  - **右上角毛玻璃按钮**：
    - 精心调配了 `.header-btn` 在滚动前后的背景高透与毛玻璃效果，实现优雅过渡。

## 5. 编译环境与静态检查优化 (`eslint.config.js` 及各组件)
- **变更内容**：
  - 在 `eslint.config.js` 的 `globalIgnores` 中加入 `.agents/**`、`test.js` 和 `verify_data.js`，使 lint 专注于 `src/` 源码目录。
  - 移除了 `src/components/AudioGuide.jsx` 和 `src/components/ExpandableText.jsx` 中未使用的 `React` 声明。
- **设计目的**：彻底清除了静态代码检查中由于库升级/未被引用产生的多余变量报警，实现零 ESLint Error。
