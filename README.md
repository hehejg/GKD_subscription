# hehejg的GKD自用订阅

本项目是专为个人定制的轻量化 **GKD（Android 屏幕点击/跳广告工具）** 订阅规则仓库。  
基于社区优秀开源规则精简重构，只保留日常高频使用的应用规则（如哔哩哔哩、微信小程序等），确保运行效率高、响应极快、省电且无冗余。

---

## 📱 手机端订阅链接

在手机 GKD App -> **订阅** -> 点击右上角 **`+`** 号导入下方任意一条链接即可：

### 🌟 国内首选推荐（jsDelivr CDN 全球加速，免代理直连）：
```txt
https://cdn.jsdelivr.net/gh/hehejg/GKD_subscription@main/dist/AIsouler_gkd.json5
```

### 备用高速镜像（GitMirror）：
```txt
https://raw.gitmirror.com/hehejg/GKD_subscription/main/dist/AIsouler_gkd.json5
```

### GitHub 官方直连（需代理）：
```txt
https://raw.githubusercontent.com/hehejg/GKD_subscription/main/dist/AIsouler_gkd.json5
```

---

## 📊 当前订阅状态

- **当前版本**：v411
- **规则规模**：当前精简版已适配 **2** 个核心应用，共有 **51** 个应用规则组，**3** 个全局规则组。
- **已适配应用清单**：查看 [当前适配应用与规则详情](./dist/README.md)

---

## 🛠️ 项目维护与 AI 协作规范

本项目配备了完善的工程流与开发指南，方便人类开发者与 AI Agent 协作维护：

- **🤖 AI / Agent 开发与接手指南**：请阅读 [AGENTS.md](./AGENTS.md)（内含目录架构、AI 快照分析、规则编写与更新闭环说明）。
- **📚 通用选择器参考**：参考 [Selectors.md](./Selectors.md)。
- **📦 历史规则备份库**：根目录下的 `apps_backup/` 包含 880+ 款主流应用的历史规则模板，需要新增应用时可直接从中检索提取。

### 常用命令
```powershell
pnpm install     # 安装依赖
pnpm run check   # 规则语法与类型检查
pnpm run build   # 编译打包订阅文件（自动更新版本号与文档）
```
