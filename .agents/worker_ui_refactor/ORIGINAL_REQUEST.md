## 2026-06-18T03:28:06Z

# 任务描述
你是 UI 重构专家 (teamwork_preview_worker)。你需要根据 UI 诊断报告和 Handoff 指南，在代码层面实施重构，消除项目的现代 Web3 风格冲突，建立统一的几何圆角系统，优化排版和层级，使其达到顶级的新中式极简风美学标准。

# 工作目录
c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\worker_ui_refactor\

# MANDATORY INTEGRITY WARNING (诚信警告)
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

# 修改步骤
请按以下步骤依次修改代码，并在此过程中保持防御性 UI 修改原则：

## 步骤 1. 修改 `src/components/AmbientBlobs.jsx`
1. 查看文件内容，确认结构。
2. 重构 `AmbientBlobs` 组件，使其直接 `return null;`，彻底禁用 Web3 流体色块的渲染。

## 步骤 2. 修改 `src/components/Header.jsx`
1. 查看文件内容，确认结构。
2. 将标题的 `motion.div`（大约在 35-41 行）中的行内重写样式移除，改为使用全新的 CSS 类名 `className="header-title"`。
3. 将字号缩放面板容器（大概在 70 行）的行内 `borderRadius` 修改为 `'8px'`，使其符合圆角系统。

## 步骤 3. 修改 `src/App.jsx`
1. 查看文件内容，确认结构。
2. 移除 HomeView 中的多余分割线（大约在 72 行）：
   `<div className="boundless-divider" style={{ margin: '1rem 0' }} />`
3. 移除 ListView 中的多余分割线（大约在 118 行）：
   `<div className="boundless-divider" style={{ margin: '0.5rem 0' }} />`
4. 在 DetailView（大约在 160-161 行）中，移除 inline panel padding 样式。将 inline `style` 替换为 `className="micro-mask-panel detail-panel"` 并保留仅关于定位 and zIndex 的 inline 样式：
   `style={{ position: 'relative', zIndex: 10 }}`

## 步骤 4. 修改 `src/index.css`
1. 诊断 `src/index.css` 的结构。
2. 在文件末尾追加或替换以下指定的样式，确保实现“高级新中式极简风”的排版、统一圆角（0px/4px/6px/8px/12px）、毛玻璃（Glassmorphism）、微调卡片垂直 padding、细黛墨边框、淡水墨投影等：
   - `.header-title` 与 `.header-wrapper:not(.header-scrolled) .header-title` 的文字特效
   - `.hero` 圆角设为 `0`
   - `.hero-content h1` 水墨双层 `drop-shadow` 与渐变背景
   - 统一圆角系统：`.micro-mask-panel` (`border-radius: 8px !important;`)，`.poi-card` (`border-radius: 8px;`)，`.poi-card img` (`border-radius: 6px;`)，`.tip-box` (`border-radius: 0;`)，`.header-btn`, `.audio-btn` (`border-radius: 4px;`)，`.fab-btn` (`border-radius: 4px;`)
   - 极细黛墨边框与极淡水墨投影：`.micro-mask-panel` 的背景色、细边框（`rgba(29, 37, 32, 0.05)`）和 box-shadow 等。
   - 对齐与间距：`.section-card` 垂直 padding 缩减（`padding: 2rem 1.5rem;`），`.detail-panel` padding 缩减（`padding: 1.8rem 1.2rem;`），`.detail-title-wrapper` 的对齐方式（`align-items: center;`），以及 `.boundless-divider` 极细黛墨线（设置 `opacity: 0.03;`）
   - 右上角毛玻璃按钮效果：`.header-btn` 与 `.header-scrolled .header-btn` 样式

## 步骤 5. 校验编译与静态检查
1. 修改完毕后，运行编译命令 `npm run build`，确保没有错误。
2. 运行 `npm run lint` 确保没有报错。如果有语法或格式报错，请及时修正。
3. 请记住，你在修改代码后，**必须严格检查返回的 diff 结果；如果发现 diff 为空或修改未生效，必须重新读取文件并修复，绝不能在未验证确认的情况下告知用户代码已修改完毕。**

# 输出要求
在重构实施完成后，编写 `changes.md` 记录详细的变更说明，并编写 `handoff.md`（包含编译结果和 verification 步骤的 handoff 报告）。
完成后向 parent 发送消息并提供相关报告的绝对路径。
