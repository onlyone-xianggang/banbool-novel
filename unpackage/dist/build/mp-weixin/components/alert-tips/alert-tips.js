"use strict";const e=require("../../common/vendor.js"),t={__name:"alert-tips",props:{isAlert:{type:Boolean,default:!1},isMask:{type:Boolean,default:!1},tipsContent:{type:String,default:"请输入提示内容！"},longing:{type:Boolean,default:!0},tipsTitle:{type:String,default:"提示"}},emits:["askChecked"],setup(t,{emit:n}){const o=e=>{n("askChecked",e),console.log(e)};return(n,i)=>e.e({a:t.isAlert},t.isAlert?e.e({b:t.isMask},(t.isMask,{}),{c:e.t(t.tipsTitle),d:t.longing},t.longing?{e:e.t(t.tipsContent)}:{},{f:!t.longing},(t.longing,{}),{g:t.longing},t.longing?{h:e.o((e=>o("confirm"))),i:e.o((e=>o("cancel")))}:{}):{})}};wx.createComponent(t);