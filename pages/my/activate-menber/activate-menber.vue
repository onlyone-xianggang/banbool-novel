<template>
  <view id="activate-menber" >
    
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
	  <view class="activate-menber-head-title" >VIP会员</view>
	</view>
	
	<!-- content -->
	<view class="activate-menber-body" >
		
	  <!-- 会员卡卡片 -->
	  <view class="activate-menber-body-card" >
		<!-- 卡片签名 -->
		<view class="activate-menber-body-card-name" >
		  <!-- 头像 -->
		  <image
		    class="activate-menber-body-card-name-image"
		    :src="VIPinfo.data.avatarUrl">
		  </image>
		  <!-- 签名 -->
		  <view
		    class="activate-menber-body-card-name-text"
			>
			{{VIPinfo.data.nickName}}
		  </view>
		</view>
		<!-- 未开通状态 -->
		<view
		  class="activate-menber-body-card-no"
		  v-if="VIPinfo.status === 0"
		  >
		  <view class="activate-menber-body-card-no-text" >
		    您暂未开通VIP会员
		  </view>
		  <view class="activate-menber-body-card-no-explain" >
		    开通VIP会员，畅享全书，享受各种福利
		  </view>
		</view>
		<!-- 开通状态 -->
		<view
		  class="activate-menber-body-card-yes"
		  v-if="VIPinfo.status !== 0"
		  >
		  <view class="activate-menber-body-card-yes-text" >
		    {{VIPinfo.VIPtype}}会员
		  </view>
		  <view class="activate-menber-body-card-number" >
		    会员ID: {{VIPinfo.VIPID}} 到期：{{VIPinfo.date}}
		  </view>
		</view>
	  </view>
	  
	  <!-- VIP会员权限 -->
	  <view class="activate-menber-body-VIPauthority" >
	    <view class="activate-menber-body-VIPauthority-title" >
		  <view class="activate-menber-body-VIPauthority-title-text" >
		    VIP会员权益
		  </view>
		  <view
		    class="activate-menber-body-VIPauthority-title-explain"
			@click="isMenberAutthorty = !isMenberAutthorty"
			>
		    查看权益说明>>
		  </view>
		</view>
		<view class="activate-menber-body-VIPauthority-function" >
		  <view
		    class="activate-menber-body-VIPauthority-function-list"
			v-for="item in menberAutorityList"
			:key="item.id"
			>
		    <image
		      :src="item.image"
			  class="activate-menber-body-VIPauthority-function-image">
			</image>
			<view class="activate-menber-body-VIPauthority-function-title" >
			  {{item.title}}
			</view>
			<view class="activate-menber-body-VIPauthority-function-explain" >
			  {{item.explain}}
			</view>
		  </view>
		</view>
	  </view>
	  
	  <!-- 套餐列表 -->
	  <view class="activate-menber-body-package" >
	    <!-- 套餐列表标题 -->
		<view class="activate-menber-body-package-title" >套餐列表</view>
		<!-- 套餐列表 -->
		<view
		  class="activate-menber-body-package-list"
		  >
		  <view
		    class="activate-menber-body-package-list-anly"
			v-for="item in packageList.slice(0, 3)"
			:key="item.id"
			@click="checkPaymentType(item)"
			>
		    <!-- 套餐名称 -->
			<view
			  class="activate-menber-body-package-type"
			  >
			  {{item.type}}
			</view>
		    <!-- 套餐价格 -->
			<view
			  class="activate-menber-body-package-price"
			  >
			  ￥{{item.price}}
			</view>
		    <!-- 套餐说明 -->
			 <view
			  class="activate-menber-body-package-explain"
			  >
			  {{item.explain}}
			</view>
		    <!-- 该套餐为按规定状态 -->
		    <view
			  class="activate-menber-body-package-mongo"
			  v-if="isMongo === item.id"
			  >
		    </view>
		  </view>
		</view>
		<view
		  class="activate-menber-body-package-list"
		  >
		  <view
		    class="activate-menber-body-package-list-anly"
			v-for="item in packageList.slice(3, 6)"
			:key="item.id"
			@click="checkPaymentType(item)"
			>
		    <!-- 套餐名称 -->
			<view
			  class="activate-menber-body-package-type"
			  >
			  {{item.type}}
			</view>
		    <!-- 套餐价格 -->
			<view
			  class="activate-menber-body-package-price"
			  >
			  ￥{{item.price}}
			</view>
		    <!-- 套餐说明 -->
			 <view
			  class="activate-menber-body-package-explain"
			  >
			  原￥{{item.explain}}
			</view>
		    <!-- 该套餐为按规定状态 -->
		    <view
			  class="activate-menber-body-package-mongo"
			  v-if="isMongo === item.id"
			  >
		    </view>
		  </view>
		</view>
	  </view>
	</view>
	
	<!-- 定位在底部的开通会员付款按钮 -->
    <view class="activate-menber-foot" >
	  <!-- 会员服务协议 -->
	  <view class="activate-menber-service" >
	    <view class="activate-menber-service-protocor" >开通会员，表示您同意</view>
	  	<view
	  	  class="activate-menber-service-protocor border1"
	  	  >
	  	  会员服务协议
	  	</view>
	  </view>
	  
	  <view
	    class="activate-menber-open-payment"
		@click="paymentTo('正在拉起支付', '现在处于活动期内，不需要任何充值')"
	    >
	    <image
	      class="activate-menber-open-payment-image"
	      src="../../../static/my/activate-menber/WXpayment.png"
		  >
	    </image>
	    {{paymentInfo.paymentTip}}
	  </view>
	</view>
	
	<!-- 蒙层 -->
	<view
	  class="activateMongo"
	  v-if="isMenberAutthorty"
	  >
	</view>
	<!-- 会员权益 -->
	<view
	  class="activate-menber-authorty-explain"
	  v-if="isMenberAutthorty"
	  >
	  <!-- 关闭会员权益展示面板 -->
	  <view
	    class="activate-menber-authorty-explain-close"
		@click="isMenberAutthorty = !isMenberAutthorty"
		>
		×
	  </view>
	  
	  <!-- 会员权益文本 -->
	  <view class="activte-menber-authorty-explain-title" >
	    权益说明
	  </view>
	  <view
	    class="activate-menber-authorty-explain-contents"
		v-for="item in authortyContents"
		:key="item.id"
		>
	    <view class="activate-menber-authorty-explain-contents-title" >
		  {{item.title}}
		</view>
	    <view>
		  {{item.explain}}
		</view>
	  </view>
	  <view
	    class="activate-menber-authorty-I-kwon"
		@click="isMenberAutthorty = !isMenberAutthorty"
		>
		我知道了
	  </view>
	  
	</view>
	
  </view>
