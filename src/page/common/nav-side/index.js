/*
* @Author: gg
* @Date:   2018-04-16 10:11:09
* @Last Modified by:   gg
* @Last Modified time: 2018-04-23 14:42:59
*/
'use strict';
require('./index.css');
var _m =require('util/m.js');
var templateIndex = require('./index.string');
//侧边导航
var navSide = {
    // 定义一个默认option对象，里面设置一些默认参数
    option : {
        name : '',
        navList : [
            {name: 'user-center', desc: '个人中心',  href: './user-center.html'},
            {name: 'order-list', desc: '我的订单',  href: './order-list.html'},
            {name: 'user-pass-update', desc: '修改密码',  href: './user-pass-update.html'},
            {name: 'about', desc: '关于Mall',  href: './about.html'}
        ],
    },
    // 初始化option对象，传入选中列表项的name
    init:function(option){
        // $.extend方法用于扩展已有的object对象，也就是将多个对象合并，经常用于设置一系列默认参数
        // 具体语法是：$.extend(target,obj1,...objN),意思是用obj1,...objN来扩展target目标对象
        // 将默认option与传入的option进行合并，用传入的同名参数覆盖默认参数，返回合并后的默认option
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染侧边导航栏
    renderNav : function(){
        //判断列表项的active状态：遍历每个列表项，将当前选中项加上true标记，也就是将isActive赋值为true
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        //渲染侧边导航列表模板：调用已定义好的_m.renderHtml()方法
        //利用默认的navList对象去渲染templateIndex变量指定的index.string模板
        //对于后缀名为string的文件，是使用html-loader来加载(在webpack.config.js中设置)
        var navHtml = _m.renderHtml(templateIndex,{
            navList : this.option.navList
        });
        //把渲染后的HTML代码放入.nav-side类的ul容器中
        $('.nav-side').html(navHtml);
    },
};
module.exports = navSide;
