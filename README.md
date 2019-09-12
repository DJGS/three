# three 练习

## 目录结构说明

```js
| -- dist                           # 存放 webpack 打包生成的文件
| -- node_modules                   # node.js 模块包文件夹
| -- public                         # 模版文件不需要更改
| -- release                        # webpack 构建出得 zip 包
| -- src                            # 项目源码，开发目录
|    | -- assets                    # 静态资源文件
|    | -- components                # 通用组件
|    | -- languages                 # 多语言字典文件
|    | -- pages                     # 页面视图
|    | -- plugins                   # 依赖包文件
|    | -- routers                   # 路由配置
|    | -- services                  # service 文件
|    | -- utils                     # 工具函数
|    | -- App.vue                   # Vue 入口文件
|    | -- main.js                   # vue js 入口文件
| -- CHANGELOG.md                   # 项目迭代记录
| -- .editorconfig                  # 编辑器配置
| -- .eslintignore                  # eslint 忽略文件
| -- .eslintrc                      # eslint 配置文件
| -- .prettierrc.json               # prettierrc 配置文件
| -- babel.config.js                # bable 配置文件
| -- vue.config.js                  # vueCli 配置文件
| -- README.md                      # 项目说明文件
| -- package.json                   # 项目依赖说明
| ── yarn.lock
```

## 运行环境

```js
    node 8.10.0 +
    yarn 1.12.3 +
    prettier 编辑器安装插件用于自动化格式代码
```

## 安装依赖

```bash
yarn
```

### 启动开发环境

```bash
yarn start
```

### 打包构建

```bash
yarn build
```
