"use strict";const e=require("../../common/vendor.js");Math||a();const a=()=>"../../components/bar.js",g={__name:"foot-print",setup(m){let i=e.ref([{id:0,imgSrc:"https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png",title:"一根搅屎棍的成长屎",novelAuthor:"陈详溜点拌",lastTimeRead:24,overReadTime:"2023-01-23"},{id:1,imgSrc:"https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg",title:"遇见你以后",novelAuthor:"陈详溜点拌",lastTimeRead:1,overReadTime:"2023-01-07"},{id:2,title:"凡人修仙传",imgSrc:"https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png",novelAuthor:"陈详溜点拌",lastTimeRead:2,overReadTime:"2023-01-01"},{id:3,imgSrc:"https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png",title:"一根搅屎棍的成长屎",novelAuthor:"陈详溜点拌",lastTimeRead:23,overReadTime:"2023-01-09"},{id:4,imgSrc:"https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg",title:"遇见你以后",novelAuthor:"陈详溜点拌",lastTimeRead:5,overReadTime:"2023-01-06"},{id:5,title:"凡人修仙传",imgSrc:"https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png",novelAuthor:"陈详溜点拌",lastTimeRead:20,overReadTime:"2023-01-04"}]),d=e.ref(0),r=()=>{e.index.getSystemInfo().then(n=>{d.value=n.screenHeight-n.statusBarHeight-92})};return e.onMounted(()=>{r()}),(o,n)=>e.e({a:e.unref(i).length<=0},e.unref(i).length<=0?{b:e.p({title:"您没有任何浏览记录",isLine:!0}),c:e.o(t=>o.goRecomment("hom")),d:e.o(t=>o.goRecomment("bookshelf"))}:{},{e:e.p({title:"最近三个月共"+e.unref(i).length+"条记录",isLine:!0}),f:e.f(e.unref(i),(t,c,l)=>({a:t.imgSrc,b:e.t(t.title),c:e.t(t.novelAuthor),d:e.t(t.overReadTime),e:e.t(t.lastTimeRead),f:t.id})),g:e.unref(d)+"px"})}},s=e._export_sfc(g,[["__scopeId","data-v-677aa4d1"],["__file","C:/xgproject/chili-peppers-novel/pages/foot-print/foot-print.vue"]]);wx.createPage(s);