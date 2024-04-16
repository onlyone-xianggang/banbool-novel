<template>
  <view id="instantly-recharge" >
	  
    <!-- 顶部导航栏 -->
    <view
      class="activate-menber-head"
      :style="{
        marginTop: customTop + 'px'
      }"
      >
      <view
        class="activate-menber-head-back"
    	@click="backUp()"
    	>
    	‹
      </view>
      <view class="activate-menber-head-title" >充值</view>
    </view>
	
	<!-- 充值金额选项列表 -->
	<view
	  class="instantly-recharge-contents"
	  >
	  <!-- 余额 -->
	  <view class="instantly-recharge-contents-balance" >
	    余额：
		<image
		  src="../../../static/my/bamboo.png"
		  class="instantly-recharge-contents-balance-image">
		</image>
		<view class="instantly-recharge-contents-balance-text" >
		  {{rechargeBalance}}
		</view>
	  </view>
	  <view class="instantly-recharge-contents-title" >
	    充值金额
	  </view>
	  <view class="instantly-recharge-contents-list" >
	    <view class="instantly-recharge-contents-lists" >
	      <view
		    class="instantly-recharge-contents-list-anly"
			:style="{
			  background: selectColor == item.id ? '#FEF5F4' : '#fff',
			  borderColor: selectColor == item.id ? 'deeppink' : '#ccc'
			}"
		    v-for="item in rechargeList"
		    :key="item.id"
			@click="changeStyle(item)"
		    >
		    <view class="instantly-recharge-contents-list-anly-balance" >
		      <view class="instantly-recharge-contents-list-anly-balance-symbol" >￥</view>
		      <view class="instantly-recharge-contents-list-anly-balance-text" >{{item.amuont}}</view>
		    </view>
		    <view class="instantly-recharge-contents-list-anly-balance-number" >
		    {{item.banboolNumber}}竹节
		    </view>
		    <view
		      class="instantly-recharge-contents-list-anly-balance-give-number"
		  	  v-if="item.addPercentage"
		  	  >
		      +{{item.amuont * 100 * item.addPercentage}}赠竹节
		    </view>
		    <!-- 优惠标识 -->
		    <view
			  class="instantly-recharge-contents-list-anly-balance-activity"
			  v-if="item.addPercentage"
			  >
		      +{{item.addPercentage * 100}}%
		    </view>
		  </view>
		</view>
	  </view>
	  
	  <!-- 立即支付 -->
	  <view
	    class="activate-menber-instantly-payment"
		@click="paymentTo('正在拉起支付', '现在处于活动期内，不需要任何充值')"
	    >
	    <image
	      src="../../../static/my/activate-menber/WXpayment.png"
	  	  class="activate-menber-instantly-payment-image"
	  	>
	    </image>
	    <view class="activate-menber-instantly-payment-text" >立即支付</view>
	  </view>
	  
	  <!-- 提示 -->
	  <view class="instantly-recharge-tips" >
	    <view class="instantly-recharge-tips-title" >温馨提示：</view>
	    <view
	      class="instantly-recharge-tips-list"
	  	v-for="item in tipsList"
	  	:key="item.id"
	  	>
	  	{{item.id}}、{{item.tips}}
	  	<view
	  	  class="instantly-recharge-add-WeChat"
		  v-if="item.id == 2"
	  	  @click="addWeChat('meety4')"
	  	  >
	  	  添加微信客户
	  	</view>
	    </view>
	  </view>
	</view>
	
  </view>
</template>

