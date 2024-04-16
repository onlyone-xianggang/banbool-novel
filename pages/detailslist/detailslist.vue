<template>
  <view class="details-list" >
    <view
      class="details-list-top"
      :style="{
    	marginTop: customTop + 'px'
      }"
      >
	  <view
	    class="details-list-top-left-back"
		@click="backpage()"
		>
	    ‹
	  </view>
	  <view
	    class="details-list-top-title"
		>
		{{pageTitle}}
	  </view>
    </view>
    <view class="details-list-body" >
      <view
        class="details-list-body-book-list"
      		v-for="item in hotBooks"
      		:key="item.id"
      		>
      		<image
      		  :src="item.imgSrc"
      		  class="details-list-body-book-list-data-left-img"
      		  ></image>
      		<!-- 搜索到的小说列表右边详情介绍 -->
      		<view class="details-list-body-book-list-data-right-contents" >
      		  <view class="details-list-body-book-list-data-right-contents-title-font-size" >{{item.title}}</view>
      		  <view class="details-list-body-book-list-data-right-contents-text" >{{item.details}}</view>
      		  <view class="details-list-body-book-list-data-right-contents-bottom" >
      		    <view class="details-list-body-book-list-data-right-contents-bottom-left" >
      			  <span>{{item.auther}}</span>
      			  <span>☞</span>
      			  <span>{{item.textNunmber}}</span>
      			  <span>☞</span>
      			  <span>{{item.isOver}}</span>
      			</view>
      		    <view class="details-list-body-book-list-data-right-contents-right" >{{item.attribute}}</view>
      		  </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  onMounted
} from 'vue'
// import {
//   localStorage
// } from '@system.storage'

const name = ref('my name is details')

  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
  
  // 接收到的标题
  const pageTitle = ref('我就是标题')
  
  // 获取本地存储的路由
 //  localStorage.setItem({
 //    key: 'topage',
	// value: '../my/my'
 //  })
 //  let toPage = localStorage.getItem({
 //    key: 'topage',
	// success: function(data) {
	//   console.log(data.value)
	// }
 //  })
  
  // 返回上一页
  const backpage = () => {
    // uni.navigateTo({
    // 	url: '../my/my'
    // })
	// uni.redirectTo({
	// 	url: '../my/my'
	// })
	console.log('-----')
	uni.switchTab({
		url: uni.getStorageSync('topage')
		// url: '../my/my'
	})
  }
  
  const hotBooks = ref([
    {
      id: 0,
      title: '凡人修仙传',
      attribute: '玄幻',
      details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      auther: '陈详溜点拌',
      textNunmber: '12万',
      isOver: '连载'
    },
    {
      id: 1,
      title: '凡人修仙传',
      attribute: '玄幻',
      details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      auther: '陈详溜点拌',
      textNunmber: '12万',
      isOver: '连载'
    },
    {
      id: 2,
      title: '凡人修仙传',
      attribute: '玄幻',
      details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      auther: '陈详溜点拌',
      textNunmber: '12万',
      isOver: '连载'
    },
    {
      id: 3,
      title: '凡人修仙传',
      attribute: '玄幻',
      details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      auther: '陈详溜点拌',
      textNunmber: '12万',
      isOver: '连载'
    }
  ])
  

onMounted(() => {
  // 动态改变页面头部标题
  wx.setNavigationBarTitle({
            title: "动态标题111"
        })
})



</script>

<style scoped>
.details-list{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.details-list-top{
  width: 100%;
  height: 32px;
  padding: 0 40px 0 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
}
.details-list-top-left-back{
  /* border: 1px solid blue; */
  width: 32px;
  line-height: 24px;
  font-size: 32px;
  font-weight: 100;
}
.details-list-top-title{
  line-height: 30px;
  /* border: 1px solid springgreen; */
  flex: 1;
  text-align: center;
}
.details-list-body{
  flex: 1;
  padding: 0 8px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}
.details-list-body-book-list{
  width: 100%;
  height: 100px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
}
.details-list-body-book-list-data-left-img{
  width: 75px;
  height: 100px;
  display: block;
  /* border: 1px solid red; */
  background: skyblue;
}
.details-list-body-book-list-data-right-contents{
  flex: 1;
  margin-left: 8px;
}
.details-list-body-book-list-data-right-contents-title-font-size{
  font-size: 12px;
  /* border: 1px solid red; */
  width: 100%;
  height: 14px;
  line-height: 14px;
  margin-bottom: 4px;
}
.details-list-body-book-list-data-right-contents-text{
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 10px;
  line-height: 14px;
  height: 56px;
  text-indent: 12px;
  padding-top: 3px;
  color: #777;
  /* border: 1px solid red; */
}
.details-list-body-book-list-data-right-contents-bottom{
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: #777;
  line-height: 22px;
  /* border: 1px solid red; */
}
.details-list-body-book-list-data-right-contents-right{
  border: 1px solid #eefbea;
  height: 16px;
  line-height: 16px;
  text-align: center;
  padding: 0 5px;
  border-radius: 2px;
  font-size: 8px;
}
</style>