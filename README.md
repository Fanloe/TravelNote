<p>
  <img src="https://img.shields.io/badge/TravelNote-green" alt="TravelNote"/>
  <img src="https://img.shields.io/badge/travelnote-1.0.0-blue" alt="travelnote1.0.0"/>
  <a target="_blank" href="https://github.com/qiuqik">
    <img src="https://img.shields.io/badge/Author-qiuqik-ff69b4" alt="qiuqik">
  </a>
  <a target="_blank" href="https://github.com/Fanloe">
    <img src="https://img.shields.io/badge/Author-Fanloe-5569b4" alt="Fanloe">
  </a>
  <a target="_blank" href="https://github.com/ShinowXD">
    <img src="https://img.shields.io/badge/Author-ShinowXD-77efb4" alt="ShinowXD">
  </a>
</p>

## 项目相关

### 项目介绍

**TravelNote**，旅游日志App和审核管理系统。目前项目托管在 Github 平台上中，欢迎大家 Star 和 Fork 支持~

旅游日志App和审核管理系统主要分为两个大模块：面向用户的旅游日志发布App项目和供管理员使用的PC站点。
旅游日志发布App提供用户注册、登陆、发布旅游日志、修改旅游日志、删除旅游日志。其中旅游日志包括标题、内容、图片的内容，用户新添加一个旅游日志时旅游日志的状态是未审核，此时只有用户可以查看自己的未审核日志。经PC站点的管理员审核后，日志就可以对所有用户可见，并在主页展示所有审核通过的日志。
审核管理系统提供了管理员注册、登录验证，审核所有未通过审核的日志，其中超级管理员另有权限删除未通过审核的日志。

### 项目目录

TravelNote
```
TravelNote 
├── /managementSystem/
│  ├── /public/
│  ├── /src/
│  └── package.json
├── /myapp/
│  ├── /public/
│  ├── /src/
│  └── package.json
├── /travel-note-server/
│  ├── /src/
│  └── package.json
├── package.json
└── README.md

```


### 项目文档

文档地址：[TravelNote](https://github.com/Fanloe/TravelNote)

### 项目地址

目前项目托管在 Github 平台上中，欢迎大家 Star 和 Fork 支持~

- Github：[TravelNote](https://github.com/Fanloe/TravelNote)


### 项目更新日志
[更新日志](https://github.com/Fanloe/TravelNote/pulse)

### 后端技术

| 技术             | 说明           | 版本      | 官网                                         |
|----------------|--------------|---------|--------------------------------------------|
| Nodejs     | 跨平台、开源的 JavaScript 运行环境 | v18.12.0   | [Nodejs](https://nodejs.org/en)     |
| MongoDB     | 面向文档的数据库管理系统 | v5.9.1   | [TODO](https://www.mongodb.com/zh-cn)     |

### 前端技术

| 技术     | 说明      | 版本     | 官网                 |
|--------|---------|--------|--------------------|
| React | 自由及开放源代码的前端JavaScript工具库 | v18.2.0 | [React](https://react.dev/) |
| Antd | 一套企业级UI设计语言和React组件库 | v5.0 | [Antd](https://ant-design.antgroup.com/index-cn/) |




## 参与贡献

开源项目离不开大家的支持，如果您有好的想法，遇到一些 **BUG** 并修复了，欢迎小伙伴们提交 **Pull Request** 参与开源贡献

1. **fork** 本仓库到自己的 **repo**
2. 将自己的 **repo** 项目 **clone** 到本地
3. 新建 **feat_xxx** 分支
4. 新增或者修改代码
5. **commit** 并 **push** 到自己的 **repo**
6. 新建 **PR** (**Pull Request**) 请求，提交到 develop 分支
7. 等待作者合并

## Git 贡献提交规范
- 参考 vue 规范 (Angular) 
  - 🆕 `feat` 增加新功能
  - 🐞 `fix` 修复问题/BUG
  - 🧽 `polish` 打磨功能，用优雅的方式改造功能
  - 📝 `docs` 文档/注释
  - 🎨 `style` 代码风格相关无影响运行结果的
  - 🧬 `refactor` 重构
  - 📈 `perf` 优化/性能提升
  - 🎬 `test` 测试相关
  - 🔙 `revert` 撤销修改
  - 〰 `workflow` 工作流改进
  - 🛠 `ci` 持续集成
  - 🆒 `chore` 依赖更新/脚手架配置修改等
  - 💱 `types` 类型定义文件更改

## 致谢

**TODO**起初参考了很多**开源项目**的**解决方案**，**开源不易，感谢分享**

- 感谢**TODO**的Vue后台管理模板：TODO

## 开源协议

1. [GPL 3.0(GNU General Public License Version 3)](https://www.gnu.org/licenses/gpl-3.0.txt)，GNU通⽤公共许可协议。GNU官⽅的定义：GNU is
   Not Unix
2. GPL 3.0协议第4条、第5条的规定，只要后续版本中有使⽤先前开源版本中的源代码，并且先前版本使⽤了GPL 3.0协议，则后续版本也必然受GPL 3.0协议的约束。
3. GPL 3.0协议并未限制⽤户进⾏商⽤，只是必须遵守开源的规定。GPL的精髓就是开源，和是否商⽤，是否收费完全没有关系。
4. GPL 其实从字⾯上就可以理解为公共许可证，也就是说遵循GPL的软件是公共的，其实不存在什么版权问题，或者说公众都有版权，GPL提出了和版权 （copyright）完全相反的概念（copyleft）。
