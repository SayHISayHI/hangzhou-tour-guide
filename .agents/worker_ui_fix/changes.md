# Changes Log — 2026-06-18

在此次防御性 UI 重构修复中，共对 3 个文件进行了代码修改，并物理删除了 1 个无用文件，解决了多处 UI 缺陷和无障碍对比度问题。

## 1. 修改 `src/App.jsx`
- **物理删除水平分割线**：去除了详情页面板中写死的两个 `<div className="boundless-divider" />` DOM 节点。后续采用 CSS 的 `.article-section` border 属性来实现底端分割线，实现了 JSX 结构的彻底清理。
- **无障碍小字号缩放增强**：在最外层容器追加了 `low-scale` 的动态类名：
  `className={`app-container ${textScale < 1.0 ? 'low-scale' : ''}`}`，配合 CSS 在小字号下自动增强字重与对比度。

## 2. 修改 `src/components/ExpandableText.jsx`
- **解决单段超长正文永久截断 Bug**：
  - 定义了条件 `const shouldTruncate = text.length > 150 || paragraphs.length > 1;`，确保超长单段文本也能正确触发截断折叠。
  - 将折叠时的动画高度由写死的 `'200px'` 变更为 `'calc(12.5rem * var(--text-scale))'`，使折叠高度能自适应字号缩放，解决了大字号下的内容截断问题。在已展开或无需折叠时设置为 `'auto'`。
  - 统一将 `.fade-mask` 遮罩与展开按钮的条件修改为 `shouldTruncate`。

## 3. 修改 `src/index.css`
- **标题字号关联缩放**：将 `.poi-card-info h3`、`.section-card h2`、`.list-header h2` 和 `.detail-content h2` 的 font-size 改为基于 `var(--text-scale)` 进行 calc 动态缩放，解决字号倒挂问题。
- **首字下沉冲突解决**：首字下沉字体缩放使用 `calc(3.5rem * var(--text-scale))`，微调 padding-right、padding-top 和 line-height 为随字号缩放关联。
- **渐隐遮罩拼缝脏色块消除**：把 `.fade-mask` 的背景渐变底色变更为与面板一致的半透明灰白色底 `var(--bg-color-alt)`，使过渡更加平滑无痕。
- **小屏弹窗与标题重叠修复**：在 `@media (max-width: 480px)` 媒体查询下将 Header 弹窗宽收窄为 `180px`，精简 padding 和 gap，留出充足左侧安全空间。
- **大屏 Header 水平错位修复**：为 `.header-wrapper` 增加了居中规则（`left: 50%`、`transform: translateX(-50%)`），使其居中对齐正文。
- **透明 Header 白色按钮对比度增强**：微调 `.hero::after` 遮罩渐变色浓度；给未滚动状态的按钮 `.header-wrapper:not(.header-scrolled) .header-btn` 配置 `rgba(255, 255, 255, 0.2)` 的毛玻璃背景，并加入轻微水墨阴影。
- **小字号下对比度及极细边框不可见修复**：
  - 亮色模式 `.micro-mask-panel` 的 border 调整为 `rgba(29, 37, 32, 0.1)` 提升可见度。
  - 增加 `.low-scale` 规则，在小字号下使正文加粗，暗色模式下提高文字亮度。
- **呈现新视觉分割线**：利用 `.article-section:not(:last-of-type)` 的 CSS border-bottom 重新代替之前删除的 DOM 分割线。
- **纠正毛玻璃按钮不透明度**：确保 `.header-btn` 的毛玻璃底色修改为符合要求的 `rgba(255, 255, 255, 0.2)`。

## 4. 物理删除 `src/App.css`
- 物理删除了空置且多余的 `src/App.css` 文件，释放存储空间并消除了无用样式引用警告。
