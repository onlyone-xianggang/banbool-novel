<template>
  <view id="my" >
	<!-- 用户信息 -->
	<view class="my-user-info" >
	  <view class="my-user-info-top" >
	    <!-- 用户头像 -->
	    <image
	      class="my-user-info-head"
		  :src="storageUserInfo.data.avatarUrl"
	      >
	    </image>
		<!-- 未登录 -->
		<view
		  class="my-no-login"
		  type="primary"
		  @click="login()"
		  v-if="storageUserInfo.status === 0"
		  >
		  未登录
		</view>
		<!-- <button  type="primary" class='btn' @click="getUserProfile">授权获取用户信息</button> -->
	  </view>
	  
	  <!-- 用户信息右边资料栏 -->
	  <view class="my-user-info-right" >
	    <view class="my-user-info-right-name-and-gender" >
		  <!-- 用户name -->
		  <view class="my-user-info-right-name" >{{storageUserInfo.data.nickName}}</view>
		  <!-- 用户性别标识 -->
		  <image
		    class="my-user-info-right-gender"
			:src="genderList[storageUserInfo.data.gender].indaction"
			/>
		</view>
		<!-- 用户ID -->
		<view class="my-user-info-right-ID" >
		  vipID：{{storageUserInfo.VIPID}}
		</view>
	  </view>
	</view>
	
	<!-- 功能区 -->
	<view
	  class="my-service"
	  >
	  <!-- 登录/会员卡 -->
	  <view class="my-service-login-and-menber" >
		<!-- 登录后展示会员卡片 -->
		<view class="my-service-menber-card">
		  <view class="my-service-menber-card-VIPtext" >
			VIP
		  </view>
		  <view class="my-service-menber-card-contents" >
		    <view class="my-service-menber-card-text" >
		      首次开通会员7天仅需3.8元
		    </view>
		    <view class="my-service-menber-card-text" >
		      畅享无限快乐
		    </view>
		  </view>
		  <view
		    class="my-service-menber-card-activateVIP"
			@click="activateVIP()"
		    >
			立即开通
		  </view>
		</view>
	  </view>
	  
	  <!-- 竹叶币 -->
	  <view class="my-bamboo-leaves-currency" >
	    <view class="my-bamboo-leaves-currency-top" >
		  <view class="my-bamboo-leaves-currency-top-title" >竹节币</view>
		  <view
		    class="my-bamboo-leaves-currency-top-title"
			@click="toInstantlyRecharge()"
			>
			立即充值
		  </view>
		</view>
		<view class="my-bamboo-leaves-currency-foot" >
		  <view class="my-bamboo-leaves-currency-foot-currency right-dashed" >
		    <view class="my-bamboo-leaves-currency-foot-currency-number" >
			  <image
			    src="../../static/my/bamboo.png"
				class="my-bamboo-leaves-currency-foot-currency-number-image"
				>
			  </image>
			  <view class="my-bamboo-leaves-currency-foot-currency-number-text" >
			    0
			  </view>
			</view>
			<view class="my-bamboo-leaves-currency-foot-currency-explain" >
			  竹节（1元=100竹节）
			</view>
		  </view>
		  <view class="my-bamboo-leaves-currency-foot-currency" >
		    <view class="my-bamboo-leaves-currency-foot-currency-number" >
			  <image
			    src="../../static/my/bamboo.png"
				class="my-bamboo-leaves-currency-foot-currency-number-image"
				>
			  </image>
			  <view class="my-bamboo-leaves-currency-foot-currency-number-text" >
			    0
			  </view>
			</view>
			<view class="my-bamboo-leaves-currency-foot-currency-explain" >
			  赠竹节（通过活动获得）
			</view>
		  </view>
		</view>
	  </view>
	  
	  <!-- 广告获取赠竹节 -->
	  <view class="my-bamboo-leaves-currency" >
	    <!-- 赠竹节使用说明 -->
		<view class="my-bamboo-leaves-currency-explain-top" >
		  <view class="my-bamboo-leaves-currency-explain-top-title" >
		    赠竹节
		  </view>
		  <view
		    class="my-bamboo-leaves-currency-explain-bottom-left-buttn-video"
			@click="paymentTo('正在获取广告', '活动期间，不消耗竹节币')"
		    >
		    <view class="my-bamboo-leaves-currency-explain-bottom-left-buttn-video-triangle" ></view>
		    领取
		  </view>
		</view>
	    <!-- 赠竹节获取 -->
		<view class="my-bamboo-leaves-currency-explain-bottom" >
		  <view class="my-bamboo-leaves-currency-explain-top-text" >
		    1个竹节币可以解锁一次会员阅读章节
		  </view>
		  <view
		    class="my-bamboo-leaves-currency-explain-bottom-right-buttn-more"
			@click="paymentTo('正在查询活动详情', '暂时没有更多活动')"
		    >
		    更多活动>>
		  </view>
		</view>
	  </view>
	  
	  <!-- 充值/消费记录 -->
	  <view class="my-bamboo-leaves-currency my-consumption-record" >
	    <view class="my-consumption-record-text" >
		  <image
		    src="../../static/my/record.png"
			class="my-consumption-record-image"
			>
		  </image>
		  <view class="my-consumption-record-text-contents" >
		    充值｜消费记录
		  </view>
		</view>
		<view
		  class="my-consumption-record-buttun"
		  @click="checkExpendRecord()"
		  >
		  前往查看
		</view>
	  </view>
	  
	</view>
	
  </view>
