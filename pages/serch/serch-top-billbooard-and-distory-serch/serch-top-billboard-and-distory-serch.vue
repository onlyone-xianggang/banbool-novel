<template>
  <view class="serch-top-billboard-distiry-serch" >
    <!-- 搜索top榜 -->
	<view class="top-billboard" >
	  <!-- 标题开始 -->
	  <view class="top-billboard-title" >
	    <title>热搜Top榜</title>
		<view class="fireStyle" ></view>
	  </view>
	  <!-- 标题结束 -->
	  
	  <!-- 热搜榜单开始 -->
	  <view class="top-billboard-list" >
	    <view
		  class="top-billboard-list-data"
		  v-for="item in topBillboardDataList"
		  :key="item.id"
		  @click="enterNovelDetails(item.id)"
		  >
		    <title class="top-billboard-list-data-attribute-color" >{{item.attribute}}: </title>
			<text>{{item.title}}</text>
		  </view>
	  </view>
	</view>
	<!-- 热搜榜单结束 -->
	  
	<!-- 历史搜索开始 -->
	<view class="serch-distory" >
	  <!-- 搜索标题 -->
	  <view class="serch-distory-title" >
	    <title>历史搜索</title>
		<view
		  class="serch-distory-clean-up"
		  @click="cleanUpSerchDistory()"
		  >
		  <icon
		    type="cancel"
		  	class="serch-distory-clean-up-img"
		  	size="16"
		  	/>
		  清除
		</view>
	  </view>
	  <!-- 搜索历史列表 -->
	  <view class="serch-distory-data-list" >
	    <view
		  class="serch-distory-data-list-item"
		  v-for="item in serchDistoryDataList"
		  :key="item.id"
		  @click="enterNovelDetails(item.id)"
		  >
		  {{item.title}}
		</view>
	  </view>
	</view>
	<!-- 历史搜索结束 -->
  </view>
</template>

<script setup >
import {
  enterNovelDetails
} from '../../../utils/utils.js'
import {
  ref,
  reactive
} from 'vue'
  // 请求到热搜榜单
  const topBillboardDataList = ref([
    {
	  id: 0,
	  attribute: '系统',
	  title: '我的朋友是精神病'
	},
	{
	  id: 1,
	  attribute: '玄幻',
	  title: '我做了千年王八'
	},
	{
	  id: 2,
	  attribute: '系统',
	  title: '我的朋友是精神病'
	},
	{
	  id: 3,
	  attribute: '玄幻',
	  title: '我做了千年王八'
	},
	{
	  id: 4,
	  attribute: '系统',
	  title: '我的朋友是精神病'
	}
  ])
  
  // 请求到搜索历史列表
  const serchDistoryDataList = ref([
    {
      id: 2,
      attribute: '系统',
      title: '我的朋友是精神病'
    },
    {
      id: 3,
      attribute: '玄幻',
      title: '我做了千年王八'
    },
    {
      id: 4,
      attribute: '系统',
      title: '大哥叫我去自首'
    },
    {
      id: 5,
      attribute: '玄幻',
      title: '我做了千年王八'
    },
    {
      id: 6,
      attribute: '系统',
      title: '大哥叫我去自首'
    },
    {
      id: 7,
      attribute: '玄幻',
      title: '我做了千年王八'
    },
    {
      id: 8,
      attribute: '系统',
      title: '大哥叫我去自首'
    },
    {
      id: 9,
      attribute: '玄幻',
      title: '我做了千年王八'
    },
    {
      id: 10,
      attribute: '系统',
      title: '大哥叫我去自首'
    },
    {
      id: 17,
      attribute: '玄幻',
      title: '我做了千年王八'
    }
  ])
  
  // 清除历史搜索
  const cleanUpSerchDistory = () => {
    serchDistoryDataList.value = [] // 这里需要向后端发送清空请求
  } 
</script>
<style scoped >
.serch-top-billboard-distiry-serch{
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
/* 榜单 */
.top-billboard{
  width: 100%;
  height: auto;
  background: #fff;
}
.top-billboard-title{
  width: 120px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fireStyle{
  display: block;
  width: 20px;
  height: 20px;
  background-image: url("../../../static/serch/fire.png");
  background-size: cover;
}
.top-billboard-list{
  width: 100%;
  height: auto;
  color: #555;
}
.top-billboard-list-data{
  display: block;
  width: 100%;
  height: 24px;
  text-align: left;
  line-height: 24px;
  text-indent: 10px;
  font-size: 12px;
}
.top-billboard-list-data-attribute-color{
  font-weight: 800;
}
/* 历史 */
.serch-distory{
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-top: 8px;
  box-sizing: border-box;
}
.serch-distory-title{
  width: 100%;
  height: 30px;
  line-height: 35px;
  text-indent: 8px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: space-between;
  color: #8a8a8a;
}
.serch-distory-clean-up{
  display: flex;
  justify-content: center;
  margin-right: 8px;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
}
.serch-distory-clean-up-img{
  height: 14px;
  /* border: 1px solid red; */
}
.serch-distory-data-list{
  flex: 1;
  padding: 0 8px;
  overflow: hidden;
  overflow-y: auto;
}
.serch-distory-data-list-item{
  width: 100%;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  color: #555;
}
</style>