</template>

<script setup >
import {
  ref
} from 'vue'
import {
  paymentTo
} from '../../../utils/utils.js'

  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
  
  // 头部返回按钮
  const backUp = () => {
    uni.switchTab({
      url: '/pages/my/my'
    })
  }
  
  // 读取用户信息
  const VIPinfo = ref(uni.getStorageSync('setStorageUserInfo'))
  console.log(VIPinfo, '272')
  
  // 会员权益说明
  const authortyContents = ref([
    {
	  id: 0,
	  title: '全站畅读',
	  explain: '开通会员后全站阅读没有任何打扰'
	},
	{
	  id: 1,
	  title: '听书特权',
	  explain: '听书上线后将享受无阻碍全站畅听'
	},
	{
	  id: 2,
	  title: '会员标识',
	  explain: '开通VIP后，头像上将展示您尊贵VIP的身份标识'
	},
	{
	  id: 3,
	  title: '新功能',
	  explain: '您的支持，是我们不断前行的动力'
	}
  ])
  
  // 会员权益数据列表
  const menberAutorityList = ref([
    {
	  id: 0,
	  image: '../../../static/my/activate-menber/book.png',
	  title: '全站畅读',
	  explain: '所有书籍'
	},
	{
	  id: 1,
	  image: '../../../static/my/activate-menber/headset.png',
	  title: '无限畅听',
	  explain: '即将上线'
	},
	{
	  id: 2,
	  image: '../../../static/my/activate-menber/crown.png',
	  title: '特权标识',
	  explain: 'VIP标识'
	}
  ])
  
  // 套餐列表
  const packageList = ref([
    {
	  id: 0,
	  type: '1天',
	  price: '0.01', // 已购一次的用户，此栏置灰不可操作
	  explain: '限购一次',
	  isBuy: false,
	  buyDate: '',
	  paymentTip: '0.01元立即付款'
	},
    {
	  id: 1,
	  type: '7天',
	  price: '3.80', // 第二次购买价格恢复成9.9
	  explain: '限购一次',
	  buyDate: '',
	  paymentTip: '3.80元立即付款'
	},
    {
	  id: 2,
	  type: '连续包月',
	  price: '9.98',
	  explain: '到期自动续费，随时取消',
	  buyDate: '',
	  paymentTip: '同意开通自动续费包月并立即付款'
	},
    {
	  id: 3,
	  type: '1个月',
	  price: '15.98',
	  explain: '29.98',
	  buyDate: '',
	  paymentTip: '15.98元立即付款'
	},
    {
	  id: 4,
	  type: '1季度',
	  price: '35.98',
	  explain: '41.98',
	  buyDate: '',
	  paymentTip: '35.98元立即付款'
	},
    {
	  id: 5,
	  type: '1年',
	  price: '138.98',
	  explain: '150.98',
	  buyDate: '',
	  paymentTip: '138.98元立即付款'
	}
  ])
  
  // 选择开通套餐时定位在底部的付款提示
  const paymentInfo = ref(packageList.value[2])
  
  // 选中套餐列表中某项后展示阴影
  let isMongo = ref(2)
  
  // 选中套餐事件
  const checkPaymentType = (val) => {
    console.log(val, '======')
	isMongo.value = val.id
	paymentInfo.value = val
  }
  
  // 会员权益说明展示与否
  let isMenberAutthorty = ref(false)
  
  
