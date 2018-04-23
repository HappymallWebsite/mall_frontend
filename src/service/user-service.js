/*
* @Author: gg
* @Date:   2018-04-20 10:19:45
* @Last Modified by:   gg
* @Last Modified time: 2018-04-23 15:00:58
*/
var _m =require('util/m.js');
var _user = {
    //用户登录接口，调用_m.request()方法并传入一些请求参数
    login : function(userInfo,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/login.do'), //发送请求的url
            method : 'post',    //post方式可以发送数据
            data : userInfo,    //将userInfo数据发送给服务器
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //用户注册时，输入用户名后应该立即进行异步验证，验证用户名是否存在
    //也就是立即向服务器发送请求，这里将发送的数据封装到了data对象中
    checkUsername : function(username,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/check_valid.do'), //发送请求的url
            method : 'post',    //post方式可以发送数据
            data : {
                type : 'username',
                str : username,    //将username数据发送给服务器
            },
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //用户注册接口，把所有数据都发送给服务器
    register : function(userInfo,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/register.do'), //发送请求的url
            method : 'post',    //post方式可以发送数据
            data :  userInfo,   //将userInfo数据发送给服务器
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //登录前找回密码第一步：根据用户名获取密码提示问题
    getQuestion : function(username,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/forget_get_question.do'), //发送请求的url
            method : 'post',    //post方式可以发送数据
            data : {
                username: username   //将username数据发送给服务器
            },
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //登录前找回密码第二步：根据用户名、密码提示问题、问题答案获取一个token认证
    checkAnswer : function(userInfo,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/forget_check_answer.do'), //发送请求的url
            method : 'post',    //post方式可以发送数据
            data : userInfo,    //将userInfo数据发送给服务器
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //登录前找回密码第三步：提交用户名、新密码、token值进行密码重置
    resetPassword : function(userInfo,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/forget_reset_password.do'), //发送请求的url
            method : 'post',    //post方式可以发送数据
            data : userInfo,    //将userInfo数据发送给服务器
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //获取用户信息的接口:返回与用户相关的所有信息
    getUserInfo : function(resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/get_information.do'), //发送请求的url
            method : 'post',    //post方式发送
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //修改用户信息的接口:将用户修改后的所有信息都保存到服务器中
    updateUserInfo : function(userInfo,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/update_information.do'), //发送请求的url
            method : 'post',    //post方式发送
            data : userInfo,    //将userInfo数据发送给服务器
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },
    //登录后修改密码的接口:将原密码和新密码都保存到服务器中
    updatePassword : function(userInfo,resolve,reject){
        _m.request({
            url : _m.getServerUrl('/user/reset_password.do'), //发送请求的url
            method : 'post',    //post方式发送
            data : userInfo,    //将userInfo数据发送给服务器
            success : resolve,  //请求成功时执行resolve回调函数
            error : reject,     //请求失败时执行reject回调函数
        });
    },

}
module.exports = _user;

