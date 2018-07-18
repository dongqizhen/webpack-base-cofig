[TOC]

# webpack v4.x 基本配置 

[官方文档](https://webpack.js.org) 

## 说明

> **webpack v4.x** 取消了原有的 ~~`CommonsChunkPlugin`~~ 插件所提供的chunk方法，取而代之的是 `optimization.splitChunks`,查看关于[splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/)的详细信息。

```js
    module.exports = {
        //...
        +   optimization: {
        +     splitChunks: {
        +       chunks: 'all'
        +     }
        +   }
        //...
    }
```

> **webpack v4.x** 新增了 [mode](https://webpack.js.org/concepts/mode/) 模块，以表示webpack所处的环境

```js
    module.exports = {
        //...
        +  mode:'production' // development 开发环境 //none
        //...
    }
```

> **webpack v4.x** 弱化了对 `ExtractTextWebpackPlugin`的支持，并且此插件也不再维护，而是转移到了 [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) 插件

```js
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const devMode = process.env.NODE_ENV !== 'production'

    module.exports = {
        plugins: [
            new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            })
        ],
        module: {
            rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
                ],
            }
            ]
        }
    }
```

## 用法

```
    git clone git@github.com:dongqizhen/webpack-base-cofig.git

    cd webpack-base-cofnfig

    npm i
```