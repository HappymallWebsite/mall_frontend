/*
* @Author: gg
* @Date:   2018-04-22 20:37:06
* @Last Modified by:   gg
* @Last Modified time: 2018-04-23 10:09:06
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide      =require('page/common/nav-side/index.js');
var _m           =require('util/m.js');
var templateIndex=require('./index.string');
var _user = require('service/user-service.js');
// 个人信息显示页面的逻辑实现部分
var page={
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
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
    }
};
$(function(){
    page.init();
});