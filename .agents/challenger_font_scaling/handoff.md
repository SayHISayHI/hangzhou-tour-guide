# Handoff Report

## 1. Observation (直接观察)

通过对项目文件的审查，获取到如下具体的 CSS 规则和组件逻辑：

1. **卡片标题与描述字号规则**：
   - `src/index.css` 第 270-274 行：
     ```css
     .poi-card-info h3 {
       font-size: 1.3rem;
       margin-bottom: 0.4rem;
       color: var(--text-primary);
     }
     ```
   - `src/index.css` 第 276-284 行：
     ```css
     .poi-card-info p {
       font-size: calc(0.9rem * var(--text-scale));
       color: var(--text-secondary);
       display: -webkit-box;
       -webkit-line-clamp: 2;
       -webkit-box-orient: vertical;
       overflow: hidden;
       font-family: var(--font-serif);
     }
     ```

2. **折叠组件折叠高度限制**：
   - `src/components/ExpandableText.jsx` 第 20-25 行：
     ```jsx
             <motion.div 
               initial={false}
               animate={{ height: expanded ? 'auto' : '200px' }}
               transition={{ type: 'spring', stiffness: 200, damping: 25 }}
               style={{ overflow: 'hidden', position: 'relative' }}
             >
     ```

3. **遮罩底色硬编码**：
   - `src/index.css` 第 419-427 行：
     ```css
     .fade-mask {
       position: absolute;
       bottom: 0;
       left: 0;
       right: 0;
       height: 100px;
       background: linear-gradient(to top, var(--bg-color) 0%, transparent 100%);
       pointer-events: none;
     }
     ```

4. **重构面板背景色与 padding 规则**：
   - `src/index.css` 第 573-579 行：
     ```css
     .micro-mask-panel {
       background: rgba(255, 255, 255, 0.8) !important;
       border: 1px solid rgba(29, 37, 32, 0.05) !important;
       box-shadow: 0 4px 16px rgba(29, 37, 32, 0.03) !important;
       backdrop-filter: blur(12px) !important;
       -webkit-backdrop-filter: blur(12px) !important;
     }
     ```
   - `src/index.css` 第 592-594 行：
     ```css
     .detail-panel {
       padding: 1.8rem 1.2rem !important;
     }
     ```

5. **暗色模式颜色配置**：
   - `src/index.css` 第 40-48 行：
     ```css
     [data-theme='dark'] {
       --bg-color: #121212;
       --bg-color-alt: #1C1C1E;
       --text-primary: #F5F5F7;
       --text-secondary: #86868B;
       --accent-color: #D65A4A;
       --glass-bg: rgba(18, 18, 18, 0.75);
       --glass-border: rgba(255, 255, 255, 0.08);
       --glass-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
     }
     ```

---

## 2. Logic Chain (推导逻辑链)

基于上述直接观察，推演极端缩放下的排版表现：

1. **在 1.5 倍最大缩放（`textScale = 1.5`）下**：
   - **字号层级倒挂**：`.poi-card-info p` 描述字号为 `calc(0.9rem * 1.5) = 1.35rem`。而标题 `.poi-card-info h3` 为固定值 `1.3rem`。由于 `1.35rem > 1.3rem`，导致正文大过标题，视觉层级完全崩塌。（对应 Observation 1）
   - **折叠内容物理截断**：`.article-paragraph` 的字号为 `1.1rem * 1.5 = 1.65rem`（约 26.4px），配合行高 1.85，单行行高达到 `48.8px`。折叠容器 `ExpandableText` 限制高度为 `200px`。在一行半的正文加上 `1.5rem` 段距后，高度将轻易突破限制，导致多行文本在此固定高度下无法露出折叠渐隐，被无情物理裁切出“半截字”。（对应 Observation 2）
   - **遮罩色块拼缝**：`.detail-panel` 使用了半透明毛玻璃背景 `rgba(255, 255, 255, 0.8)`（亮色）或 `rgba(28, 28, 30, 0.85)`（暗色）。折叠组件的 `.fade-mask` 渐变却使用的是不透明的 `var(--bg-color)` （#F8F6F0 或 #121212）。叠放时由于不透明的背景色与半透明的毛玻璃底色存在差异，遮罩底部会出现突兀的色差拼缝。（对应 Observation 3 & 4）
   - **边距文字贴边**：重构后的 `.detail-panel` 左右 padding 为 `1.2rem` (19.2px)，字号放大后为 `1.65rem` (26.4px)。因为 padding (19.2px) < 字号 (26.4px)，使得放大的文本极度贴近物理边框，产生拥挤局促的感官。（对应 Observation 4）

2. **在 0.8 倍最小缩放（`textScale = 0.8`）下**：
   - **小字号与低对比度无障碍失效**：描述文字字号缩小至 `0.9rem * 0.8 = 0.72rem` (约 11.5px)。在暗色模式下，文本颜色为 `--text-secondary`（`#86868B`），毛玻璃面板背景在暗色下由于叠底表现约等于 `#2b2b2d`（或 `rgba(28, 28, 30, 0.85)` 材质下的颜色）。通过对比度算法得出其对比度仅为 **3.71:1**，不符合 WCAG 2.0 AA 对普通文本对比度最低 4.5:1 的无障碍要求。加之字号极小，导致难以阅读。（对应 Observation 1 & 5）
   - **卡片边界融化模糊**：为了极简，`.micro-mask-panel` 在亮色下的边框不透明度仅为 5% (`rgba(29, 37, 32, 0.05)`)。在亮色模式的 `#F8F6F0` 纸底色背景上，这个近乎全透明的超细边框与毛玻璃的微透底色 `rgba(255, 255, 255, 0.8)` 会完全融为一体。特别在 0.8 倍小字号留白大增时，卡片轮廓彻底隐形。（对应 Observation 4）

---

## 3. Caveats (注意事项)

- 本次测试完全基于对代码结构的精确逻辑推演与样式参数的无障碍计算。
- 未在真实的低分辨率长宽比安卓机型或特定辅助阅读器上做物理实测。

---

## 4. Conclusion (结论)

经对抗性测试推演，确认项目在右上角 "A" 按钮极端缩放（1.5x 和 0.8x）下，**存在布局崩塌与无障碍违规的高危漏洞**。
主要体现为：标题字号比描述文字更小、折叠组件文字溢出被截断、折叠遮罩背景色拼缝色差、文字贴边压迫感、暗色模式小字体对比度不合规、卡片外框轮廓融化等六大问题。

---

## 5. Verification Method (验证方法)

1. **排查受影响的文件**：
   - 查看 `src/index.css` 中 `.poi-card-info h3` 及 `.poi-card-info p` 的字号定义，确认 `h3` 缺失 `var(--text-scale)` 计算。
   - 查看 `src/components/ExpandableText.jsx` 中的 `<motion.div>` 折叠容器，确认存在固定硬编码高度 `200px`。
   - 查看 `src/index.css` 中的 `.fade-mask` 和 `.micro-mask-panel` 背景色定义，确认存在遮罩底色与面板底色色差。

2. **本地启动独立验证**：
   - 在项目根目录下执行 `npm run dev` 启动本地 Vite 开发服务器。
   - 打开浏览器，进入详情页。
   - 点击右上角“A”按钮，将滑块拖动到最右端（1.5倍）。
   - 观察目的地列表卡片的标题与描述文本，可以清晰看到描述文字比标题更大。
   - 观察详情页折叠组件（若有长文本段落），在折叠态下段落文本底部汉字被直接从中间切开成两半。
   - 将滑块拖动到最左端（0.8倍），切换到暗色模式，可以观察到描述小字极其模糊难辨。
