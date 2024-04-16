<template>
  <view id="expend-record" >
    <!-- 顶部导航栏 -->
    <view
      class="expend-record-head"
      :style="{
        marginTop: customTop + 'px'
      }"
      >
      <view
        class="expend-record-head-back"
    	@click="backUp()"
    	>
    	‹
      </view>
      <view class="aexpend-record-head-title" >
	    消费记录
	  </view>
    </view>
	
	<!-- 消费列表 -->
	<view class="expend-record-tab" >
	  <!-- 类型tab -->
	  <view
	    class="expend-record-tab-list"
		v-for="item in expendTypeList"
		:key="item.id"
		@click="changeExpendType(item)"
		>
		{{item.tab}}
	  </view>
	  <!-- 当前选择标示 -->
	  <view
	    class="expend-record-tab-checked"
		:style="{
		  left: checkIndex[tabColor].left
		}"
		>
	  </view>
	</view>
	
	<!-- 记录列表 -->
	<view class="expend-record-contents" >
	  <!-- 没有数据时展示 -->
	  <view
	    class="expend-record-contents-no"
		v-if="isRecord !== null"
		>
	    {{recordType}}
	  </view>
	</view>
	
  </view>
</template>

<script setup >
import {
  ref,
  onMounted
} from 'vue'

  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
  
  // 返回my
  const backUp = () => {
    uni.switchTab({
      url: '/pages/my/my'
    })
  }
  
  // 消费类型
  let tabColor = ref(0)
  const expendTypeList = ref([
    {
	  id: 0,
	  tab: '充值记录'
	},
    {
	  id: 1,
	  tab: '消费记录'
	}
  ])
  
  // 已选择tab标示位置
  const checkIndex = ref([
    {
	  id: 0,
	  left: 'calc(8px + (100% - 16px) / 8)'
	},
    {
	  id: 0,
	  left: 'calc((8px + (100% - 16px) / 8) + ((100% - 16px) / 2))'
	}
  ])
  
  // 是否有消费记录
  let isRecord = ref(true)
  let recordType = ref(null)
  
  // 选择查看消费类型
  const changeExpendType = (val) => {
	  console.log(val, '109')
    tabColor.value = val.id
	console.log(recordType.value = null, '112')
	uni.showLoading({
	  title: '查询' + val.tab + '中'
	})
	setTimeout(() => {
	  uni.hideLoading()
	  recordType.value = '暂时没有' + val.tab
	}, 1200)
  }
  
  onMounted(() => {
    changeExpendType({
	  id: 0,
	  tab: '充值记录'
	})
  })

</script>

<style scoped >
#expend-record{
  width: 100vw;
  height: 100vh;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.expend-record-head{
  width: 100%;
  height: 40px;
  /* border: 1px solid red; */
  padding: 0 40px 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.expend-record-head-back{
  width: 32px;
  height: 40px;
  font-size: 32px;
  line-height: 38px;
  /* border: 1px solid blue; */
}
.aexpend-record-head-title{
  flex: 1;
  text-align: center;
  height: 100%;
  line-height: 40px;
  /* border: 1px solid red; */
}
.expend-record-tab{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
  padding: 0 8px;
  box-sizing: border-box;
  background: #f2f3f8;
  position: relative;
}
.expend-record-tab-list{
  width: 50%;
  height: 100%;
  /* border: 1px solid blue; */
  text-align: center;
  line-height: 40px;
  transition: all 0.3s;
}
.expend-record-contents{
  flex: 1;
  /* border: 1px solid deeppink; */
  overflow: hidden;
  overflow-y: auto;
  background: #f2f3f8;
}
.expend-record-tab-checked{
  width: calc((100% - 16px) / 4);
  height: 2px;
  background: #8FC864;
  position: absolute;
  bottom: 0;
  left: 8px;
  transition: all 0.3s;
}
.expend-record-contents-no{
  width: 100%;
  height: 40px;
  color: #666;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
}
</style>
