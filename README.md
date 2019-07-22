# 租赁系统原型

### 项目简介
本系统为中创软件公司租赁系统的原型，旨在实现一个可以通过合同schema编辑合同模版，并依据合同模版和表单数据生成合同文件的demo系统。

### 技术选型

#### 前端
* 语言：JavaScript
* JavaScript框架：React
* 设计解决方案：Ant Design Pro
* 脚手架：Umijs
* 数据流：Dvajs
* 组件库：Ant Design
#### 后端
* 语言： Java
* Java框架：Spring Boot

### 本地构建
#### 前端
```
cd client
yarn
yarn start
```
或
```
cd client
npm install
npm start
```
建议使用国内镜像并使用[tyarn](https://umijs.org/zh/guide/getting-started.html#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87)或[cnpm](https://npm.taobao.org/)工具。
#### 后端

MacOS下
```
cd server
docker-compose up -d
mvn spring-boot:run
```
然后可以直接用curl或postman工具访问后端服务，例如：

```
curl http://localhost:8000/api/contracts
```

Windows平台建议使用Windows 10的Subsystem for Linux安装并运行docker，其他跟macOS应该是一样的。

### 本地构建

### 领域模型

### 测试策略

### 技术架构

### 部署架构

### 编码实践

### FAQ


### 注意事项

* 开发者请fork本仓库到个人账户下，clone个人账户下的仓库到本地并进行开发
* 修改请push到个人仓库的dev分支，创建pull request到本仓库的dev分支
* 请勿直接push到本仓库！请勿直接创建pull request到master分支！


### 相关参考资料

#### Git

请一定先阅读并学习[git相关知识](https://www.liaoxuefeng.com/wiki/896043488029600)

#### 项目使用Maven管理构建

* [Maven](https://maven.apache.org/guides/index.html)

#### 相关Spring技术文档

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Accessing Data with MongoDB](https://spring.io/guides/gs/accessing-data-mongodb/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
