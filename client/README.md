# 开发手册-前端
使用ant-design-pro框架，具体规约如下：
* routes：路由不进行额外配置，使用antdpro默认配置，pages下路径即路由
* pages：组织页面文件，按页面在pages下新建子目录，并在子目录下配置index.js作为页面入口，例如localhost:8080/template对应的页面是pages/template/index.js
* model：model层文件按照后台资源划分，例如存储文件资源的model可以命名为file.js
* css：css统一使用less文件，jsx页面使用的css与jsx相同命名并保存在同一目录下，例如index.jsx的css文件命名为index.less且与index.js在同一目录
