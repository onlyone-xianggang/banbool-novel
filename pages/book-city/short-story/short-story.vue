<template>
  <view class="short-story" >
  {{name}}
  </view>
</template>

<script setup >
import {
  ref
} from 'vue';
const name = ref('我是小故事页面')
</script>

<style scoped >
.short-story{
  width: 100%;
  height: 130%;
  background: skyblue;
  border: 1px solid darkred;
}
</style>
