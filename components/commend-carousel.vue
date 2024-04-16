<template>
  <view class="recommend-carousel" >
    <!-- 轮播容器 -->
    <view class="recommend-carousel-container" >
  	  <!-- 轮播体 -->
  	  <view
  	    class="recommend-carousel-container-banler"
  	    v-for="(item, index) in dataList"
  	    :key="item.id"
		:style="{
		  zIndex: item.zIndex,
		  left: item.left
		}"
		@touchstart="starting($event)"
		@touchmove="moveing($event)"
		@touchend="ending($event, index)"
  	    >
  	    <!-- 轮播图左边的图片 -->
  	    <image
  	      class="recommend-carousel-container-banler-left-img"
  		  :src="item.imgSrc"
  		  ></image>
  	    <!-- 轮播图右边的内容展示 -->
  	    <view class="recommend-carousel-container-banler-left-content" >
  		  <view class="recommend-carousel-container-banler-left-content-top-title" >{{item.novelTitle}}</view>
  		  <view class="recommend-carousel-container-banler-left-content-center-content" >{{item.novelSimplePrice}}</view>
  		  <view class="recommend-carousel-container-banler-left-content-bottom" >
  		    <view class="recommend-carousel-container-banler-left-content-bottom-class" >
  		      <view
  			    class="recommend-carousel-container-banler-left-content-bottom-class-any"
  			    v-for="items in item.novelClass"
  			    >
  			    {{items}}
  			  </view>
  		    </view>
  		    <view class="recommend-carousel-container-banler-left-content-bottom-right" >前往阅读</view>
  		  </view>
  	    </view>
  	  </view>
  	  <!-- 轮播图底部的节点提示 -->
      <view class="recommend-carousel-container-tips" >
  	    <view
  	      class="recommend-carousel-container-spot"
  		  v-for="(item, index) in dataList"
  		  :key="item.id"
		  @click="setDataListAddAttribute(index)"
		  :style="{
		    backgroundColor: setColor(item.zIndex)
	      }"
  		  ></view>
  	    </view>
      </view>
	</view>
</template>

<script setup >
import {
  defineProps,
  onMounted,
  ref,
  watch
} from 'vue'
import {
  getNodeMsg
} from '../utils/utils.js'
  
  // 得到父级组件传过的的值
  let props = defineProps({
    dataList: {
      type: Array,
	  default: []
    }
  })
  
  // 轮播图
  let carouselNumber = ref(0)
  let carouselTimer = ref('')
  let carouselTimerIsOver = ref(1)
  // 轮播图->给每个图元素加上编号
  let setDataListAddAttribute = (index) => {
    if(index !== undefined) carouselNumber.value = index
	if(index < 0) carouselNumber.value = props.dataList.length-1
    if(carouselNumber.value >= props.dataList.length) carouselNumber.value = 0
    let x = carouselNumber.value
    for(let i=0; i<=props.dataList.length-1; i++) {
      props.dataList[i].zIndex = 0
      props.dataList[x+1 > props.dataList.length-1 ? 0 : x+1].left = '100%'
      props.dataList[x+1 > props.dataList.length-1 ? 0 : x+1].zIndex = 1
      props.dataList[x].zIndex = 3
      props.dataList[x].left = 0
      props.dataList[x-1 < 0 ? props.dataList.length-1 : x-1].zIndex = 2
      props.dataList[x-1 < 0 ? props.dataList.length-1 : x-1].left = '-100%'
    }
	movement()
  }
  // 轮播图->让图运动起来
  const movement = (index) => {
	clearTimeout(carouselTimer)
	carouselTimer = setTimeout(() => {
	  carouselNumber.value++
	  setDataListAddAttribute(index)
	  movement()
	}, 6000)
  }
  
  // 滑动轮播
  let coordinateStart = []
  let coordinateMove = []
  const starting = (e) => {
    coordinateStart = [e.touches[0].pageX, e.touches[0].pageY]
  }
  const moveing = (e) => {
	coordinateMove = [e.touches[0].pageX, e.touches[0].pageY]
  }
  const ending = (e, index) => {
	// clearTimeout(carouselTimer)
	if(carouselTimerIsOver.value === 0) return
	carouselTimerIsOver.value = 0
	setTimeout(() => {
	  carouselTimerIsOver.value = 1
	}, 1500)
    if(coordinateStart[0] > coordinateMove[0]) {
	  index++
	  setDataListAddAttribute(index)
	} else {
	  index--
	  setDataListAddAttribute(index)
	}
  }
  
  // 标示小球上色
  const setColor = (index) => {
    if(index === 3) return '#8fc864'
	else return ''
  }
  
  // 进入页面时要加载的东西
  onMounted(() => {
    setDataListAddAttribute()
	// movement()
  })

</script>

<style scoped >
.recommend-carousel{
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 2px 2px 4px 0px rgb(165, 212, 160);
  box-sizing: border-box;
}
/* 轮播图 */
.recommend-carousel-container{
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  position: relative;
}
.recommend-carousel-container-banler{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1500ms;
  padding: 8px 8px 13px;
  /* background-color:#f2fbf0; */
   background-color:#eefbea;
}
.recommend-carousel-container-banler-left-img{
  width: 55px;
  height: 100%;
  display: block;
  border-right: 1px solid #dbdbdb;
}
.recommend-carousel-container-banler-left-content{
  flex: 1;
  height: 100%;
  /* border: 1px solid deeppink; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* margin-left: 3px; */
  padding: 4px 4px 4px 10px;
}
.recommend-carousel-container-banler-left-content-top-title{
  width: 100%;
  height: 15px;
  line-height: 15px;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  font-size: 10px;
  /* font-weight: 700; */
  /* color: #555; */
  /* background-color: red; */
}
.recommend-carousel-container-banler-left-content-center-content{
  /* flex: 1; */
  height: 37px;
  width: 100%;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 10px;
  line-height: 15px;
  text-indent: 10px;
  color: #777;
  /* background-color: aqua; */
  padding: 5px 0;
}
.recommend-carousel-container-banler-left-content-bottom{
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
  overflow: hidden;
  margin-top: 5px;
}
.recommend-carousel-container-banler-left-content-bottom-right{
  border-radius: 15px;
  padding: 0 8px;
  /* font-weight: 700; */
  /* width: 32px; */
  text-align: center;
  background-color: rgb(143, 200, 100);
  color: #fff;
  line-height: 25px;
  height: 25px;
  font-size: 10px;
  margin-right: 6px;
}
.recommend-carousel-container-banler-left-content-bottom-class{
  height: 20px;
  overflow: hidden;
  color: black;
}
.recommend-carousel-container-banler-left-content-bottom-class-any{
  border: 1px solid rgb(146, 200, 100);
  height: 14px;
  line-height: 14px;
  font-size: 8px;
  border-radius: 2px;
  float: left;
  margin: 0 5px 5px 0;
  padding: 0 2px;
  color: #777;
}
.recommend-carousel-container-tips{
  width: 100px;
  height: 10px;
  /* border: 1px solid red; */
  position: absolute;
  left: 50%;
  bottom: 4px;
  margin-left: -50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recommend-carousel-container-spot{
  width: 4px;
  height: 4px;
  /* background-color: #000; */
  border-radius: 50%;
  border: 1px solid rgb(165, 212, 160);
  z-index: 3;
}
</style>