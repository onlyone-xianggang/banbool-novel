<template>
  <view class="hom" >
    <!-- 搜索框 -->
	<top-serch @serchToHomIsShow="getSerchToHomIsShow" ></top-serch>
	
	<view
	  class="hom-content"
	  v-if="homContentShow"
	  >
	  <!-- 首页的tab开始 -->
	  <view class="hom-tab">
	    <table
	  	  class="hom-tab-list"
	  	  @click="homCheckTopTab(index)"
	  	  v-for="(item, index) in homTopTableList"
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
	  	  class="hom-tab-index"
	  	  :style="{
	  	    width: homTopTabIndexWidth + 'px',
	  	    left: homTopTabIndexPosition + 'px'
	  	  }"
	  	  >
	  	</view>
	  </view>
	  <!-- tab页 -->
	  <view class="hom-tab-childrens" >
		<!-- 书架 -->
		<hom-tab-bookshlef v-show="isChildren === 'bookshlef'" />
		<!-- 强烈推荐 -->
		<hom-tab-recommend v-show="isChildren === 'recommend'" />
	  </view>
	</view>
  </view>
</template>

<script setup>
import {
  defineComponent,
  ref,
  onMounted
} from "vue"
import {
  getNodeMsg
} from '../../utils/utils.js'
import topSerch from '../serch/serch.vue'
import homTabBookshlef from './bookshlef/bookshlef.vue'
import homTabRecommend from './recommend/recommend.vue'
// export default defineComponent({
//   name: 'hom',
//   components: {
//     topSerch,
// 	homTabBookshlef,
// 	homTabRecommend
//   },
//   setup() {
	
	// 页面展示？
	let homContentShow = ref(true)
	
	// 页面顶部的选项卡
	const homTopTableList = ref([
	  {
	    id: 0,
		name: '强烈推荐',
		attributeName: 'recommend',
		attribute: changeAfter
	  },
	  {
	    id: 1,
		name: '书架',
		attributeName: 'bookshlef',
		attribute: changeFront
	  }
	])
	
	// 一些方法
	const getSerchToHomIsShow = (val) => {
	  homContentShow.value = val
	}
	
	// 顶部tab选项卡标示当前宽度
	let homTopTabIndexWidth = ref(8)
	// 顶部tab选项卡标示当前位置
	let homTopTabIndexPosition = ref(8)
	
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
	  homTopTableList.value.map((item, i) => {
		if(i === 0) {
		  item.attribute = changeAfter
		} else {
	      item.attribute = changeFront
		}
		return item
	  })
	}
	
	// 页面顶部切换选项卡
	let isChildren = ref(homTopTableList.value[0].attributeName)
	const homCheckTopTab = (index) => {
	  isChildren.value = homTopTableList.value[index].attributeName
	  for (let i=0; i<=homTopTableList.value.length-1; i++) {
		  if (i !== index) homTopTableList.value[i].attribute = changeFront
		  else homTopTableList.value[i].attribute = changeAfter
	  }
	  setTimeout(() => {
		  getNodeMsg('.hom-tab-list', index).then(data => {
			homTopTabIndexWidth.value = data.width
			homTopTabIndexPosition.value = data.left
		  })
		  
	  }, 1)
	}
	
	
	onMounted(() => {
	  setTabhAttribute()
	  homCheckTopTab(0)
	})
	
// 	return {
// 	  getSerchToHomIsShow,
// 	  homContentShow,
// 	  homTopTableList,
// 	  isChildren,
// 	  homCheckTopTab
// 	}
//   }
// })
</script>

<style lang="scss" scoped>
.hom{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.hom-content{
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.hom-tab-childrens{
  width: 100%;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
}

.hom-tab{
  width: 100vw;
  height: 32px;
  padding-left: 8px;
  position: relative;
  background: #f7f7f8;
}
.hom-tab-list{
  float: left;
  height: 100%;
  line-height: 32px;
  padding: 0 8px;
}
.hom-tab-index{
  height: 3px;
  box-sizing: border-box;
  background: rgb(143, 200, 100);
  position: absolute;
  bottom: 0;
  transition: all 300ms;
}
</style>
