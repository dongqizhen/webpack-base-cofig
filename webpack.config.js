/*
 * @Author: mikey.dongqizhen
 * @Date: 2018-04-17 16:43:52
 * @Last Modified by: mikey.dongqizhen
 * @Last Modified time: 2018-07-19 17:16:23
 */
const webpack = require("webpack");
const os = require('os');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动写入将引用写入html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 删除文件
const path = require('path');
const PurifyCssWebpack = require('purifycss-webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css代码
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackVersionPlugin = require('webpack-version-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require("happypack"); //HappyPack就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程

const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})

//const manifest = require('./build/vendor/react.manifest.json');
const env = process.env.NODE_ENV !== 'production'

const APP_PATH = path.resolve(__dirname, 'app');
const BUILD_PATH = path.resolve(__dirname, 'build')

module.exports = {
    entry: {
        main: path.resolve(APP_PATH, "main.js"),
        /* vendor: [
            'lodash', 'react', 'swiper', 'react-dom', 'react-router', 'react-router-dom', 'react-paginate', 'axios'
        ] */
    },
    output: {
        path: BUILD_PATH, //打包后的文件存放的地方
        //filename: "bundle-[hash].js", //打包后输出文件的文件名
        filename: env ? "[name]-bundle.[hash].js" : "[name]-bundle.[chunkhash].js", //打包后输出文件的文件名
        publicPath: "/"
    },
    devtool: env ? "eval-source-map" : false,
    mode: env ? 'development' : 'production',
    optimization: {
        splitChunks: {
            //minSize: 1,//块的最小值
            // chunks: "initial", //入口chunks
            // name: "vendor",
            cacheGroups: {
                styles: { //提取css/sass/scss到一个chunk文件
                    name: 'styles',
                    test: /\.scss|css|sass$/,
                    chunks: 'all',
                    enforce: true
                },
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2
                },
                vendors: { //import from node_modules 文件夹下的
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
                uglifyOptions: {
                    ie8: true
                }
            }),
            new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin 压缩css代码
        ],
        runtimeChunk: {
            name: 'runtime'
        }
    },
    devServer: {
        contentBase: BUILD_PATH, //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true, //模块热更新
        port: "8080", //设置端口号
        open: true, //自动拉起浏览器
        inline: true,
        quiet: false, //启用 quiet 后， 除了初始启动信息之外的任何内容都不会被打印到控制台。 这也意味着来自 webpack 的错误或警告在控制台不可见
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/, //一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                include: [APP_PATH], //指定检查的目录
                use: {
                    // loader: "babel-loader", //loader的名称（必须）
                    loader: 'happypack/loader?id=happy-babel-js'
                },
                exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/ //{include/exclude} 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
            },
            {
                test: /\.tsx?$/,
                include: [APP_PATH],
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        useBabel: true,
                        babelOptions: {
                            babelrc: false /* Important line */ ,
                            presets: ['react', 'stage-2', ['env', {
                                modules: false
                            }]], // 关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                            plugins: ['transform-runtime', 'react-hot-loader/babel']
                        }
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                        MiniCssExtractPlugin.loader, // replace ExtractTextPlugin.extract({..})
                        "css-loader?importLoaders=1",
                        'postcss-loader'
                    ]
                    /* ExtractTextPlugin.extract({
                                       fallback: "style-loader",
                                       use: [
                                           {
                                               loader: "css-loader",
                                               options: {
                                                   url: false,
                                                   minimize: true,
                                                   sourceMap: true,
                                                   modules: true, // 指定启用css modules
                                                   localIdentName: "[name]__[local]--[hash:base64:5]" // 指定css的类名格式
                                               }
                                           }, {
                                               loader: "postcss-loader"
                                           }
                                       ],
                                       publicPath:'../' //解决css背景图的路径问题
                                   }) */

            },
            {
                test: /\.(sass|scss)$/,
                use: env ? [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        'sass-loader'
                    ] : [
                        MiniCssExtractPlugin.loader,
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        'sass-loader'
                    ]
                    /* ExtractTextPlugin.extract({
                                       fallback: 'style-loader',
                                       //resolve-url-loader may be chained before sass-loader if necessary
                                       use: ['css-loader', 'sass-loader']
                                   }) */
                    /* env?[MiniCssExtractPlugin.loader,'css-loader?importLoaders=1','postcss-loader','sass-loader?sourceMap=true']:[MiniCssExtractPlugin.loader,
                     'css-loader?importLoaders=1',
                     {loader:"postcss-loader", options: { sourceMap: true }}, 
                     'sass-loader?sourceMap=true'] */
            },
            {
                test: /\.less$/,
                use: [
                    'css-hot-loader',
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: loader => [
                                PostcssPxtorem({
                                    rootValue: 100,
                                    propWhiteList: ['*']
                                }),
                                AutoPrefixer({
                                    browsers: ['last 2 versions', '> 1%', 'ie >= 8']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            //modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                use: ['url-loader']
            },
            {
                test: /\.(svg)$/i,
                use: ['svg-sprite-loader'],
                //include: svgDirs // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
            {
                test: /\.(png|jpg|gif)$/, // 处理图片
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        limit: 5000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: './assets/images' //图片打包出去的目录
                    }
                }]
            }
        ]
    },
    externals: {
        zepto: "Zepto"
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.scss', '.json'],
        alias: {
            commom: path.resolve(APP_PATH, 'components/common')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['build/*'], {
            // Absolute path to your webpack root folder (paths appended to this) Default:
            // root of your package
            root: __dirname,

            // Write logs to console.
            verbose: true,

            // Use boolean "true" to test/emulate delete. (will not remove files). Default:
            // false - remove files
            dry: false,

            // If true, remove files on recompile. Default: false
            watch: false,

            // Instead of removing whole path recursively, remove all path's content with
            // exclusion of provided immediate children. Good for not removing shared files
            // from build directories.
            exclude: [
                "files", "to", "ignore", "app", "package.json", ".babelrc", "/build/vendor/"
            ], //排除不删除的目录，主要用于避免删除公用的文件

            // allow the plugin to clean folders outside of the webpack root. Default: false
            // - don't allow clean folder outside of the webpack root
            allowExternal: false,

            // perform clean just before files are emitted to the output dir Default: false
            beforeEmit: true
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HashedModuleIdsPlugin(), //vendor chunk 的 hash 不改变
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: env ? 'css/[name].css' : 'css/[name].[chunkhash].css',
            chunkFilename: 'css/[name].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({ //这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）
            filename: 'index.html', //定义生成的页面的名称
            template: __dirname + "/app/index.html", //new 一个这个插件的实例，并传入相关的参数
            title: "这里是设置HTML title",
            minify: {
                collapseWhitespace: true //压缩html空白代码
            }
        }),

        new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID

        /*  new PurifyCssWebpack({ // 消除冗余css代码
             paths: glob.sync(path.join(__dirname, 'app/*.html')) //path.join合并路径
         }), */

        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            tslint: path.resolve(__dirname, 'tslint.json'),
            watch: ['./app/**/*.tsx'],
            ignoreLints: ['no-console', 'object-literal-sort-keys', 'quotemark']
        }),
        new WebpackVersionPlugin({
            cb: (hashMap) => {
                console.log(hashMap);
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 3.0新功能 范围提升 （Scope Hoisting ）,作用域提升，这是在webpack3中所提出来的。它会使代码体积更小，因为函数申明语句会产生大量代码.
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]), // 忽略掉 d.ts 文件，避免因为编译生成 d.ts 文件导致又重新检查。
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([{ // 静态文件输出 也就是复制粘贴
            from: path.resolve(__dirname, 'app/assets'), //将哪里的文件
            to: './assets' // 复制到哪里
        }]),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/vendor/*.dll.js')
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        /* new webpack.DllReferencePlugin({
            context: __dirname,
            manifest,
            extensions: ['.js', '.jsx']
        }), */
        new HappyPack({
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        })
    ]

}


if (env) {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(), //热加载插件
    ]);
}