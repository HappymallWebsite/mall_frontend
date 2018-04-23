/*
* @Author: gg
* @Date:   2018-04-10 14:13:36
* @Last Modified by:   gg
* @Last Modified time: 2018-04-21 15:42:08
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _m = require('util/m.js');
var _user = require('service/user-service.js');
//将错误信息提示封装到一个对象里
var formError = {
    // 将错误提示框显示出来，并将对应的错误信息显示出来
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    // 将错误提示框隐藏起来
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    },
};
// 用户登录逻辑实现部分
var page={
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this=this;
        // 单击登录按钮后执行submit函数
        $('#submit').click(function(){
            _this.submit();
        });
        // 或者按下回车键(键码是13)后执行submit函数
        $('.user-content').keyup(function(event){
            if(event.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单信息后进行验证，并根据验证结果，决定是否向服务器发送请求
    submit: function(){
        var formData = {
            // 获取输入的用户名和密码
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
        };
        // 调用formValidate函数获取表单验证结果
        var validateResult = this.formValidate(formData);
        //验证成功，向服务器发送请求
        if(validateResult.status){
            // 把formData数据发送给服务器，发送地址为/user/login.do(user-service.js里面定义的)
            // 请求成功则执行第二个参数，请求失败则执行第三个参数
            _user.login(formData,function(res){
                // 请求成功则跳回到登录前的那个页面或者跳回到主页面
                window.location.href = _m.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                // 请求失败则系统给出错误提示
                formError.show(errMsg);
            });
        }
        //验证失败，给出自定义的错误提示
        else {
            formError.show(validateResult.msg);
        }
    },
    // 表单字段的非空验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg : '',
        };
        // 验证用户名是否为空
        if(!_m.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        // 验证密码是否为空
        if(!_m.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 都通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});