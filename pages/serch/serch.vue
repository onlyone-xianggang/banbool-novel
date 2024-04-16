<template>
  <view
    class="serch"
	:style="{
	  height: serchHeight + 'vh'
	}"
	>
	<view
	  class="navbar"
	  :style="{
	    height: navHeight + 'px'
	  }"
	  >
	  <!-- 展开搜索页时显示返回的标示开始 -->
	  <view
	    class="previousPage"
		@click="previousPage"
		:style="{
		  height: customHeight + 'px',
		  marginTop: customTop + 'px',
		  width: previousPageWidth + 'px'
		}"
		>
		<image
		  class="previousPageImg"
		  src="/static/previousPage.png"
		  ></image>
	  </view>
	  <!-- 展开搜索页时显示返回的标示结束 -->
	  
	  <!-- 搜索框开始 -->
	  <view
	    class="topInfo"
	    :style="{
	      marginTop: customTop + 'px',
	      height: customHeight + 'px',
	    }"
	    >
		<view class="uni-form-item uni-column style-relative" >
		  <!-- 可移动的盒子 -->
		  <view 
		    class="uni-form-item uni-column activeBox"
			:style="{
			  top: serchTopVal + 'px'
			}"
			@click="toSerch(serchKeyword)"
			>
			<input
			  class="uni-input"
			  confirm-type="search"
			  v-model="serching"
			  @input="serchInputVal"
			  :placeholder="serchKeyword"
			  />
			<icon
			  type="search"
			  class="serchStyle"
			  size="14"
			  />
			<view
			  class="serch-button"
			  v-if="serchButtonShow"
			  @click="clickSerchEntryDetails(inputValueEntry == '' ? serchKeyword : inputValueEntry)"
			  >搜索</view>
		  </view>
		</view>
	  </view>
	</view>
	<!-- 搜索框结束 -->
	
	<!-- 可以收起展开的部分搜索列表等 -->
	<view
	  class="openSerch"
	  :style="{
	    height: openSerchHeight,
		paddingTop: openSerchTop + 'px'
	  }"
	  >
	  <!-- 热搜top榜+搜索历史 -->
	  <top-billboard-and-distory v-if="serchDistoryOrSerching == 'distory'" />
	  <!-- 手动搜索副代表 -->
	  <hand-movement-serch-list v-if="serchDistoryOrSerching == 'serching'" />
	</view>
  </view>
</template>

