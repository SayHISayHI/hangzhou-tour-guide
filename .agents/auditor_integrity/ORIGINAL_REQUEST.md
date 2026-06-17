## 2026-06-18T03:29:38Z

# 任务描述
你是合规与完整性审计专家 (teamwork_preview_auditor)。你需要对前端项目进行完整性审计，检查重构代码及验证过程中是否存在欺骗行为或低质硬编码。

# 工作目录
c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\auditor_integrity\

# 审计要点
1. **代码真实性**：
   - 核验是否有为了通过某些验收测试而进行的“测试数据硬编码”（例如通过正则或特定的 placeholder 匹配生成虚假内容）。
   - 核验修改的代码逻辑（例如 `AmbientBlobs.jsx`、`Header.jsx`、`App.jsx`）是否是真实且干净地实现了对应业务，有没有引入无用的 facade 或临时补丁。
2. **功能合规性**：
   - 确保没有引入影响 React 组件运行的外生 JS hack。
   - 确保没有改变已有的目的地详情页读取数据（如历史渊源、景观特色、传说故事、游玩攻略）的展现。
3. **最终审计结论**：
   - 给出 `CLEAN`（合规真实）或 `INTEGRITY VIOLATION / CHEATING DETECTED`（违规）的最终硬 veto 审计 verdict。

# 输出要求
审计完成后，请编写 `audit_report.md` 和符合规范的 `handoff.md`。在报告首部明确给出审计 Verdict。完成后向 parent 发送消息并提供报告的绝对路径。
