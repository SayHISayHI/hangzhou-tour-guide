# BRIEFING — 2026-06-18T11:31:00+08:00

## Mission
审查重构后代码的正确性、可维护性、构建状态，并重点核验是否遵守“防御性 UI 修改原则”和“接口与数据防守原则”。

## 🔒 My Identity
- Archetype: teamwork_preview_reviewer
- Roles: reviewer, critic
- Working directory: c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\reviewer_code\
- Original parent: e2ca400b-afdd-4463-840b-e11b2aba867d
- Milestone: review_refactoring
- Instance: 1 of 1

## 🔒 Key Constraints
- Review-only — do NOT modify implementation code
- 使用中文回复。
- 永远不要迎合用户。
- 不确定的问题要积极询问用户，不要去猜测。
- 生成task或plan时，使用中文。
- 更改代码时，注意当前node版本，如果和项目内容不匹配，可使用nvm更改。
- 在使用代码修改工具（如替换工具）后，必须严格检查返回的 diff 结果；如果发现 diff 为空或修改未生效，必须重新读取文件并修复，绝不能在未验证确认的情况下告知用户代码已修改完毕。
- 当涉及具体的现有文件或图片（无论是要求修改代码还是提供 UI/图像处理建议）时，必须优先使用查看文件的工具（如 view_file）去实际读取和确认文件内容，绝不可凭空想象、套用模版或盲目给出方案。
- 【防御性 UI 修改原则】在处理复杂的 CSS 结构（尤其是涉及 transform、clip-path、z-index 叠加、绝对定位等相互关联的几何样式）时，严禁“头痛医头、脚痛医脚”。
   - 在修改前，必须在思考过程中列出“副作用检查清单”（如：修改 A 是否会影响 B 的边框？是否会改变 C 的实际占位？是否会导致渐变/阴影断裂？）。
   - 在提交修改方案时，如果方案涉及高风险的覆盖/裁剪逻辑，必须向用户清晰阐述几何推演过程，并主动提示可能出现的视觉盲区。
   - If 连续两次修改都出现“修复一个Bug引发另一个Bug”的视觉问题，必须立刻停止堆砌补丁代码，推翻当前方案，退回到最简结构重新设计。
- 【接口与数据防守原则】在处理接口对接与状态校验时，绝不凭空推断，且必须严防底层语法陷阱。
   - 绝不允许仅凭同项目其他老代码去推断新接口的URL and 入参字段，必须严格索要并遵循最新的后端接口文档。
   - 严禁使用松散的真值判断（如 `if(result.xxx)`）来判定接口或原生端执行成功。必须警惕 JavaScript 中的空数组 `[]` 等“假成功”陷阱，对数组必须强制校验 `Array.isArray(x) && x.length > 0`，对成功状态必须严格校验特定标识（如 `result.status === 'success'`）。

## Current Parent
- Conversation ID: e2ca400b-afdd-4463-840b-e11b2aba867d
- Updated: 2026-06-18T11:31:00+08:00

## Review Scope
- **Files to review**: src/App.jsx, src/components/Header.jsx, src/components/AmbientBlobs.jsx, src/components/AudioGuide.jsx, src/components/ExpandableText.jsx, src/index.css, eslint.config.js
- **Interface contracts**: PROJECT.md
- **Review criteria**: correctness, style, conformance

## Key Decisions Made
- 针对重构后的代码，对构建状态、数据校验与防御性 UI 属性进行了全覆盖审查，判断其完全符合规范。
- 最终审查裁决设为 APPROVE，并输出 `review_report.md` 与 `handoff.md`。

## Artifact Index
- c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\reviewer_code\review_report.md — 详细的代码审查与压力测试报告
- c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\reviewer_code\handoff.md — Handoff 报告

## Review Checklist
- **Items reviewed**: npm run build, npm run lint, verify_data.js, AmbientBlobs, geometry rounded corners, detail-panel padding and center alignment.
- **Verdict**: APPROVE
- **Unverified claims**: 无

## Attack Surface
- **Hypotheses tested**: 极端字号（1.5倍）下卡片容器高度溢出问题；字号滑块弹窗的 z-index 遮挡与边界溢出问题；SpeechSynthesis API 在特定无音频设备/不支持设备下的崩溃风险。
- **Vulnerabilities found**: 发现 SpeechSynthesis 未做特性检测的安全隐患（属于既有遗留代码，非本次重构引入，已在报告中提出防御方案）。
- **Untested angles**: 屏幕阅读器等无障碍设备（A11y）兼容性。
