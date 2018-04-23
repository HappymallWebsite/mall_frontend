/*
* @Author: gg
* @Date:   2018-04-22 20:37:06
* @Last Modified by:   gg
* @Last Modified time: 2018-04-23 15:17:48
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide      =require('page/common/nav-side/index.js');
var _m           =require('util/m.js');
var templateIndex=require('./index.string');
var _user = require('service/user-service.js');
// 个人信息修改页面的逻辑实现部分
var page={
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this=this;
        //点击提交按钮后触发事件，用到了事件捕获及事件冒泡原理
        //先从document元素向下捕获，直到找到实际元素，然后再向上冒泡到document元素
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val()),
            };
            // 对输入的用户信息格式进行验证
            validateResult = _this.validateForm(userInfo);
            // 如果验证成功，则请求updateUserInfo接口，保存更新后的所有信息
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res,msg){
                    // 请求成功，则给出成功提示，并跳回到个人中心页面
                    _m.successTips(msg);
                    window.location.href='./user-center.html';
                },function(errMsg){
                    _m.errorTips(errMsg);
                });
            }
            // 如果验证失败，则返回自定义错误提示
            else{
                _m.errorTips(validateResult.msg);
            }
        })
    },
    //加载用户信息，请求getUserInfo接口返回用户相关的所有信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            // 将接口返回的res数据渲染进index.string模板中
            userHtml=_m.renderHtml(templateIndex,res);
            // 将渲染后的HTML代码添加到页面中
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _m.errorTips(errMsg);
        });
    },
    //验证所有输入字段的格式
    validateForm : function(formData){
        var result = {
            status : false,
            msg : ''
        };
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