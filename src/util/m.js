/*
* @Author: gg
* @Date:   2018-04-13 08:57:30
* @Last Modified by:   gg
* @Last Modified time: 2018-04-22 16:48:44
*/
'use strict';
//加载hogan组件
var hogan = require('hogan.js');
var conf = {
    //因为服务器接口地址与当前静态文件的地址一样，所以为空即可
    serverHost : '',
};
var _m={
    //处理网络请求的对象request（向服务器发送请求）
    //参数param也是一个对象，包含method、url、type、data、success、error属性
    request : function(param){
        //使_this指向_m对象
        var _this = this;
        //自定义发送请求的参数以及回调函数的信息
        $.ajax({
            // 发送请求的类型
            type : param.method || 'get',
            // 发送请求的URL
            url  : param.url    || '',
            // 服务器响应后返回的数据类型
            dataType : param.type || 'json',
            // 发送到服务器的数据（post方式的参数）
            data :param.data || '',
            // 请求成功后调用的回调函数，res是一个对象类型
            success : function(res){
                //请求完全成功
                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //请求状态成功，但请求发送的数据错误
                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg);
                }
                //请求状态成功，但没有登录，需要强制登录
                else if(res.status === 10){
                    _this.doLogin(); // _this指向_m对象
                }
            },
            //请求失败后调用的回调函数
            error : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器端地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url的参数
    getUrlParam : function(name){
        //正则表达式是要匹配：以指定的name参数名开头或者以&name开头，以&结尾或name参数值结尾
        //([^&]*)是匹配除了&字符以外的其他多个字符，^在这里是取反操作
        //reg指定的正则表达式中有三个捕获组，而我们所需要的是第二个捕获组中的参数值
        var reg =new RegExp('(^|&)' + name + '=([^&]*)(&|$)');

        //location对象的search属性会返回url中以问号开头的整个查询字符串，去掉问号后，去匹配reg正则表达式
        //match方法会返回一个数组，数组的第一项是第一个与整个模式匹配的字符串，从第二项开始是依次与捕获组匹配的字符串
        var result = window.location.search.substring(1).match(reg);

        //decodeURIComponent是对任何非标准字符进行解码，与encodeURIComponent编码对应
        return result ? decodeURIComponent(result[2]) : null;
    },
    //利用hogan渲染HTML模板,先编译再渲染,将数据渲染进模板中 
    renderHtml : function(htmlTemplate,data){
        //编译htmlTemplate指定的模板
        var template = hogan.compile(htmlTemplate);
        //在模板中渲染进数据data
        var result=template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功!');
    },
    //失败提示
    errorTips : function(msg){
        alert(msg || '操作失败!');
    },
    //字段的验证：支持非空、手机号格式、邮箱格式的判断
    validate : function(value,type){
        //作用一：把输入字段的前后空格去掉，作用二：把其他类型转换为字符串类型
        var value = $.trim(value);
        //非空验证：非空字符串返回true，空字符串返回false
        if(type === 'require'){
            return !!value;
        }
        //手机号格式验证:以1开头，接下来是10个数字
        if(type === 'phone'){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证:
        //\w表示任意一个单词字符，包括下划线，+表示匹配前一个字符一次或多次，
        //*表示匹配前一个字符0次或多次，{n,m} 最少匹配 n 次且最多匹配 m 次
        if(type === 'email'){
            //正则表达式的意思：/(一个或多个字符)(.一个或多个字符)*@(一个或多个字符)(.两个或三个字符){1,3}/
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一跳转到登录页面
    doLogin : function(){
        //将当前窗口定位到user-login.html页面，登录以后还要重定向到原来的地址，不能都跳回主页
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //统一跳转到主页面
    goHome : function(){
        //将当前窗口定位到index.html页面
        window.location.href = './index.html';
    },

};
// 输出 _m 模块
module.exports=_m;