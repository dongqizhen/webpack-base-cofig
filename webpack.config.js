const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PostcssPxtorem = require('postcss-pxtorem');
const AutoPrefixer = require('autoprefixer'); // eslint-disable-line
const WebpackVersionPlugin = require('webpack-version-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css代码
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 删除文件
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const svgDirs = [
    path.resolve(__dirname, 'src/my-project-svg-foler') // 自己私人的 svg 存放目录
];

const env = process.env.NODE_ENV === 'production';
//const manifest = require('./build/vendor/react.manifest.json');
const { theme } = require('./package.json');

module.exports = {
    entry: {
        main: __dirname + '/app/main.js',
        vendor: [
            'lodash', 'react', 'swiper', 'react-dom', 'react-router', 'react-router-dom', 'react-paginate', 'axios'
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"), //打包后的文件存放的地方
        filename: "bundle-[hash].js", //打包后输出文件的文件名
        publicPath: "/"
    },
    mode: env ? 'production' : 'development',
    devtool: env ? false : 'cheap-module-eval-source-map',
    devServer: {
        publicPath: '/',
        contentBase: BUILD_PATH,
        historyApiFallback: true,
        hot: true,
        open: true,
        inline: true,
        port: 8080,
        host: 'localhost',
        openPage: '',
        proxy: {},
        quiet: true,
        compress: true // 开发服务器是否启动gzip等压缩
            /*  https: {
              key: fs.readFileSync('/path/to/server.key'),
              cert: fs.readFileSync('/path/to/server.crt'),
              ca: fs.readFileSync('/path/to/ca.pem')
            } */
    },
    optimization: {
        splitChunks: {
            //minSize: 1,//块的最小值
            chunks: "initial", //入口chunks
            name: "vendor",
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.scss|css|sass$/,
                    chunks: 'all',
                    enforce: true
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
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
        runtimeChunk: 'single'
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/, // 用babel编译jsx和es6
                include: [path.resolve(__dirname, 'app')], // 指定检查的目录
                exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/, //{include/exclude} 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader',
                /* options: {
                    cacheDirectory: true,
                    presets: ['react', 'stage-2', ['env', { modules: false }]],
                    // modules关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'react-hot-loader/babel']
                } */
            }, {
                test: /\.(sass|scss)$/,
                // css-hot-loader会增加打包的体积
                use: env ? [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1', 'postcss-loader'] : [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        'sass-loader'
                    ]
                    /*  use: ExtractTextPlugin.extract({
                      fallback: 'style-loader',
                      use: ['css-hot-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                    }) */
            }, {
                test: /\.less$/,
                use: [
                    'css-hot-loader',
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
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
                    { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } }
                ]
            },
            {
                test: /\.css$/,
                include: [path.resolve('app')],
                use: ['css-hot-loader', 'style-loader', 'css-loader', 'postcss-loader']
            },
            /* {
                test: /(\.jsx|\.js)$/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader',
                    options: { fix: true }
                }],
                include: [path.resolve(__dirname, 'app')], // 指定检查的目录
                exclude: /node_modules/
            }, */


            {
                test: /\.tsx?$/, // 用babel编译jsx和es6
                include: [path.resolve(__dirname, 'src')], // 指定检查的目录
                exclude: /node_modules/,
                use: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            useBabel: true,
                            babelOptions: {
                                babelrc: false /* Important line */ ,
                                presets: ['react', 'stage-2', ['env', { modules: false }]], // 关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                                plugins: ['transform-runtime', 'react-hot-loader/babel']
                            }
                        }
                    }]
                    /*         use: [
                      'cache-loader',
                      'thread-loader',
                      {
                        loader: 'babel-loader',
                        options: {
                          cacheDirectory: true,
                          presets:["react", "stage-2", ["env", { "modules": false }]],//关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                          plugins: ['transform-runtime', 'react-hot-loader/babel']
                        }
                      },
                      {
                        loader: 'ts-loader',
                        options: {
                          happyPackMode: true,
                          transpileOnly: true
                        }
                      }
                    ] */
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                use: ['url-loader']
            },
            {
                test: /\.(svg)$/i,
                use: ['svg-sprite-loader'],
                include: svgDirs // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
            {
                test: /\.(png|jpg|gif)$/,
                /* use: ['url-loader?limit=8192&name=/assets/images/[hash:8].[name].[ext]'] */
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
    plugins: [
        new HtmlWebpackPlugin({ //这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）
            filename: 'index.html', //定义生成的页面的名称
            template: __dirname + "/app/index.html", //new 一个这个插件的实例，并传入相关的参数
            title: "这里是设置HTML title",
            minify: {
                collapseWhitespace: true //压缩html空白代码
            }
        }),
        new CleanWebpackPlugin(['build/*.*', 'build/**/*.*'], {
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
                "files", "to", "ignore", "app", "package.json"
            ], //排除不删除的目录，主要用于避免删除公用的文件

            // allow the plugin to clean folders outside of the webpack root. Default: false
            // - don't allow clean folder outside of the webpack root
            allowExternal: false,

            // perform clean just before files are emitted to the output dir Default: false
            beforeEmit: true
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HashedModuleIdsPlugin(), //vendor 的 hash 不改变
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/vendor/*.dll.js')
        }),
        /* new ExtractTextPlugin({
            // 指定css文件名 打包成一个css
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        }), */
        /* new webpack.DllReferencePlugin({
            context: __dirname,
            manifest,
            extensions: ['.js', '.jsx']
        }), */
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new CopyWebpackPlugin([{ // 静态文件输出 也就是复制粘贴
            from: path.resolve(__dirname, 'app/assets'), //将哪里的文件
            to: './assets' // 复制到哪里
        }]),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            tslint: path.resolve(__dirname, 'tslint.json'),
            watch: ['./src/**/*.tsx'],
            ignoreLints: ['no-console', 'object-literal-sort-keys', 'quotemark']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]), // 忽略掉 d.ts 文件，避免因为编译生成 d.ts 文件导致又重新检查。
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 3.0新功能 范围提升 （Scope Hoisting ）,作用域提升，这是在webpack3中所提出来的。它会使代码体积更小，因为函数申明语句会产生大量代码.
        new WebpackVersionPlugin({
            cb: (hashMap) => {
                console.log(hashMap);
            }
        })
    ],

    resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.scss', '.json'],
        alias: {
            components: path.resolve(APP_PATH, './components')
        }
    },

    externals: {
        zepto: 'Zepto'
    },
    watch: !env,
    watchOptions: {
        ignored: /node_modules/, // 忽略不用监听变更的目录
        aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 // 每秒询问的文件变更的次数
    }
};

if (env) {
    module.exports.optimization = {
        minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: true,
                        ecma: 6,
                        mangle: true
                    },
                    sourceMap: true
                })
            ]
            // 这个变化还是很大的，之前的webpack版本用的都是commonchunkplugin，但是webpack4开始使用common-chunk-and-vendor-chunk 配置如下:
            /* splitChunks: {
              cacheGroups: {
                commons: {
                  chunks: 'initial',
                  minChunks: 2,
                  maxInitialRequests: 5, // The default limit is too small to showcase the effect
                  minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {
                  test: /node_modules/,
                  chunks: 'initial',
                  name: 'vendor',
                  priority: 10,
                  enforce: true
                }
              }
            } */
    };

    module.exports.plugins = (module.exports.plugins || []).concat([
        new OptimizeCssAssetsPlugin({})
        // new CleanPlugin([BUILD_PATH])
    ]);
}