<template>
  <view
    class="alert"
	v-if="isAlert"
    >
    <!-- mask -->
    <view
      class="alert-tips-mask"
	  v-if="isMask"
	  >
    </view>
	
    <!-- 对话提示框 -->
    <view
      class="alert-tips"
	  >
	  <view class="alert-tips-title" >{{tipsTitle}}</view>
	  <view class="alert-tips-content" >
	    <view v-if="longing" >{{tipsContent}}</view>
		<img
		  src="../../../static/bamboo.gif"
		  class="alert-tips-long-img"
		  v-if="!longing"
		  />
	  </view>
	  <view
	    class="alert-tips-buttons"
		v-if="longing"
		>
	    <button
		  class="alert-tips-buttons-confirm"
		  @click="askCheck('confirm')"
		  >
		  确定
		</button>
	    <button
		  class="alert-tips-buttons-cancel"
		  @click="askCheck('cancel')"
		  >
		  取消
		</button>
	  </view>
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits
} from "vue"

  defineProps({
    isAlert: {
	  type: Boolean,
	  default: false
	}, // alert弹出框属性
	isMask: {
	  type: Boolean,
	  default: false
	}, // 打开关闭遮罩层
	tipsContent: {
	  type: String,
	  default: '请输入提示内容！'
	},
	longing: {
	  type: Boolean,
	  default: true
	}, // 加载
	tipsTitle: {
	  type: String,
	  default: '提示'
	} // 弹窗提示标题
  })
  
  // 确定OR取消
  let emit = defineEmits(['askChecked'])
  const askCheck = (is) => {
    emit('askChecked', is)
	console.log(is)
  }
  
</script>

<style>
.alert{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.alert-tips-mask{
  width: 100%;
  height: 100%;
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid red;
  opacity: 0.4;
  z-index: 3;
  transition: all 300ms;
}
.alert-tips{
  width: 200px;
  height: 130px;
  background-color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: -10%;
  bottom: 0;
  margin: auto;
  transition: all 300ms;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.alert-tips-title{
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  background: skyblue;
  border-bottom: 1px solid #dbdbdb;
}
.alert-tips-content{
  flex: 1;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 12px;
}
.alert-tips-buttons{
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  height: 50px;
}
.alert-tips-buttons-confirm,
.alert-tips-buttons-cancel{
  width: 40px;
  line-height: 30px;
  height: 30px;
  border: 1px solid #dbdbdb;
  padding: 0 5px;
  border-radius: 3px;
  font-size: 12px;
}
.alert-tips-long-img{
  display: block;
  width: 100%;
  height: 100%;
}
</style>
