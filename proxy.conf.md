Тут має бути proxy.conf.json

```json
{
  "/identity": {
    "target": "",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api": {
    "target": "",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```
