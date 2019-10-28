# 前端开发说明

## 开发中注意事项
- `console.error`,如果有这个，会认为代码有错误，在正式环境会导致app奔溃，如果是日志输出用console.log或者console.info,有错误必须catch并解决

## 数据缓存相关
- 数据存储请直接使用 @/commone/js/ls. [react-native-storage](https://github.com/sunnylqm/react-native-storage/blob/HEAD/README.zh-CN.md)
- global.storage 也可以获取storage对象然后去操作缓存
- **注意在RN中数据的读取和写入均为异步，请用async，与前端页面不相同**



