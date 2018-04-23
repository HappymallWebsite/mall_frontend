/*
* @Author: gg
* @Date:   2018-04-10 14:13:36
* @Last Modified by:   gg
* @Last Modified time: 2018-04-22 10:48:50
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
// 用户注册逻辑实现部分
var page={
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this=this;
        // 验证用户名是否已存在，当用户名输入框失去焦点时触发blur事件
        // 一般在处理单字段的验证时用blur事件，而不用change事件
        $('#username').blur(function(){
            var  username=$.trim($('#username').val());
            //如果用户名为空则不做验证
            if(!username){
                return;
            }
            //异步验证用户名是否存在，调用_user.checkUsername方法
            //验证成功则需要把错误提示框隐藏掉，验证失败则给出系统错误提示
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        // 单击注册按钮后执行submit函数
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
            // 获取用户注册输入的所有信息
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val()),
        };
        // 调用formValidate函数获取表单验证结果
        var validateResult = this.formValidate(formData);
        //验证成功，向服务器发送注册请求
        if(validateResult.status){
            // 把formData数据发送给服务器，发送地址为/user/register.do
            // 请求成功则执行第二个参数，请求失败则执行第三个参数
            _user.register(formData,function(res){
                // 请求成功则跳转到一个提示“注册成功”的页面
                window.location.href = './result.html?type=register';
            },function(errMsg){
                // 请求失败则给出系统错误提示
                formError.show(errMsg);
            });
        }
        //验证失败，给出自定义的错误提示
        else {
            formError.show(validateResult.msg);
        }
    },
    // 所有表单字段的验证
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
        // 验证密码长度（不能太短）
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 验证手机号格式
        if(!_m.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_m.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_m.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题的答案是否为空
        if(!_m.validate(formData.answer,'require')){
            result.msg = '密码提示问题的答案不能为空';
            return result;
        }
        // 都通过验证，返回包含正确提示的result
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});