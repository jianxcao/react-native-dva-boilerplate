# 前端开发说明
> 框架采用react-native react-navigation dva技术

## 开发中注意事项
- @表示src目录，快速选择目录可以直接 @/目录文件
- 支持多语言，语言包在locales中，采用react-intl

## 数据缓存相关
- 数据存储请直接使用 @/commone/js/ls. [react-native-storage](https://github.com/sunnylqm/react-native-storage/blob/HEAD/README.zh-CN.md)
- global.storage 也可以获取storage对象然后去操作缓存
- **注意在RN中数据的读取和写入均为异步，请用async，与前端页面不相同**
