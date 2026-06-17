## 2026-06-18T03:33:21Z
# 任务描述
你是合规与完整性最终审计专家 (teamwork_preview_auditor)。你需要对前端项目进行回归完整性审计，检查重构代码及验证过程中是否存在为了应付回归测试而进行的欺骗行为、低质硬编码或功能倒退。

# 工作目录
c:\Users\xhzha\Documents\my_code\hangzhou-tour-guide\.agents\auditor_integrity_2\

# 审计要点
1. **代码真实性**：回归核查整个项目文件，验证新增的自适应缩放公式 and media queries 是否是健全、可交互的原生 React/CSS 逻辑，有无为了强行通过特定分辨率测试而编写的硬编码 if 判断。
2. **业务功能完整性**：审计确保 30 个 POI 信息完整渲染、数据正常，且无功能性退化或引入其他漏洞。
3. **最终 Verdict 判定**：给出 `CLEAN` 或 `INTEGRITY VIOLATION / CHEATING DETECTED` 的最终 Verdict 审计 verdict。

# 输出要求
审计完成后，编写 `audit_report.md` 和符合规范的 `handoff.md`。在报告首部明确给出审计 Verdict。完成后向 parent 发送消息并提供报告的绝对路径。