</template>

<script setup >
import {
  ref,
  onMounted
} from 'vue';
import {
  paymentTo
} from '../../utils/utils.js'

  // 用户信息
  let storageUserInfo = ref({})
  
  // 性别
  const genderList = ref([
    {
	  id: 0,
	  gender: 'laughFace',
	  indaction: '../../static/my/laughFace.png'
	},
    {
	  id: 1,
	  gender: 'man',
	  indaction: '../../static/my/man.png'
	},
    {
	  id: 2,
	  gender: 'girl',
	  indaction: '../../static/my/gril.png'
	}
  ])
  
  // 读取本地信息
  if(uni.getStorageSync('setStorageUserInfo')) storageUserInfo.value = uni.getStorageSync('setStorageUserInfo')
  else {
    uni.setStorageSync('setStorageUserInfo', {
      status: 0,
	  VIPID: '无',
	  VIPtype: '白金VIP',
	  date: '2024-10-09',
	  data: {
	    avatarUrl: '/static/my/head.png',
	    nickName: '游客657',
	    gender: 0
	  }
    })
	storageUserInfo.value = uni.getStorageSync('setStorageUserInfo')
  }
  // 登录
  const getUserInfo = () => {
    return new Promise((resolve, reject) => {
	  wx.getUserProfile({
		lang: 'zh_CN',
		desc: '用户登录',
		success: (res) => {
	      console.log('获取到的用户信息', res)
		  resolve(res.userInfo)
		},
		fail: (err) => {
		  console.log(err, '227')
		  reject('拒绝授权')
		}
	  })
	})
  }
  
  const getLogin = () => {
    return new Promise((resolve, reject) => {
	  wx.login({
		success(res) {
		  resolve(res.code)
		},
		fail: (err) => {
		  reject(err)
		}
	  })
	})
  }
  
  const login = () => {
	  
	  
	  uni.request({
	    url: 'https://fanyi.baidu.com/mtpe-individual/multimodal?ext_channel=DuSearch',
		header: {
		  'Content-Type': 'application/json',
		},
		method:'GET',
	    success: (res) => {
	      console.log(res, '275')
	    },
		fail: (err) => {
		  console.log(err, '错256')
		}
	  })
	  return
	  
	let userInfo = getUserInfo()
	let wxCode = getLogin()
	Promise.all([userInfo, wxCode]).then((res) => {
	  //都获取权限成功
	  console.log(res, '成功')
	  uni.showToast({
	  	title: '登录成功',
	  	icon:'none',
	  	duration: 2000
	  })
	  storageUserInfo.value.data = res[0]
	  storageUserInfo.value.status = 1
	  storageUserInfo.value.VIPID = '84576156864523'
	  uni.setStorageSync('setStorageUserInfo', storageUserInfo.value)
	}).catch(err => {
	  console.log(err, '错误')
	  uni.showToast({
	  	title: err + '登录失败',
	  	icon:'none',
	  	duration: 2000
	  })
	})
	
  }
  
  // 开通会员
  const activateVIP = () => {
    uni.redirectTo({
      url: '/pages/my/activate-menber/activate-menber'
    })
  }
  
  // 是否是登录状态
  const showLoningOrActivate = false
  
  // 前往充值
  const toInstantlyRecharge = () => {
    uni.redirectTo({
      url: '/pages/my/instantly-recharge/instantly-recharge'
    })
  }
  
  // 查看消费记录
  const checkExpendRecord = () => {
    uni.redirectTo({
      url: '/pages/my/expend-reord/expend-record'
    })
  }
  