</script>

<style scoped >
#activate-menber{
  width: 100vw;
  height: 100vh;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
.activate-menber-body{
  flex: 1;
  /* border: 1px solid red; */
  padding: 8px 8px 0;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 100px;
}
.activate-menber-body-card{
  width: 100%;
  height: 120px;
  /* border: 1px solid red; */
  background-color: #000;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 8px;
  padding: 8px 10px;
  color: #D9C1A4;
  /* background-image: linear-gradient(to bottom, #0E0A0B, #F4E608, #0E0A0B); */
  /* background-image: linear-gradient(to bottom, #0E0A0B, #F4E608); */
  background-image: linear-gradient(to bottom, #0E0A0B 1%, #8FC864 99%);
}
.activate-menber-body-card-name{
  width: 100%;
  height: 40px;
  /* background-color: #fff; */
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.activate-menber-body-card-name-image{
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 50%;
  /* border: 1px solid red; */
}
.activate-menber-body-card-name-text{
  margin-left: 8px;
  font-size: 14px;
}
.activate-menber-body-card-no,
.activate-menber-body-card-yes{
  /* border: 1px solid red; */
  height: 40px;
  margin-top: 25px;
}
.activate-menber-body-card-no-text,
.activate-menber-body-card-yes-text{
  font-size: 16px;
}
.activate-menber-body-card-no-explain,
.activate-menber-body-card-number{
  font-size: 12px;
  line-height: 20px;
}
.activate-menber-body-card-yes{
  display: block;
}
.activate-menber-body-VIPauthority{
  width: 100%;
  height: 125px;
  /* border: 1px solid red; */
  margin-top: 8px;
}
.activate-menber-body-VIPauthority-title{
  width: 100%;
  height: 32px;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.activate-menber-body-VIPauthority-title-text{
  font-weight: 600;
}
.activate-menber-body-VIPauthority-title-explain{
  font-size: 10px;
  color: #666;
}
.activate-menber-body-VIPauthority-function{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.activate-menber-body-VIPauthority-function-list{
  width: 60px;
  height: 88px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 5px 0;
}
.activate-menber-body-VIPauthority-function-image{
  width: 40px;
  height: 40px;
  display: block;
  /* border: 1px solid red; */
  background-color: #EEFBEA;
  padding: 7px;
  box-sizing: border-box;
  border-radius: 50%;
}
.activate-menber-body-VIPauthority-function-title{
  width: 100%;
  height: 24px;
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  font-weight: 600;
}
.activate-menber-body-VIPauthority-function-explain{
  width: 100%;
  height: 14px;
  line-height: 14px;
  font-size: 10px;
  text-align: center;
  color: #666;
  /* background-color: #8FC864; */
}
.activate-menber-body-package{
  width: 100%;
  height: 240px;
  /* border: 1px solid red; */
}
.activate-menber-body-package-title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
}
.activate-menber-body-package-list{
  width: 100%;
  height: 90px;
  /* border: 1px solid pink; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.activate-menber-body-package-list-anly{
  width: 30%;
  height: 100%;
  border: 1px solid #f2f3f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
}
.activate-menber-body-package-type{
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.activate-menber-body-package-price{
  width: 100%;
  height: 30px;
  font-size: 16px;
  color: #F4E70C;
  line-height: 30px;
  text-align: center;
}
.activate-menber-body-package-explain{
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: #F4E70C;
}
.activate-menber-body-package-mongo{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  background: #8FC864;
  opacity: 0.3;
}
.activate-menber-foot{
  width: 100%;
  height: 100px;
  background: #fff;
  /* border-top: 1px solid red; */
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 8px;
  box-sizing: border-box;
  box-shadow: #ccc 1px 1px 10px;
}
.activate-menber-service{
  width: 100%;
  height: 32px;
  /* border: 1px solid red; */
  font-size: 10px;
  display: flex;
  align-items: center;
  color: #666;
}
.activate-menber-service-protocor{
  border-bottom: 1px solid #fff;
  line-height: 10px;
}
.border1{
  margin-left: 5px;
  border-bottom: 1px solid #ccc;
}
.activate-menber-open-payment{
  display: flex;
  justify-content: center;
  font-size: 12px;
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: rgba(143, 200, 100);
  border-radius: 20px;
  color: #fff;
}
.activate-menber-open-payment-image{
  width: 15px;
  height: 15px;
  display: block;
  margin-right: 5px;
}
/* 蒙层、会员权益 */
.activateMongo{
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #000;
  opacity: 0.3;
  left: 0;
  top: 0;
  z-index: 1;
}
.activate-menber-authorty-explain{
  width: 230px;
  height: 290px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 2;
  border-radius: 8px;
  padding: 8px 18px;
  box-sizing: border-box;
}
.activate-menber-authorty-explain-close{
  position: absolute;
  width: 25px;
  height: 25px;
  font-size: 30px;
  line-height: 25px;
  text-align: center;
  top: -25px;
  right: -25px;
  color: #666;
}
/* 会员权益 */
.activte-menber-authorty-explain-title{
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
}
.activate-menber-authorty-explain-contents{
  width: 100%;
  font-size: 12px;
  margin-bottom: 8px;
}
.activate-menber-authorty-explain-contents-title{
  margin-bottom: 3px;
  font-weight: 600;
}
.activate-menber-authorty-I-kwon{
  width: 100%;
  height: 32px;
  background: rgba(41, 50, 26);
  border-radius: 4px;
  background-image: linear-gradient(to right, #3B4C2A 1%, #29321A 99%);
  color: #F4E70C;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
}
</style>