## 2026-06-18T03:35:24Z
# 任务描述
你是技术缺陷修复专家 (teamwork_preview_worker)。在上一轮回归验证中，我们的代码规范与安全终审专家发现并否决了 3 处与定位冲突、安全检测缺失以及遮罩色差有关的高危代码级缺陷。你需要实施最终防护性修改，确保项目能在任何特殊浏览器下不崩溃，并在大屏下完美居中。

# 工作目录
c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\worker_ui_fix_2\

# MANDATORY INTEGRITY WARNING (诚信警告)
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

# 详细修复步骤

## 步骤 1. 修改 `src/index.css`
1. 解决 Framer Motion 与 CSS 定位冲突导致的大屏 Header 错位：
   - 彻底废除 `.header-wrapper` 下的 `left: 50%; transform: translateX(-50%)` 定位。
   - 代之以纯物理居中定位方案：
     ```css
     .header-wrapper {
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       margin: 0 auto;
       width: 100%;
       max-width: 480px;
       z-index: 100;
       /* 保持其他原样式不变 */
     }
     ```
     这样在大视口下，Header 将在不依赖 CSS `transform` 的情况下天然完美居中，彻底消除 Framer Motion 内联 translateY 对水平居中的覆盖破坏。
2. 解决 `.fade-mask` 渐隐遮罩在亮色下的微弱色差拼缝：
   - 重构 `.fade-mask` 的渐变。不再使用 `var(--bg-color-alt)` 米黄纸灰，而是精确渐变到与卡片底板材质一致的白色与深灰：
     ```css
     .fade-mask {
       position: absolute;
       bottom: 0;
       left: 0;
       right: 0;
       height: 100px;
       background: linear-gradient(to top, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%);
       pointer-events: none;
     }
     [data-theme='dark'] .fade-mask {
       background: linear-gradient(to top, rgba(28, 28, 30, 0.85) 0%, rgba(28, 28, 30, 0) 100%);
     }
     ```

## 步骤 2. 修改 `src/App.jsx`
1. 解决 Web Speech API 特征检测缺失：
   - 在详情页 `DetailView` 的上一景/下一景按钮 onClick 回调中（大约在原 182 行与 187 行的 `window.speechSynthesis.cancel()` 调用处），用严格的防守判断包裹：
     ```javascript
     if (typeof window !== 'undefined' && window.speechSynthesis) {
       window.speechSynthesis.cancel();
     }
     ```

## 步骤 3. 修改 `src/components/AudioGuide.jsx`
1. 查看文件内容，确认结构。
2. 在组件内最上方或 onClick 方法前，增加全局环境 API 特征检测：
   `const hasSpeech = typeof window !== 'undefined' && window.speechSynthesis && window.SpeechSynthesisUtterance;`
3. 修改 `useEffect` 的卸载清理，加上安全特征检测过滤：
   ```javascript
   return () => {
     if (hasSpeech) {
       window.speechSynthesis.cancel();
     }
   };
   ```
4. 在 `togglePlay` 回调中，首先检测 API：
   ```javascript
   if (!hasSpeech) {
     alert("您的浏览器不支持语音播报功能");
     return;
   }
   ```
   然后才执行 `window.speechSynthesis` 相关的播放 and 取消调用，彻底拦截不支持环境下的运行时 TypeError 崩溃。

## 步骤 4. 编译与 ESLint 校验
1. 运行 `npm run build` 和 `npm run lint` 验证项目。
2. 特别注意：**修改代码后，必须严格检查返回的 diff 结果；如果发现 diff 为空或修改未生效，必须重新读取文件并修复，绝不能在未验证确认的情况下告知用户代码已修改完毕。**

# 输出要求
在修复完成后，编写 `changes.md` 记录变更，编写 `handoff.md`（包含编译和 Lint 的校验结果）。完成后向 parent 发送消息并提供相关报告的绝对路径。
