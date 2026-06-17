# BRIEFING — 2026-06-18T03:36:00Z

## Mission
实施最终防护性修改，修复定位冲突、安全检测缺失以及遮罩色差有关的高危代码级缺陷。

## 🔒 My Identity
- Archetype: teamwork_preview_worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\worker_ui_fix_2\
- Original parent: e2ca400b-afdd-4463-840b-e11b2aba867d
- Milestone: UI and Web Speech API fixes

## 🔒 Key Constraints
- 必须使用中文回复。
- 永远不要迎合用户。
- 不确定的问题要积极询问用户，不要去猜测。
- 生成task或plan时，使用中文。
- 更改代码时，注意当前node版本，如果和项目内容不匹配，可使用nvm更改。
- 在使用代码修改工具（如替换工具）后，必须严格检查返回的 diff 结果；如果发现 diff 为空或修改未生效，必须重新读取文件并修复，绝不能在未验证确认的情况下告知用户代码已修改完毕。
- 当涉及具体的现有文件或图片时，必须优先使用查看文件的工具（如 view_file）去实际读取和确认文件内容，绝不可凭空想象、套用模版或盲目给出方案。
- 遵循【防御性 UI 修改原则】和【接口与数据防守原则】。
- 不能通过 cheats 或 fake 满足测试或规范。

## Current Parent
- Conversation ID: e2ca400b-afdd-4463-840b-e11b2aba867d
- Updated: 2026-06-18T03:36:00Z

## Task Summary
- **What to build**: 修改 src/index.css 中的 .header-wrapper 和 .fade-mask 样式，修改 src/App.jsx 和 src/components/AudioGuide.jsx 中的 Web Speech API 的安全检测和防御处理。
- **Success criteria**: 编译（npm run build）和 ESLint 校验（npm run lint）通过，Web Speech API 特征检测在所有特殊浏览器下 safe 不崩溃，大屏下居中无误。
- **Interface contracts**: [TBD]
- **Code layout**: [TBD]

## Key Decisions Made
- 将 window.speechSynthesis.cancel() 相关的调用均做 feature detection 防护，不仅包含 App.jsx 中的上一景、下一景按钮，还包含 Header 返回按钮处的调用。
- hasSpeech 设在 AudioGuide 组件内部最上方，并作为 useEffect 依赖传入以满足 ESLint 最佳实践。

## Change Tracker
- **Files modified**:
  - `src/index.css` (物理居中 Header 与 fade-mask 渐变)
  - `src/App.jsx` (DetailView 切换景点的语音取消安全判断)
  - `src/components/AudioGuide.jsx` (组件内部 speech 特征检测，卸载清理与 togglePlay 前置拦截)
- **Build status**: Pass
- **Pending issues**: None

## Quality Status
- **Build/test result**: npm run build passed, npm run lint passed
- **Lint status**: 0 violations
- **Tests added/modified**: None (no test suite in project)

## Loaded Skills
- None

## Artifact Index
- c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\worker_ui_fix_2\ORIGINAL_REQUEST.md — Original User Request
- c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\worker_ui_fix_2\BRIEFING.md — Briefing file
