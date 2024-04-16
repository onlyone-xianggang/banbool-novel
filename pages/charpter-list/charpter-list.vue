<template>
  <view id="charpter-list" >
	
	<!-- 顶部导航栏 -->
	<view
	  class="charpter-list-top"
	  :style="{
	    marginTop: customTop + 'px'
	  }"
	  >
	  <!-- 返回上一级 -->
	  <view
	    class="charpter-list-top-back"
		@click="backPage()"
		>
		‹
	  </view>
	  <view class="charpter-list-top-title" >
	    文章列表
	  </view>
	</view>
	
	<!-- 文章列表内容 -->
	<view
	  class="charpter-list-body"
	  >
	  
	  <view class="charpter-list-body-info" >
	    已更新章节：{{charpterContentList.length}}
	  </view>
	  
	  <!-- 章节一览表 -->
	  <view
	    class="charpter-list-body-content-list"
		v-for="item in charpterContentList"
		>
		<!-- 章节 -->
		<view class="charpter-list-body-content-list-number" >{{item.name}}：</view>
		<!-- 章节标题 -->
		<view class="charpter-list-body-content-list-title" >{{item.title}}</view>
		<!-- 去阅读本章节 -->
		<view
		  class="charpter-list-body-content-list-read-to"
		  @click="toRead(item.id)"
		  >
		  前往阅读
		</view>
	  </view>
	</view>
	
  </view>
</template>

<script setup >
import {
  onMounted,
  ref
} from 'vue'

  const name = ref('my name is charpter-list')
  
  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
  
  // 获取章节列表
  const charpterContentList = uni.getStorageSync('charpterListData')
  
  // 返回上一级
  const backPage = () => {
    console.log('是否跳转成功')
    uni.redirectTo({
      url: uni.getStorageSync('charpterListUp')
    })
  }
  
  // 前往阅读
  const toRead = (number) => {
    uni.setStorageSync('readCharpterstordata', number)
	uni.redirectTo({
	  url: uni.getStorageSync('charpterListUp')
	})
  }

  onMounted(() => {
    console.log('您进入了文章列表页面')
  })
</script>

<style scoped >
#charpter-list{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 14px;
}
.charpter-list-top{
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  padding: 0 40px 0 8px;
  box-sizing: border-box;
  border-bottom: 1px solid #f7f7f8;
}
.charpter-list-top-back{
  width: 32px;
  line-height: 24px;
  font-size: 32px;
  font-weight: 100;
}
.charpter-list-top-title{
  flex: 1;
  text-align: center;
  line-height: 32px;
}
.charpter-list-body{
  flex: 1;
  /* border: 1px solid red; */
  overflow: hidden;
  overflow-y: auto;
  padding: 0 8px;
  box-sizing: border-box;
}
.charpter-list-body-content-list{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 14px;
}
.charpter-list-body-content-list-number{
  /* border: 1px solid red; */
}
.charpter-list-body-content-list-title{
  flex: 1;
  /* border: 1px solid blue; */
}
.charpter-list-body-content-list-read-to{
  border-radius: 15px;
  background-color: #8fc864;
  padding: 0 8px;
  color: #fff;
  height: 24px;
  line-height: 24px;
  font-size: 10px;
}
.charpter-list-body-info{
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #666;
  font-weight: 600;
}
</style>
