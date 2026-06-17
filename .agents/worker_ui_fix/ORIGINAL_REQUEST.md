## 2026-06-18T11:32:03Z
# 任务描述
你是防御性 UI 重构修复专家 (teamwork_preview_worker)。在上一轮重构后的审查中，我们的 Reviewer 和 Challenger 发现了多处高危和中危的 UI 缺陷、布局崩塌及无障碍规范问题。你需要根据以下防御性修复指南，在代码层面进行深度修复。

# 工作目录
c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\worker_ui_fix\

# MANDATORY INTEGRITY WARNING (诚信警告)
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

# 详细修复步骤

## 步骤 1. 修改 `src/App.jsx`
1. 查看文件内容。
2. 物理删除详情页面板中的两个水平分割线 DOM 节点（大约在 162 行与 164 行的 `<div className="boundless-divider" />`）。这些分割线在后续将通过 CSS `.article-section` 的 border 属性来实现，彻底从 JSX 中清理干净。
3. 在渲染最外层容器（大约在 221 行）时，为了支持在小字号（< 1.0）下自动进行无障碍对比度及字重增强，检测 `textScale`。如果 `textScale < 1.0`，给容器追加 `low-scale` 类名：
   `className={\`app-container \${textScale < 1.0 ? 'low-scale' : ''}\`}`

## 步骤 2. 修改 `src/components/ExpandableText.jsx`
1. 解决单段超长正文永久截断 Bug：
   - 定义一个条件：`const shouldTruncate = text.length > 150 || paragraphs.length > 1;`
   - 将折叠高度限制（22 行的 framer-motion `animate` 属性中的 height）重构为：
     `height: (expanded || !shouldTruncate) ? 'auto' : 'calc(12.5rem * var(--text-scale))'`
     （说明：未展开且需要折叠时使用随字号缩放比例自适应的高度，解决大字号截断；如果不需要折叠或已展开，则为 \`'auto'\`）。
   - 将渐隐遮罩 `.fade-mask` 和展开按钮的渲染条件统一替换为 `shouldTruncate`（例如 `!expanded && shouldTruncate && ...` 和 `shouldTruncate && ...`）。

## 步骤 3. 修改 `src/index.css`
1. 解决标题字号倒挂：
   - 为卡片 and 标题字号关联 `var(--text-scale)`，将以下标题的选择器字体大小改为 calc 动态缩放：
     - `.poi-card-info h3` -> `font-size: calc(1.3rem * var(--text-scale));`
     - `.section-card h2` -> `font-size: calc(2rem * var(--text-scale));`
     - `.list-header h2` -> `font-size: calc(2.2rem * var(--text-scale));`
     - `.detail-content h2` -> `font-size: calc(2rem * var(--text-scale));`
2. 解决大字号下首字下沉冲突：
   - 将首字下沉字号改为随字号动态缩放：
     - `.drop-cap > p:first-of-type::first-letter` 中的 `font-size` 设为 `calc(3.5rem * var(--text-scale));`
     - 微调其 padding 和 line-height，引入缩放关联：
       `padding-right: calc(0.5rem * var(--text-scale));`
       `padding-top: calc(0.1rem * var(--text-scale));`
       `line-height: 0.85;`
3. 解决渐隐遮罩拼缝脏色块：
   - 彻底将 `.fade-mask` 的背景渐变底色从页面底色改为面板的半透明灰白色底 `var(--bg-color-alt)`，使其与所属卡片材质完美契合，消除色块：
     `background: linear-gradient(to top, var(--bg-color-alt) 0%, transparent 100%);`
4. 解决小屏移动端（375px）字号滑块弹窗与标题重叠：
   - 在 CSS 中加入媒体查询，当屏幕宽度在 480px 以下时，将 Header 弹窗 `.header-wrapper .micro-mask-panel` 的宽度收窄为 `180px`，并精简其内边距，给左侧标题留出充足安全空间：
     \`\`\`css
     @media (max-width: 480px) {
       .header-wrapper .micro-mask-panel {
         width: 180px !important;
         padding: 1rem 0.8rem !important;
         gap: 0.5rem !important;
       }
     }
     \`\`\`
5. 解决大屏（1200px+）下 Header 水平错位：
   - 显式为导航栏外层 `.header-wrapper` 加入居中规则，使其保持在主正文正上方：
     \`\`\`css
     .header-wrapper {
       position: fixed;
       top: 0;
       left: 50%;
       transform: translateX(-50%);
       width: 100%;
       max-width: 480px;
       z-index: 100;
     }
     \`\`\`
6. 解决未滚动 Header 透明状态下白色按钮在明亮背景下的对比度消失：
   - 增加未滚动状态下透明导航栏的黑底遮罩渐变浓度，微调 `.hero::after`：
     `background: linear-gradient(to bottom, rgba(29, 29, 31, 0.25) 0%, rgba(29, 29, 31, 0.45) 60%, var(--bg-color) 100%);`
   - 对未滚动时的按钮 `.header-wrapper:not(.header-scrolled) .header-btn`，微调其白色背景的透明度以提升对比度，如使用 `background: rgba(0, 0, 0, 0.12);` 或者配置轻微的水墨阴影。
7. 解决小字号下暗色模式对比度无障碍失效及极细边框不可见：
   - 提升亮色模式下的细边框可见度：
     `.micro-mask-panel` 的 border 修改为 `border: 1px solid rgba(29, 37, 32, 0.1) !important;`
   - 在 CSS 中追加无障碍增强样式：
     \`\`\`css
     .low-scale .poi-card-info p, 
     .low-scale .article-paragraph {
       font-weight: 500;
     }
     [data-theme='dark'] .low-scale .poi-card-info p,
     [data-theme='dark'] .low-scale .article-paragraph {
       color: #B2B2B7; /* 提高文字亮度保证相对对比度 > 4.5:1 */
     }
     \`\`\`
8. 重新呈现视觉分割线（物理删除 JSX 后）：
   - 将原 App.jsx 物理删除分割线处的视觉效果，作为 CSS 下边框重新引入到 `.article-section` 中，使其底端带有一条极细极淡的黛墨分割线：
     \`\`\`css
     .article-section:not(:last-of-type) {
       border-bottom: 1px solid rgba(29, 37, 32, 0.03);
       padding-bottom: 1.5rem;
       margin-bottom: 1.5rem;
     }
     \`\`\`
9. 纠正毛玻璃按钮不透明度：
   - 确保将 `.header-btn` 的毛玻璃底色修改为符合要求的 `rgba(255, 255, 255, 0.2)`。

## 步骤 4. 物理清理无用文件
1. 物理删除 `src/App.css` 文件以释放空间并消除警告。

## 步骤 5. 编译与 Lint 校验
1. 运行 `npm run build`，确保没有错误。
2. 运行 `npm run lint`，确保没有错误。
3. 请记住，你在修改代码后，**必须严格检查返回的 diff 结果；如果发现 diff 为空或修改未生效，必须重新读取文件并修复，绝不能在未验证确认的情况下告知用户代码已修改完毕。**

# 输出要求
在所有修复完成后，编写 `changes.md` 记录变更，编写 `handoff.md`（包含编译和 Lint 的校验结果）。完成后向 parent 发送消息并提供相关报告的绝对路径。
