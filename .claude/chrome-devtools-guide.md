# Chrome DevTools 优化使用指南

## 问题
Chrome DevTools MCP 工具会产生大量上下文，导致频繁触发 compact。

## 优化策略

### 1. 页面检查优化
```
❌ 避免：直接使用 take_snapshot（会返回整个页面树）
✅ 推荐：
  - 先用 take_screenshot 查看页面视觉效果
  - 只在需要交互时使用 take_snapshot
  - 使用 filePath 参数将快照保存到文件
```

### 2. 网络请求优化
```
❌ 避免：list_network_requests 不带参数（返回所有请求）
✅ 推荐：
  - 使用 pageSize: 20 限制返回数量
  - 使用 resourceTypes 过滤：["xhr", "fetch", "document"]
  - 分页查看：pageIdx: 0, 1, 2...
```

### 3. 控制台消息优化
```
❌ 避免：list_console_messages 不带参数
✅ 推荐：
  - 使用 pageSize: 10
  - 使用 types 过滤：["error", "warn"]
  - 只在需要时查看详细消息
```

### 4. 脚本执行优化
```
✅ 推荐：使用 evaluate_script 直接获取需要的信息
例如：
- 获取特定元素：document.querySelector('.class').innerText
- 获取页面数据：window.__DATA__
- 检查状态：document.readyState
```

### 5. 元素交互优化
```
✅ 推荐流程：
1. take_screenshot 查看页面
2. 如需交互，take_snapshot 但保存到文件
3. 从文件中找到目标元素的 uid
4. 执行 click/fill 等操作
5. 再次 screenshot 确认结果
```

## 调试模式

### 模式 A：快速视觉检查
1. navigate_page
2. take_screenshot
3. 分析截图

### 模式 B：错误排查
1. navigate_page
2. list_console_messages (types: ["error"], pageSize: 10)
3. 分析错误

### 模式 C：网络问题排查
1. navigate_page
2. list_network_requests (resourceTypes: ["xhr", "fetch"], pageSize: 20)
3. get_network_request 查看具体请求

### 模式 D：交互测试
1. take_screenshot
2. take_snapshot (filePath: "./temp-snapshot.txt")
3. 读取文件找 uid
4. 执行交互操作
5. take_screenshot 确认

### 模式 E：性能分析
1. performance_start_trace (reload: true, autoStop: true)
2. 等待完成
3. 分析 Core Web Vitals

## 最佳实践

1. **能用 screenshot 就不用 snapshot**
2. **能用 evaluate_script 就不用 snapshot**
3. **始终使用分页和过滤参数**
4. **将大数据保存到文件而不是返回到对话**
5. **定期使用 /clear 清理对话历史**

## 示例工作流

### 调试前端页面加载问题
```
1. navigate_page to URL
2. take_screenshot 查看页面状态
3. list_console_messages (types: ["error", "warn"], pageSize: 5)
4. 如有错误，get_console_message 查看详情
5. list_network_requests (resourceTypes: ["document", "script"], pageSize: 10)
6. 分析失败的请求
```

### 测试表单提交
```
1. navigate_page to form page
2. take_screenshot 确认页面加载
3. take_snapshot (filePath: "./snapshot.txt")
4. 读取 snapshot.txt 找到表单元素 uid
5. fill_form 填写表单
6. click 提交按钮
7. take_screenshot 查看结果
8. list_console_messages 检查错误
```
