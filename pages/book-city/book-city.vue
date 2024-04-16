<template>
  <view class="book-city" >
	<view
	  class="book-city-tab"
	  :style="{
	    marginTop: customTop + 'px'
	  }"
	  >
	  <table
	    class="book-city-tab-list"
		@click="bookCityCheckTopTab(index)"
		v-for="(item, index) in bookCityTopTableList"
		:key="item.id"
		:style="{
		  fontWeight: item.attribute.fontW,
		  fontSize: item.attribute.fontS,
		  color: item.attribute.color
		}"
		>
	    {{item.name}}
	  </table>
	  <!-- 可活动的指引标示 -->
	  <view
	    class="book-city-tab-index"
		:style="{
		  width: bookCityTopTabIndexWidth + 'px',
		  left: bookCityTopTabIndexPosition + 'px'
		}"
		>
	  </view>
	</view>
	<view class="book-city-content">
	  <!-- <short-story
	    v-show="isChildren === 'aShortStory'"
	    /> -->
	  <book-city-is
	    v-show="isChildren === 'schoolBoyOrgirl'"
		:boyOrGirlVal="boyOrGirlValIs"
		/>
	</view>
  </view>
</template>

<script setup>
import {
  getNodeMsg
} from '../../utils/utils.js'
import {
  ref,
  onMounted
} from 'vue'
// import shortStory from './short-story/short-story.vue'
import bookCityIs from './book-city-is/book-city-is.vue'
// export default {
  // name: 'bookCity',
  
  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 导航栏的高度
  let navHeight = system.statusBarHeight + 44
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
  
  // 页面展示？
  let bookCityContentShow = ref(true)
  
  // 页面顶部的选项卡
  const bookCityTopTableList = ref([
    {
      id: 0,
  	  name: '男生',
  	  attributeName: 'schoolBoyOrgirl',
  	  attribute: changeAfter,
	  titleList: [
	    '帅哥爱看推荐',
		'热门新书',
		'必追江湖梦'
	  ]
    },
    {
      id: 1,
  	  name: '女生',
  	  attributeName: 'schoolBoyOrgirl',
  	  attribute: changeFront,
	  titleList: [
	    '小仙女爱看推荐',
		'热门新书',
		'言情排行榜'
	  ]
    },
    {
      id: 2,
  	  name: '小故事',
  	  attributeName: 'schoolBoyOrgirl',
  	  attribute: changeFront,
	  titleList: [
	    '今日小故事',
		'最近上新',
		'民间流传'
	  ]
    }
  ])
  
  // 一些方法
  const getSerchToHomIsShow = (val) => {
    bookCityContentShow.value = val
  }         
  
  // 顶部tab选项卡标示当前宽度
  let bookCityTopTabIndexWidth = ref(8)
  // 顶部tab选项卡标示当前位置
  let bookCityTopTabIndexPosition = ref(8)
  
  // 页面顶部选项卡固定数据
  let changeFront = {
    fontW: '400',
    fontS: '10px',
    color: '#666'
  }
  let changeAfter = {
    fontW: '400',
    fontS: '14px',
    color: '#000'
  }
  
  // 初始化tab标签的属性
  const setTabhAttribute = () => {
    bookCityTopTableList.value.map((item, i) => {
  	if(i === 0) {
  	  item.attribute = changeAfter
  	} else {
        item.attribute = changeFront
  	}
  	return item
    })
  }
  
  // 切换页面的标题数据
  let boyOrGirlValIs = ref(bookCityTopTableList.value[0].titleList)
  
  // 页面顶部切换选项卡
  let isChildren = ref(bookCityTopTableList.value[0].attributeName)
  const bookCityCheckTopTab = (index) => {
    isChildren.value = bookCityTopTableList.value[index].attributeName
	boyOrGirlValIs.value = bookCityTopTableList.value[index].titleList
	// console.log(boyOrGirlValIs.value)
    for (let i=0; i<=bookCityTopTableList.value.length-1; i++) {
  	  if (i !== index) bookCityTopTableList.value[i].attribute = changeFront
  	  else bookCityTopTableList.value[i].attribute = changeAfter
    }
    setTimeout(() => {
  	  getNodeMsg('.book-city-tab-list', index).then(data => {
  		bookCityTopTabIndexWidth.value = data.width
  		bookCityTopTabIndexPosition.value = data.left
  	  })
  	  
    }, 1)
  }
  
  
  onMounted(() => {
    setTabhAttribute()
    bookCityCheckTopTab(0)
  })
// }
</script>

<style>
.book-city{
  width: 100vw;
  height: 100vh;
  /* border: 1px solid black; */
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}
.book-city-tab{
  width: 100vw;
  height: 40px;
  /* border: 1px solid red; */
  position: relative;
  padding-left: 8px;
  background: #f7f7f8;
}
.book-city-tab-childrens{
  width: 100%;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
}
.book-city-tab-list{
  float: left;
  height: 100%;
  line-height: 40px;
  padding: 0 8px;
}
.book-city-tab-index{
  height: 3px;
  box-sizing: border-box;
  background: rgb(143, 200, 100);
  position: absolute;
  bottom: 0;
  transition: all 300ms;
}
.book-city-content{
  flex: 1;
  background: #fff;
  /* border: 1px solid blue; */
  overflow: hidden;
  overflow-y: auto;
  padding: 0 8px;
}
</style>