<script setup>
import topBillboardAndDistory from './serch-top-billbooard-and-distory-serch/serch-top-billboard-and-distory-serch.vue'
import handMovementSerchList from './hand-movement-serch-list/hand-movement-serch-list.vue'
import {
  defineComponent,
  onMounted,
  ref,
  onUpdated,
  defineEmits
} from "vue"
  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 导航栏的高度
  let navHeight = system.statusBarHeight + 44
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
    
  // 胶囊按钮与右侧的距离
  let customHeight = custom.height
	
  // 一些变量
  const serchEntry = '关键词、书名、作者'
  const serchList = ref([
    '我的爷爷是阎王',
    '大哥，听说你在地府造反了啊',
    '今天的我有点疯',
    '我朋友是精神病',
    '回到1987',
    '我的老婆是黑帮老大'
  ]) // 后端请求来的数据--临时备用
  
  
  // 下面是一些函数
  // 延时器存储变量
  let changePlaceholderTimer = ''
  // 交替number
  let changePlaceolderNumber = 0
  // 需要展示在搜索框里的提示,默认为第一条数据
  let serchKeyword = ref(serchList.value[changePlaceolderNumber])
  // 默认展示搜索词条
  serchKeyword.value = serchEntry
  let serching = ref(serchList[changePlaceolderNumber])
  
  const changePlaceholder = () => {
    clearTimeout(changePlaceholderTimer)
    // 固定时间变换一次搜索提示
	serchKeyword.value = serchList.value[changePlaceolderNumber]
    changePlaceholderTimer = setTimeout(() => {
      changePlaceolderNumber++
	  if (changePlaceolderNumber >= serchList.value.length) changePlaceolderNumber = 0
	  serchKeyword.value = serchList.value[changePlaceolderNumber]
	  changePlaceholder()
    }, 4000)
  }
	
  // 展开或收起搜索主页变量
  let openSerchHeight = ref(0)
  let previousPageWidth = ref(0)
  let openSerchTop = ref(0)
  let serchTopVal = ref(0)
  let inputValueEntry = ref('')
  let serchButtonShowTimer = ref('')
  let serchButtonShow = ref(false)
  let serchDistoryOrSerching = ref('distory')
  let serchHeight = ref('')
  // 向父组件传值
  const emit = defineEmits(['serchToHomIsShow'])
	
  // 搜索框--收起展开搜索页函数
  const toSerch = (val) => {
    openSerchHeight.value = '500px'
	previousPageWidth.value = 45
	serchTopVal.value = 45
	openSerchTop.value = 40
	serchHeight.value = 100
	serchButtonShowTimer = setTimeout(() => {
	  serchButtonShow.value = true
	}, 300)
	
	// 搜索栏展示推荐书名
	changePlaceholder()
	// 显示hom页面
	emit('serchToHomIsShow', false)
  }
	
  // 收起搜索页的主页面
  const previousPage = () => {
    previousPageWidth.value = 0
    openSerchHeight.value = 0
    serchTopVal.value = 0
	openSerchTop.value = 0
	serchButtonShow.value = false
	serching.value = ''
	serchHeight.value = ''
	serchDistoryOrSerching.value = 'distory'
	// 展示搜索词条提示
	clearTimeout(changePlaceholderTimer)
	clearTimeout(serchButtonShowTimer)
	serchKeyword.value = serchEntry
    // 隐藏hom页面
    emit('serchToHomIsShow', true)
  }
  
  const serchInputVal = (val) => {
    inputValueEntry.value = val.detail.value
	if (val.detail.value.length != '') {
	  clearTimeout(changePlaceholderTimer)
	} else {
	  changePlaceholder()
	  serchDistoryOrSerching.value = 'distory'
	}
  }
  
  // 开始搜索
  const clickSerchEntryDetails = (inputVal) => {
    console.log(inputVal)
	console.log(serching)
	serching.value = inputVal
	clearTimeout(changePlaceholderTimer)
	serchDistoryOrSerching.value = 'serching'
  }
	
  // 需要要钩子里执行的一些函数
  onMounted(() => {
    // 进入页面自动开始执行搜索框里提示文本的交换
    // changePlaceholder()
  })
</script>

<style lang="scss" scoped>
.serch{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  // border: 1px solid red;
}
.style-relative{
  position: relative;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}
.navbar {
  width: 100%;
  display: flex;
  align-items: center;
}
.topInfo {
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  padding-left: 10px;
  // border: 1px solid red;
}
.uni-form-item{
  text-indent: 8px;
  position: relative;
  // border: 1px solid red;
  transition: all 300ms;
}
.uni-input{
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 20px;
  font-size: 14px;
  text-overflow: ellipsis;
  background-color: #fff;
}
.serchStyle{
  position: absolute;
  right: 8px;
  top: 1px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .u-search {
  width: 170px;
  height: 20px;
}
.openSerch{
  width: 100%;
  flex: '';
  background: #fff;
  transition: all 300ms;
  overflow: hidden;
  overflow-y: auto;
  background-color: #f7f7f8;
}
.previousPage{
  text-align: right;
  overflow: hidden;
  transition: all 300ms;
}
.previousPageImg{
  width: 80%;
  height: 80%;
}
.serch-button{
  width: 50px;
  height: 100%;
  position: absolute;
  right: -50px;
  top: 0;
}
.uni-input{
	width: 350rpx;
	font-size: 12px;
}
</style>
