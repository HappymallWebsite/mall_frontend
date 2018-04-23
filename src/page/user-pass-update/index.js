/*
* @Author: gg
* @Date:   2018-04-22 20:37:06
* @Last Modified by:   gg
* @Last Modified time: 2018-04-23 15:15:34
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide      =require('page/common/nav-side/index.js');
var _m           =require('util/m.js');
var _user = require('service/user-service.js');
// 修改密码页面的逻辑实现部分
var page={
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this=this;
        //点击提交按钮后触发事件，用到了事件捕获及事件冒泡原理
        //先从document元素向下捕获，直到找到实际元素，然后再向上冒泡到document元素
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password         : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            };
            // 对输入的密码字段进行验证
            var validateResult = _this.validateForm(userInfo);
            // 如果验证成功，则请求updatePassword接口，保存旧密码和新密码
            if(validateResult.status){
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function(res,msg){
                    // 请求成功，则给出成功提示
                    _m.successTips(msg);
                },function(errMsg){
                    // 请求失败，则给出失败提示
                    _m.errorTips(errMsg);
                });
            }
            // 如果验证失败，则返回自定义错误提示
            else{
                _m.errorTips(validateResult.msg);
            }
        })
    },
    //验证所有输入字段的格式
    validateForm : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        // 验证原密码是否为空
        if(!_m.validate(formData.password,'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordConfirm !== formData.passwordNew){
            result.msg = '两次输入的密码不一致';
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