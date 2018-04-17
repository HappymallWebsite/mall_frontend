/*
* @Author: gg
* @Date:   2018-04-16 10:11:09
* @Last Modified by:   gg
* @Last Modified time: 2018-04-16 13:57:54
*/
'use strict';
require('./index.css');
var _m =require('util/m.js');
//通用页面头部
var header = {
    // 初始化时绑定bindEvent函数
    init:function(){
        this.bindEvent();
    },
    // 主页面的搜索关键字被提交后，还要将其回填到列表页的搜索框中
    onload: function(){
        //先从列表页list.html的URL参数中获取提交的关键字keyword
        var keyword = _m.getUrlParam('keyword');
        if(keyword){
            // 然后再将keyword回填到列表页的搜索框中
            $('#search-input').val(keyword);
        }
    },
    //单击搜索按钮或按下回车键后触发搜索提交事件searchSubmit
    bindEvent:function(){
        // 如果使用jQuery选择器的同时还要用到this值，就需要指定下面的语句
        var _this = this;
        // 单击搜索按钮触发
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //按下回车键(键码是13)触发
        $('#search-input').keyup(function(event){
            if(event.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //把搜索关键字提交到列表页list.html的URL参数中
    searchSubmit: function(){
        //获取搜索框中输入的文本，并去掉前后空格
        var keyword =$.trim($('#search-input').val());
        if(keyword){
            // 如果输入了内容，则跳转到列表页
            window.location.href = '/list.html?keyword=' + keyword;
        }else{
            //如果没有输入内容，则跳回到网站主页
            _m.goHome();
        }
    },
}
header.init();