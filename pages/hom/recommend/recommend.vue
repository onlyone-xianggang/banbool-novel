<template>
  <view
    class="recommend"
	:style="{
	  height: tabHeight + 'px'
	}"
	>
    <!-- 强烈推荐的一个轮播图 -->
	<view class="recommend-carousel" >
	  <commend-carousel :dataList='strongCommendList' />
	</view>
	  
	<!-- 华丽的分割线 -->
	<br-line :title="'推荐'" />
	
	<!-- 推荐列表 -->
	<view
	  class="recommend-content"
	  >
	  
	  <view
	    class="recommend-content-list"
		v-for="item in recommendList"
		:key="item.id"
		>
		<!-- 列表左边的图片 -->
		<image
		  class="recommend-content-list-left-img"
		  :src="item.imgSrc"
		  >
		</image>
		<!-- 列表右边的内容 -->
		<view class="recommend-content-list-right-content" >
		  <view class="recommend-content-list-right-content-title">{{item.title}}</view>
		  <view class="recommend-content-list-right-content-bottom" >
		    <view class="recommend-content-list-right-content-bottom-auther" >{{item.novelAuthor}}</view>
			<view
			  class="recommend-content-list-right-content-bottom-bottun"
			  >前往阅读</view>
		  </view>
		</view>
	  </view>
	</view>
  </view>
</template>

<script setup >
import {
  onMounted,
  ref
} from 'vue'
import brLine from '../../../components/bar.vue'
import commendCarousel from '../../../components/commend-carousel.vue'
  
  // tab页的高度
  let tabHeight = ref(0)
  let getWindowHeight = () => {
    let windowAttribute = uni.getSystemInfo()
    windowAttribute.then((data) => {
  	  tabHeight.value = data.screenHeight - data.statusBarHeight - 124
    })
  }
  
  // 模拟数据--强烈推荐
  let strongCommendList = ref([
    {
	  id: '0', // 此书在入驻系统的编号
	  novelSimplePrice: '0我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 小说简介
	  novelTitle: '凡人修仙传', // 小说标题
	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png', // 书的封面图片
	  novelClass: ['玄幻', '穿越', '系统'] // 小说类型
	},
    {
	  id: '1', // 此书在入驻系统的编号
	  novelSimplePrice: '1我小时候被拐卖了。 一起被拐的还有个小姑娘，她长得很漂亮，身上的裙子特别精美。 后来，我遇到警察叔叔埋伏在附近，得知我们快得救了。 当晚，我用自己的', // 小说简介
	  novelTitle: '我前世是人贩子', // 小说标题
	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png', // 书的封面图片
	  novelClass: ['爱情', '神话', '轮回'] // 小说类型
	},
    {
	  id: '2', // 此书在入驻系统的编号
	  novelSimplePrice: '2我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 小说简介
	  novelTitle: '大哥别走', // 小说标题
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg', // 书的封面图片
	  novelClass: ['宠妻狂魔', '玄幻', '无敌', '穿越', '战争', '系统'] // 小说类型
	},
    {
	  id: '3', // 此书在入驻系统的编号
	  novelSimplePrice: '3我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 小说简介
	  novelTitle: '大哥别走', // 小说标题
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg', // 书的封面图片
	  novelClass: ['宠妻狂魔', '无敌', '穿越', '系统'] // 小说类型
	},
    {
	  id: '4', // 此书在入驻系统的编号
	  novelSimplePrice: '4我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 小说简介
	  novelTitle: '大哥别走', // 小说标题
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg', // 书的封面图片
	  novelClass: ['宠妻狂魔', '玄幻', '穿越', '战争'] // 小说类型
	}
  ])
  
  // 模拟数据--推荐
  let recommendList = ref([
    {
      id: 0, // 此书在入驻系统的编号
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png', // 书的封面图片
      title: '一根搅屎棍的成长屎' ,// 小说标题
	  novelAuthor: '陈详溜点拌' // 小说作者
    },
    {
      id: 1, // 此书在入驻系统的编号
      imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg', // 书的封面图片
      title: '遇见你以后' ,// 小说标题
	  novelAuthor: '陈详溜点拌' // 小说作者
    },
    {
      id: 2,
      title: '凡人修仙传',
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      novelAuthor: '陈详溜点拌'
    }
  ])
  
  onMounted(() => {
    getWindowHeight()
  })
  
</script>

<style scoped >
.recommend{
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f7f7f8;
}
.recommend-carousel{
  width: 100%;
  height: auto;
  border-bottom: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
  box-sizing: border-box;
  background-color: #fff;
}
.recommend-content{
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  background-color: #f7f7f8;
}
.recommend-content-list{
  width: 100%;
  height: 80px;
  padding: 10px 18px;
  display: flex;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 8px;
  /* border: 1px solid red; */
}
.recommend-content-list-left-img{
  width: 45px;
  height: 100%;
  display: block;
}
.recommend-content-list-right-content{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  /* border-bottom: 1px solid #dbdbdd; */
}
.recommend-content-list-right-content-title{
  /* width: 100%; */
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: left;
  /* border: 1px solid red; */
}
.recommend-content-list-right-content-bottom{
  flex: 1;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid blue; */
}
.recommend-content-list-right-content-bottom-bottun,
.recommend-content-list-right-content-bottom-auther{
  height: 25px;
  line-height: 8px;
  align-self: center;
  font-size: 10px;
  color: #777;
}
.recommend-content-list-right-content-bottom-bottun{
  border-radius: 15px;
  background-color: rgb(143, 200, 100);
  padding: 0 8px;
  color: #fff;
  line-height: 25px;
  /* font-weight: 700; */
}
</style>
