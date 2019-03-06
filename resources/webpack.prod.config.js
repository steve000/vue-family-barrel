var path = require('path')

var webpack = require('webpack')

var SRC_PATH = path.join(__dirname, 'src')

var DIST_PATH = path.join(__dirname, '../static')

var CHUNK_FILE_HASH_TAG = '_[chunkhash:5]'

var HtmlWebpackPlugin = require('html-webpack-plugin')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var CleanWebpackPlugin = require('clean-webpack-plugin')

var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

var CopyPlugin = require('copy-webpack-plugin')

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var formatDate = function (date) {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const hours = `0${date.getHours()}`.slice(-2)
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const seconds = `0${date.getSeconds()}`.slice(-2)
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

var config = {
    entry: {
        //    apps: path.join(SRC_PATH, 'root.js'),
        //    'babel-polyfill': 'babel-polyfill',
        apps: path.join(SRC_PATH, 'root.js'),
        vendors: [
            'vue',
            'vuex',
            'vue-router',
            'vuex-router-sync',
            'es6-promise',
            'axios',
            'moment'
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '~': SRC_PATH
        },

        extensions: ['.scss', '.css', '.js', '.vue', '.json']
    },

    output: {
        path: DIST_PATH,
        publicPath: '/static/',
        filename: `js/[name]${CHUNK_FILE_HASH_TAG}.js`,
        chunkFilename: `js/[id].[name]${CHUNK_FILE_HASH_TAG}.js`
    },

    plugins: [

        //  jinkens自动打包，开启该功能后自动打包不会退出
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        //     analyzerPort: 2008
        // }),

        new CleanWebpackPlugin('static', {
            root: path.join(__dirname, '../'),
            verbose: false
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendors', 'manifest'],
            minChunks: Infinity
        }),

        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new WebpackChunkHash(),
        new InlineManifestWebpackPlugin(),

        new ExtractTextPlugin(`css/commons${CHUNK_FILE_HASH_TAG}.css`),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),

        new HtmlWebpackPlugin({
            favicon: './src/layouts/images/logo.png',
            inject: true,
            filename: '../index.html',
            template: path.join(SRC_PATH, 'index_prod.html'),
            address: 'http://127.0.0.1:8091',
            env: process.env.TESTING ? '测试环境' : '正式环境',
            version: formatDate(new Date()),
            ga: process.env.GA
        }),
        new CopyPlugin([{
            from: path.join(SRC_PATH, 'layouts'),
            to: path.join(DIST_PATH, '../layouts')
        }])
    ],

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve(SRC_PATH),
                path.resolve(__dirname, 'node_modules', 'earthjs')
            ]
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 3 versions']
                    })
                ],

                loaders: {
                    sass: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: 'css-loader?minimize!resolve-url-loader!sass-loader?sourceMap',
                        publicPath: '../'
                    })
                }

            }
        },

        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
                //        "resolve-url-loader"
            ]
        },

        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                //        "resolve-url-loader",
                'sass-loader?sourceMap'
            ]
        },

        {
            test: /\.(png|jpg|gif|webp)$/,
            loader: 'url-loader',
            options: {
                publicPath: '/static/',
                limit: 8192,
                name: 'images/[name].[ext]'
            }
        },

        {
            test: /\.(eot|woff|woff2|ttf|svg)/,
            loader: 'url-loader',
            options: {
                limit: 10,
                name: 'fonts/[name].[ext]'
            }
        }
        ]
    }
}

console.log('initializing webpack production build....')

module.exports = config
