Тут має бути proxy.conf.json - щоб обійти корс
Ось його вміст

```json
{
  "/api/*": {
    "target": "{{url}}",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```
