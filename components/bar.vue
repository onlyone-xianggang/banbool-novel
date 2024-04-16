<template>
  <view
    class="br"
	:style="{
	  display: isLine ? 'flex' : 'block'
	}"
	>
    <view
	  class="br-line"
	  v-if="isLine"
	  ></view>
	<view class="br-title" >{{title}}</view>
    <view
      class="br-line"
      v-if="isLine"
      ></view>
  </view>
</template>

<script setup>
import {
  defineProps
} from 'vue'

defineProps({
  title: {
  type: String,
  default: '请输入标题'
  },
  isLine: {
    type: Boolean,
	default: false
  }
})

</script>

<style scoped >
.br{
  width: 100%;
  height: 25px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  margin-top: 8px;
  /* background-color: #f7f7f8; */
}
.br-line{
  flex: 1;
  height: 1px;
  background-color: #8fc864;
}
.br-title{
  line-height: 25px;
  /* text-align: center; */
  font-size: 14px;
  padding: 0 12px;
}
</style>
