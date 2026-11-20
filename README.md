# 泰能官网运行时配置

下载产品名称、下载地址、Demo 按钮和培训视频接口统一保存在 `public/site-config.json`。
页面打开时通过 HTTP 请求读取该文件，配置不会打进 JS 包。

申请试用为独立页面：`/trial`。部署到 Nginx / Apache / Netlify 等静态主机时，请把未知路径回退到 `index.html`（仓库已提供 `public/_redirects` 与 `public/.htaccess`）。

## 首次部署

运行 `npm run build`，将整个 `dist/` 部署到静态网站服务器。
确认 `site-config.json` 与 `index.html` 在同一目录，且能通过浏览器访问。

## 上线后修改（无需重新打包）

直接编辑服务器部署目录里的 `site-config.json`：

- `demo.label`：立即体验按钮文字，默认“立即体验”。
- `demo.entries`：演示入口列表，每项含 `name`、`url`（如 PMS / POS / 会员）。
- `demo.openInNewTab`：`true` 打开新标签页，`false` 在当前页打开。
- `trial.to`：申请试用表单收件邮箱。
- `trial.subject`：申请试用邮件标题。
- `trial.qqGroup`：产品交流群。`name` 为群名称，`number` 为群号，`image` 为二维码图片，可写成相对于 JSON 的路径，例如 `./qq-group.jpg`。三项都留空时，试用页不展示加群卡片。更换二维码时，替换 `public/qq-group.jpg` 后刷新即可。
- `downloads`：下载列表，可以增加、删除、调整顺序；每项的 `name` 必须唯一，`url` 为下载地址。二维码随地址生成。
- `trainingVideos.topicsUrl` / `subFlowsUrl`：培训主题、视频列表接口地址。
- `trainingVideos.moduleId`：视频业务模块。

保存为 UTF-8 标准 JSON（双引号，不支持注释或末尾逗号），然后刷新页面即可。
已打开的页面不会自动轮询，需要刷新才能加载新配置。
地址支持 HTTP、HTTPS，也支持相对于 JSON 文件的路径，例如 `./downloads/client.exe`。
改变接口地址时，接口仍需支持网站的跨域请求及现有的请求、响应格式。

请求使用 `cache: no-store` 并附带时间戳。若使用 CDN 或反向代理，请对
`site-config.json` 禁用缓存（建议响应头 `Cache-Control: no-store`），避免忽略查询参数的缓存规则返回旧文件。
JSON 缺失、格式错误或超过 8 秒未响应时，官网仍展示静态内容，并提示配置加载失败。

配置是公开文件，请仅放公开地址和展示信息。
将线上修改同步回 `public/site-config.json`，以免下次发布时被源码中的旧配置覆盖。

## 申请试用邮件

官网是静态站点，申请试用通过 [FormSubmit](https://formsubmit.co/) 转发到 `trial.to`。

首次正式提交前，请先自己填一次表单。FormSubmit 会向该邮箱发送一封激活确认信，点击确认后，后续申请才会自动转发到你的邮箱。若迟迟收不到激活信，请检查垃圾箱，或更换邮箱后重试。

## 验证

运行 `node --test test/site-config.test.js` 检查配置加载与校验，运行 `npm run build` 构建发布文件。
