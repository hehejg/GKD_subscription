# GKD 自用订阅开发与维护指南 (AI / Agent Developer Guide)

> **致未来的 AI 协作者 / 维护者**：  
> 本项目是用户（@hehejg）个人的 **GKD（Android 屏幕点击/跳广告工具）自定义规则订阅仓库**。  
> 请在接手本项目的任务时仔细阅读本指南，遵循既定的工程架构与设计哲学。

---

## 1. 核心设计哲学

1. **轻量自用，绝不无脑膨胀**：
   - 本项目 Fork 自 `@AIsouler/GKD_subscription`，原作者停更的原因就是因为全网 App 膨胀导致规则数兆、手机卡顿发热且排查困难。
   - **核心原则**：`src/apps/` 下**只保留用户日常使用的 App（当前主要为：哔哩哔哩、微信等）**，单个应用规则保持精简高效。
2. **备份优先，按需拉取**：
   - 根目录下有 `apps_backup/` 文件夹（已被 `.gitignore` 忽略），内含 880+ 款主流 App 的历史规则模板。
   - **当用户需要添加新 App 时**：优先去 `apps_backup/` 搜索对应包名 `.ts`，复制回 `src/apps/` 并精简改造，不需要从零手写。

---

## 2. 目录结构与关键文件

```text
GKD_subscription/
├── src/
│   ├── apps/                 # 【核心活跃目录】当前生效的应用规则（每个 App 一个 .ts 文件）
│   │   ├── tv.danmaku.bili.ts     # 哔哩哔哩规则
│   │   └── com.tencent.mm.ts      # 微信规则（包含微信小程序开屏广告跳过等）
│   ├── subscription.ts       # 订阅入口元数据（定义订阅 id, name, author, supportUri 等）
│   ├── globalDefaultApps.ts  # 全局黑名单与白名单配置（如微信默认在全局黑名单中）
│   ├── globalGroups.ts       # 全局通用规则（全局开屏跳过、更新提示等）
│   └── categories.ts         # 规则分类定义（开屏广告默认启用，其余默认关闭）
├── apps_backup/              # 【规则冷库】880+ 款 App 历史规则备份，随时供检索复用
├── dist/                     # 【打包产物目录】
│   ├── AIsouler_gkd.json5    # 最终分发给 GKD 手机客户端的订阅文件（核心产物）
│   ├── AIsouler_gkd.version.json5 # 客户端检查更新的版本记录
│   └── README.md             # 自动生成的当前已适配应用与规则统计
├── scripts/                  # 工程构建脚本 (check.ts, build.ts, updateReadMeMd.ts)
├── Template.md               # 根目录 README.md 的模版文件（build.ts 会用其覆写 README.md）
├── AGENTS.md                 # 本开发指南文档
└── package.json              # 依赖与脚本（基于 Node >= 22, pnpm, TypeScript）
```

---

## 3. 标准开发流与常用命令

### 常用命令
```powershell
# 1. 安装依赖 (使用 pnpm)
pnpm install

# 2. 规则合法性与类型检查
pnpm run check

# 3. 编译打包生成 dist 文件（同时自动递增版本号并更新 README）
pnpm run build

# 4. 代码格式化与 Lint
pnpm run format
pnpm run lint
```

### 每次更新规则后的必执行闭环：
1. 修改/新增 `src/apps/<appId>.ts`；
2. 运行 `pnpm run build` 打包；
3. Git 提交并推送到远端：
   ```powershell
   git add .
   git commit -m "feat(appId): description"
   git push origin main
   ```
4. **清除 jsDelivr CDN 缓存**（关键步骤，防止手机端因 CDN 缓存拿不到最新版）：
   ```powershell
   curl.exe -s "https://purge.jsdelivr.net/gh/hehejg/GKD_subscription@main/dist/AIsouler_gkd.json5"
   ```

---

## 4. AI 常见任务处理规范 (Playbook)

### 场景 A：用户发来广告截图 / GKD 快照 ZIP / 快照链接，要求“跳过广告”

1. **解析快照**：
   - 提取 `appId`（如 `com.tencent.mm`）、`activityId`（如 `com.tencent.mm.plugin.appbrand.ui.AppBrandUI00`）；
   - 定位跳过按钮节点属性（如 `text: "跳过"`, `vid`, `clickable`, `visibleToUser`, 尺寸 `bounds`）。
2. **编写/更新规则**：
   - 检查 `src/apps/<appId>.ts` 是否已存在：
     - 若不存在，先看 `apps_backup/<appId>.ts` 是否有现成骨架可供提取。
   - **选择器编写要点**：
     - **快速查询优先**：尽量加 `fastQuery: true`，且选择器只包含能加速的属性（如 `[vid="..."]` 或 `[text="..."]`）；
     - **防误触双重判定**：对于微信等综合类应用，建议采用双重匹配，例如同时匹配 `[text="广告"]` 与 `[text*="跳过"]`；
     - **小程序开屏特殊性**：微信小程序 Activity 具有多进程后缀（如 `AppBrandUI00`），需注意通配或列举；且应保留 `actionDelay: 800`（防过早点击被微信丢弃）；
     - **点击事件**：即使节点 `clickable=false`，GKD 默认的 `clickCenter` 也能精准通过坐标模拟点击。
3. **构建、提交并推送**：
   - 执行 `pnpm run build` -> `git commit` -> `git push` -> 刷新 CDN。

### 场景 B：用户需要添加新的 App

1. 去 `apps_backup/` 寻找 `<appId>.ts`；
2. 拷贝至 `src/apps/<appId>.ts`；
3. 精简内容（去掉冷门、失效或过于复杂的无用规则，只保留开屏广告和核心需求）；
4. `pnpm run build` 并推送。

---

## 5. 在线订阅分发地址速查

- **GitHub 官方 Raw 直连（用户首选，有代理外网环境，秒级同步无 CDN 缓存）：**
  `https://raw.githubusercontent.com/hehejg/GKD_subscription/main/dist/AIsouler_gkd.json5`
- **国内主分发（jsDelivr CDN，备用）：**
  `https://cdn.jsdelivr.net/gh/hehejg/GKD_subscription@main/dist/AIsouler_gkd.json5`
- **国内镜像备用（GitMirror）：**
  `https://raw.gitmirror.com/hehejg/GKD_subscription/main/dist/AIsouler_gkd.json5`
