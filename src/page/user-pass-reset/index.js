/*
* @Author: gg
* @Date:   2018-04-10 14:13:36
* @Last Modified by:   gg
* @Last Modified time: 2018-04-22 20:14:34
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
// 用户找回密码逻辑实现部分
var page={
    // 将用户名、问题、答案、认证token都封装到一个对象中暂存
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent: function(){
        var _this=this;
        // 第一步中，单击"下一步"按钮后提交用户名，并根据用户名获取密码提示问题
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 如果用户名不为空，则执行请求getQuestion接口的操作
            if(username){
                _user.getQuestion(username,function(res){
                    // 如果用户名存在，则将获取到的问题保存，并加载第二步
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    // 如果用户名不存在，则给出一个系统错误提示“用户不存在”
                    formError.show(errMsg);
                });
            }
            // 如果用户名为空，则给出一个自定义错误提示
            else{
                formError.show("请输入用户名");
            }
        });
        // 第二步中，单击"下一步"按钮后提交密码提示问题的答案
        // 并根据用户名、问题、答案获取服务器返回的一个token认证
        $('#submit-answer').click(function(){
            var answer = $.trim($('#answer').val());
            // 如果答案不为空，则执行请求checkAnswer接口的操作，检查答案是否正确
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer
                },function(res){
                    // 如果答案正确，则将获取到的答案及token认证保存，并加载第三步
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    // 如果答案不正确，则给出一个系统错误提示
                    formError.show(errMsg);
                });
            }
            // 如果答案为空，则给出一个自定义错误提示
            else{
                formError.show("请输入密码提示问题的答案");
            }
        });
        // 第三步中，单击"下一步"按钮后同时提交用户名、新密码和token值
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 如果新密码不为空，则执行请求resetPassword接口的操作，进行密码重置
            if(password && password.length >= 6){
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                },function(res){
                    // 如果新密码提交成功，则跳转到一个结果提示页
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    // 如果新密码提交失败，则给出一个系统错误提示
                    formError.show(errMsg);
                });
            }
            // 如果新密码为空，则给出一个自定义错误提示
            else{
                formError.show("请输入不少于6位的新密码");
            }
        });
    },
    // 加载第一步：输入用户名
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 加载第二步：输入密码提示问题的答案
    loadStepQuestion : function(){
        //隐藏错误提示
        formError.hide();
        //做容器的切换：隐藏第一步显示第二步，同时将获取的问题显示出来
        $('.step-username').hide().siblings('.step-question')
        .show().find('.question').text(this.data.question);
    },
    // 加载第三步：输入新密码
    loadStepPassword : function(){
        //隐藏错误提示
        formError.hide();
        //做容器的切换：隐藏第二步显示第三步
        $('.step-question').hide().siblings('.step-password').show();
    },
};
$(function(){
    page.init();
});