<script setup >
import {
  paymentTo
} from '../../../utils/utils.js'
import {
  ref
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
  
  // 余额
  let rechargeBalance = ref(0)
  
  // 充值面板列表
  const rechargeList = ref([
    {
	  id: 0,
	  amuont: 1,
	  banboolNumber: 100
	},
    {
	  id: 1,
	  amuont: 3,
	  banboolNumber: 300
	},
    {
	  id: 2,
	  amuont: 5,
	  banboolNumber: 500,
	  addPercentage: 0.2
	},
    {
	  id: 3,
	  amuont: 10,
	  banboolNumber: 1000,
	  addPercentage: 0.3
	},
    {
	  id: 4,
	  amuont: 20,
	  banboolNumber: 2000,
	  addPercentage: 0.4
	},
    {
	  id: 5,
	  amuont: 30,
	  banboolNumber: 3000,
	  addPercentage: 0.5
	},
    {
	  id: 6,
	  amuont: 50,
	  banboolNumber: 5000,
	  addPercentage: 0.6
	},
    {
	  id: 7,
	  amuont: 80,
	  banboolNumber: 8000,
	  addPercentage: 0.7
	},
    {
	  id: 8,
	  amuont: 100,
	  banboolNumber: 10000,
	  addPercentage: 0.8
	},
    {
	  id: 9,
	  amuont: 200,
	  banboolNumber: 20000,
	  addPercentage: 0.9
	},
    {
	  id: 10,
	  amuont: 300,
	  banboolNumber: 30000,
	  addPercentage: 1
	},
    {
	  id: 11,
	  amuont: 500,
	  banboolNumber: 50000,
	  addPercentage: 1.2
	}
  ])
  
  // 选择充值金额时改变已选择充值面板颜色
  let selectColor = ref(2)
  const changeStyle = (val) => {
    selectColor.value = val.id
	console.log(val)
  }
  
  // 提示
  const tipsList = ref([
    {
	  id: 1,
	  tips: '支付会跳转到微信支付页面。'
	},
    {
	  id: 2,
	  tips: '充值会实时到帐，如有延时，请耐心等待。'
	},
    {
	  id: 3,
	  tips: '如遇充值异常，请联系微信客服。'
	},
    {
	  id: 4,
	  tips: '赠竹节与竹节同等使用。'
	}
  ])
  
  // 添加微信客服
  const addWeChat = (value) => {
	uni.setClipboardData({
	  data: value
	})
  }
  
  

</script>

<style scoped >
#instantly-recharge{
  width: 100vw;
  height: 100vh;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.activate-menber-head{
  width: 100%;
  height: 40px;
  /* border: 1px solid red; */
  padding: 0 40px 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.activate-menber-head-back{
  width: 32px;
  height: 40px;
  font-size: 32px;
  line-height: 38px;
  /* border: 1px solid blue; */
}
.activate-menber-head-title{
  flex: 1;
  text-align: center;
  height: 100%;
  line-height: 40px;
  /* border: 1px solid red; */
}
.instantly-recharge-contents{
  flex: 1;
  /* border: 1px solid red; */
  padding: 0 8px;
  box-sizing: border-box;
}
.instantly-recharge-contents-balance{
  color: #666;
  width: 100%;
  height: 40px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  font-size: 14px;
}
.instantly-recharge-contents-balance-image{
  width: 14px;
  height: 14px;
  display: block;
  /* border: 1px solid red; */
  margin-right: 3px;
}
.instantly-recharge-contents-balance-text{
  font-size: 18px;
  height: 14px;
  line-height: 14px;
  /* border: 1px solid red; */
}
.instantly-recharge-contents-title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* border: 1px solid blue; */
  font-size: 14px;
  font-weight: 600;
}
.instantly-recharge-contents-list{
  width: 100%;
  height: 190px;
  overflow: hidden;
  overflow-x: auto;
  /* border: 1px solid blue; */
}
.instantly-recharge-contents-lists{
  display: flex;
  flex-wrap: wrap;
  width: 588px;
  height: 100%;
}
.instantly-recharge-contents-list-anly{
  width: 90px;
  height: 90px;
  border: 1px solid #f0f0f0;
  margin: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
}
.instantly-recharge-contents-list-anly-balance{
  display: flex;
  justify-content: center;
  align-items: center;
}
.instantly-recharge-contents-list-anly-balance-symbol,
.instantly-recharge-contents-list-anly-balance-text{
  font-size: 26px;
  height: 40px;
  font-weight: 600;
  line-height: 50px;
  display: inline-block;
}
.instantly-recharge-contents-list-anly-balance-symbol{
  font-size: 13px;
}
.instantly-recharge-contents-list-anly-balance-number{
  font-size: 12px;
}
.instantly-recharge-contents-list-anly-balance-give-number,
.instantly-recharge-contents-list-anly-balance-activity{
  font-size: 10px;
  color: deeppink;
}
.instantly-recharge-contents-list-anly-balance-activity{
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 14px;
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: deeppink;
  color: #fff;
  text-align: center;
  line-height: 14px;
}
.activate-menber-instantly-payment{
  display: flex;
  justify-content: center;
  font-size: 12px;
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: rgba(143, 200, 100);
  border-radius: 20px;
  color: #fff;
  margin-top: 12px;
}
.activate-menber-instantly-payment-image{
  width: 15px;
  height: 15px;
  display: block;
  margin-right: 5px;
}
.instantly-recharge-tips{
  width: 100%;
  height: auto;
  /* border: 1px solid blue; */
  font-size: 10px;
  color: #666;
  margin-top: 12px;
}
.instantly-recharge-tips-title{
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.instantly-recharge-tips-list{
  line-height: 20px;
}
.instantly-recharge-add-WeChat{
  display: inline;
  color: blue;
}
</style>
