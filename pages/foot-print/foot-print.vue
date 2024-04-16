<template>
  <view
    class="foot-parint"
	:style="{
	  height: tabHeight + 'px'
	}"
	>
    <!-- 没有浏览记录展示 -->
	<view
	  class="foot-parint-null"
	  v-if="footParintList.length <= 0"
	  >
	  <!-- 华丽分割 -->
	  <br-line
	    :title="'您没有任何浏览记录'"
		:isLine="true"
		/>
		
	  <!-- 推荐前往 -->
	  <view
	    class="foot-parint-recomment-go"
		>
		<view
		  class="foot-parint-recomment-go-hom"
		  @click="goRecomment('hom')"
		  >
		  去首页
		</view>
		<view
		  class="foot-parint-recomment-go-bookshelf"
		  @click="goRecomment('bookshelf')"
		  >
		  去书城
		</view>
	  </view>
	  
	</view>
	<!-- 浏览记录 -->
	<view
	  class="foot-parint-content"
	  >
	  <!-- 华丽分割 -->
	  <br-line
	    :title="'最近三个月共' + footParintList.length + '条记录'"
	  	:isLine="true"
	    />
	  <view
	    class="foot-parint-content-list"
	  	v-for="item in footParintList"
	  	:key="item.id"
	  	>
	  	<!-- 列表左边的图片 -->
	  	<image
	  	  class="foot-parint-content-left-img"
	  	  :src="item.imgSrc"
	  	  >
	  	</image>
	  	<!-- 列表右边的内容 -->
	  	<view class="foot-parint-content-right-content" >
	  	  <view class="foot-parint-content-right-content-title">{{item.title}}</view>
	  	  <view class="foot-parint-content-right-content-bottom" >
			<view class="foot-parint-content-bottom" >
	  	      <view class="foot-parint-content-right-content-bottom-auther" >{{item.novelAuthor}}</view>
			  <view class="foot-parint-content-right-content-bottom-auther" >
				{{item.overReadTime}}
				阅读到第
				{{item.lastTimeRead}}
				章
			  </view>
			  
			</view>
	  	    <view
	  		  class="foot-parint-content-right-content-bottom-bottun"
	  		  >
			  继续阅读
			</view>
	  	  </view>
	  	</view>
	  </view>
	</view>
  </view>
</template>

<script setup >
import brLine from '../../components/bar.vue'
import {
  ref,
  onMounted
} from 'vue'

  // 模拟数据
  let footParintList = ref([
    {
      id: 0, // 此书在入驻系统的编号
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png', // 书的封面图片
      title: '一根搅屎棍的成长屎' ,// 小说标题
  	  novelAuthor: '陈详溜点拌' ,// 小说作者
	  lastTimeRead: 24, // 上次阅读到多少章节
      overReadTime: '2023-01-23' // 上次阅读的时间
    },
    {
      id: 1, // 此书在入驻系统的编号
      imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg', // 书的封面图片
      title: '遇见你以后' ,// 小说标题
  	  novelAuthor: '陈详溜点拌', // 小说作者
	  lastTimeRead: 1,
      overReadTime: '2023-01-07'
    },
    {
      id: 2,
      title: '凡人修仙传',
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      novelAuthor: '陈详溜点拌',
	  lastTimeRead: 2,
      overReadTime: '2023-01-01'
    },
  	{
  	  id: 3, // 此书在入驻系统的编号
  	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png', // 书的封面图片
  	  title: '一根搅屎棍的成长屎' ,// 小说标题
  	  novelAuthor: '陈详溜点拌' ,// 小说作者
	  lastTimeRead: 23,
      overReadTime: '2023-01-09'
  	},
  	{
  	  id: 4, // 此书在入驻系统的编号
  	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg', // 书的封面图片
  	  title: '遇见你以后' ,// 小说标题
  	  novelAuthor: '陈详溜点拌' ,// 小说作者
	  lastTimeRead: 5,
      overReadTime: '2023-01-06'
  	},
  	{
  	  id: 5,
  	  title: '凡人修仙传',
  	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
  	  novelAuthor: '陈详溜点拌',
	  lastTimeRead: 20,
      overReadTime: '2023-01-04'
  	}
  ])
  
  // tab页的高度
  let tabHeight = ref(0)
  let getWindowHeight = () => {
    let windowAttribute = uni.getSystemInfo()
    windowAttribute.then((data) => {
  	  tabHeight.value = data.screenHeight - data.statusBarHeight - 92
    })
  }
  
  // 进入页面需要加载的数据
  onMounted(() => {
    getWindowHeight()
  })

</script>

<style scoped>
.foot-parint{
  width: 100vw;
  /* border: 1px solid red; */
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  background: #f7f7f8;
  padding: 0 12px;
}
.foot-parint-recomment-go{
  width: 100%;
  height: 40px;
  margin: 25px auto;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.foot-parint-recomment-go-hom,
.foot-parint-recomment-go-bookshelf{
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #8fc864;
  font-size: 12px;
  color: #fff;
  border-radius: 15px;
}
.foot-parint-content-list{
  width: 100%;
  height: 80px;
  padding: 10px 18px;
  display: flex;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 8px;
  /* border: 1px solid red; */
}
.foot-parint-content-left-img{
  width: 45px;
  height: 100%;
  display: block;
}
.foot-parint-content-right-content{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  /* border-bottom: 1px solid #dbdbdd; */
}
.foot-parint-content-right-content-title{
  /* width: 100%; */
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  text-align: left;
  /* border: 1px solid red; */
}
.foot-parint-content-right-content-bottom{
  flex: 1;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid blue; */
}
.foot-parint-content-right-content-bottom-auther{
  height: 18px;
  line-height: 18px;
  font-size: 10px;
  color: #777;
  overflow: hidden;
}
.foot-parint-content-bottom{
  /* border: 1px solid red; */
  height: 36px;
}
.foot-parint-content-right-content-bottom-bottun{
  border-radius: 15px;
  background-color: rgb(143, 200, 100);
  padding: 0 8px;
  color: #fff;
  line-height: 25px;
  font-size: 10px;
  height: 25px;
  /* font-weight: 700; */
}
</style>