</script>
<style scoped >
#my{
  width: 100vw;
  height: 100vh;
  /* border: 1px solid red; */
  background: rgba(238, 251, 234);
  box-sizing: border-box;
}
.my-top-title{
  width: 100%;
  height: 40px;
  text-align: center;
  background-color: #fff;
  line-height: 40px;
}
.my-user-info{
  width: 100%;
  height: 70px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
}
.my-user-info-top{
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.my-user-info-head{
  display: block;
  /* border: 1px solid red; */
  width: 50px;
  height: 50px;
  background: pink;
}
.my-no-login{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  background: #f0f0f0;
  opacity: 0.5;
  /* border: 1px solid red; */
}
.my-user-info-right{
  flex: 1;
  height: 50px;
  margin-left: 8px;
}
.my-user-info-right-name-and-gender{
  width: 100%;
  height: 25px;
  line-height: 25px;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.my-user-info-right-name{
  padding: 0 3px;
}
.my-user-info-right-gender{
  display: block;
  width: 16px;
  height: 16px;
  /* border: 1px solid red; */
  margin-left: 3px;
}
.my-user-info-right-ID{
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}
.my-service-loging{
  width: auto;
  height: 24px;
  /* border: 1px solid red; */
  line-height: 24px;
  font-size: 14px;
  color: #fff;
}
.my-service{
  width: 100%;
  height: calc(100% - 130px);
  /* border: 1px solid blue; */
  margin-top: 60px;
  box-sizing: border-box;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: rgba(249, 249, 249);
  position: relative;
  /* box-shadow: #000 0 1px 5px; */
  padding: 12px;
}
.my-service-login-and-menber{
  width: 250px;
  height: 50px;
  /* border: 1px solid red; */
  position: absolute;
  left: calc((100% - 250px) / 2);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  top: -50px;
  background: #fff;
  overflow: hidden;
}
.my-service-loging{
  width: 100%;
  height: 100%;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top, #ccc, #999, #ccc);
  display: none;
}
.my-service-menber-card{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #0E0A0B, #FCE885);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-service-menber-card-VIPtext{
  width: 60px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 26px;
  content: attr(data-content);
  display: block;
  position: absolute;
  color: yellow;
  left: 0;
  bottom: -10px;
  z-index: 2;
  -webkit-mask-image: -webkit-gradient(linear, 0 0, 0 bottom, from(yellow), to(rgba(0, 0, 255, 0)));
  /* border: 1px solid red; */
  left: 105px;
}
.my-service-menber-card-contents{
  /* border: 1px solid red; */
  height: 40px;
  padding: 6px 12px;
  box-sizing: border-box;
}
.my-service-menber-card-text{
  width: 100%;
  height: 16px;
  font-size: 10px;
  color: #ccc;
  /* border: 1px solid red; */
}
.my-service-menber-card-activateVIP{
  /* width: 80px; */
  padding: 0 8px;
  height: 26px;
  /* border: 1px solid #fff; */
  line-height: 26px;
  font-size: 12px;
  margin-right: 12px;
  border-radius: 5px;
  color: #666;
  background-image: linear-gradient(to right, #E4D165, #E5E217);
}
.my-bamboo-leaves-currency{
  width: 100%;
  height: 100px;
  background: #fff;
  /* border: 1px solid red; */
  border-radius: 5px;
  box-shadow: #ccc 0 0 3px;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 8px;
}
.my-bamboo-leaves-currency-top{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #ccc;
}
.my-bamboo-leaves-currency-top-title,
.my-bamboo-leaves-currency-explain-top-title{
  /* border: 1px solid red; */
  font-size: 14px;
  color: #333;
  font-weight: 600;
}
.my-bamboo-leaves-currency-top :nth-child(2){
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  background: #8fc864;
  color: #fff;
  font-size: 10px;
}
.my-bamboo-leaves-currency-foot{
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  box-sizing: border-box;
}
.my-bamboo-leaves-currency-foot-currency{
  flex: 1;
}
.right-dashed{
  border-right: 1px dashed #ccc;
}
.my-bamboo-leaves-currency-foot-currency-number{
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid pink; */
}
.my-bamboo-leaves-currency-foot-currency-number-image{
  display: block;
  width: 12px;
  height: 12px;
  /* border: 1px solid blue; */
  margin-right: 3px;
}
.my-bamboo-leaves-currency-foot-currency-number-text{
  color: #000;
}
.my-bamboo-leaves-currency-foot-currency-explain{
  /* border: 1px solid deeppink; */
  font-size: 10px;
  text-align: center;
  height: 15px;
  width: 100%;
  line-height: 15px;
  color: #666;
}
.my-bamboo-leaves-currency-explain-top{
  border-bottom: 1px dashed #ccc;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-bamboo-leaves-currency-explain-top-text{
  font-size: 10px;
  color: #666;
  /* border: 1px solid red; */
  line-height: 18px;
}
.my-bamboo-leaves-currency-explain-bottom{
  width: 100%;
  height: 44px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.my-bamboo-leaves-currency-explain-bottom-left-buttn-video{
  font-size: 10px;
  padding: 0 12px;
  height: 24px;
  /* border: 1px solid red; */
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(143, 200, 100);
  color: #fff;
}
.my-bamboo-leaves-currency-explain-bottom-left-buttn-video-triangle{
  width: 0;
  height: 0;
  border-right: 4px solid transparent;
  border-left: 8px solid #fff;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}
.my-bamboo-leaves-currency-explain-bottom-right-buttn-more{
  /* border: 1px solid red; */
  font-size: 10px;
  text-align: center;
  color: rgba(143, 200, 100);
}
.my-consumption-record{
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-consumption-record-image{
  display: block;
  width: 16px;
  height: 16px;
  /* border: 1px solid red; */
  margin-right: 4px;
}
.my-consumption-record-text{
  display: flex;
  align-items: center;
}
.my-consumption-record-text-contents{
  font-size: 14px;
  font-weight: 600;
}
.my-consumption-record-buttun{
  /* border: 1px solid red; */
  padding: 0 8px;
  height: 24px;
  font-size: 10px;
  line-height: 24px;
  border-radius: 12px;
  color: #fff;
  background: rgba(143, 200, 100);
}
</style>
