/*
* @Author: gg
* @Date:   2018-04-17 11:06:45
* @Last Modified by:   gg
* @Last Modified time: 2018-04-22 18:16:43
*/
'use strict';
require('./index.css');
var navSide=require('page/common/nav-simple/index.js');
var _m =require('util/m.js');
// $(callback)是$(document).ready(callback)的简写形式
// 整个页面加载完毕后立即执行callback函数
$(function(){
    // 获取URL中的type参数值，如果不存在，赋值为default
    var type=_m.getUrlParam('type') || 'default';
    // 获取类名为“type参数值-success”的元素，并将其显示出来
    var $element=$('.' + type + '-success');
    $element.show();
});
