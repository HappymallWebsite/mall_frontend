/*
* @Author: gg
* @Date:   2018-04-08 20:42:19
* @Last Modified by:   gg
* @Last Modified time: 2018-04-17 13:17:49
*/
var webpack =require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置：dev（开发环境）或online（线上环境）
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin参数的方法，返回一个包含所有参数的对象
var getHtmlConfig = function(name , title){
    return {
        template:'./src/view/'+name+'.html', // 本地模板文件的位置
        filename:'view/'+name+'.html',   //目标文件的输出位置
        title : title,
        inject: true,   //向template中注入所有静态资源(css和js文件)，true代表插入到body元素的底部    
        hash: true,     //是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值 
        chunks: ['common',name]   //指定允许插入到模板中的一些chunk
    }
}
//webpack各个字段的设置
var config = {
    entry: {
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
        'result':['./src/page/result/index.js'],
        'common':['./src/page/common/index.js']
    },
    output: {
        path: __dirname +'/dist',    //输出文件存放的路径，这里就是dist
        publicPath: '/dist/',        //访问外部模块时的路径，比如src指定的路径
        filename: 'js/[name].js'    //同时输出多个打包文件
    },
    externals:{
        'jquery':'window.jQuery'  //引入jQuery库
    },
    module:{
        loaders:[
            { test: /\.css$/,loader: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:"url-loader?limit=100&name=resource/[name].[ext]"},
            { test: /\.string$/,loader: "html-loader"}
        ]
    },
    resolve:{   //配置目录别名
        alias:{
            node_modules : __dirname + '/node_modules',
            util     : __dirname + '/src/util',
            page     : __dirname + '/src/page',
            service  : __dirname + '/src/service',
            iamge    : __dirname + '/src/iamge',
        }
    },
    plugins:[
        //把公共js模块打包到dist/js/base.js中
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',      //把入口文件common作为公共模块打包进base.js文件中
            filename:'js/base.js'  //所有输出文件都在dist目录下(output字段中已经指定)
        }),
        //把css模块单独打包到css文件中
        new ExtractTextPlugin("css/[name].css"),
        //html模板处理
        new htmlWebpackPlugin(getHtmlConfig("index","首页")),
        new htmlWebpackPlugin(getHtmlConfig("login","用户登录")),
        new htmlWebpackPlugin(getHtmlConfig("result","操作结果"))
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports=config;
