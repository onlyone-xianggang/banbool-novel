<template>
  <view class="hand-movement-serch-list" >
    <!-- 搜索页顶部提示开始 -->
	<view class="hand-movement-serch-list-top-tips" >
	  <!-- 搜索有结果时 -->
	  <view v-if="serchResultNumber > 0" >
	    <span>您搜索的包含“</span>
	    <span class="hand-movement-serch-list-top-tips-text-color">{{serchKeyword}}</span>
	    <span>”字词的小说共有</span>
	    <span class="hand-movement-serch-list-top-tips-text-color">{{serchResultNumber}}</span>
	    <span>条</span>
	  </view>
	  <!-- 搜索无结果时 -->
	  <span v-else>对不起，没有搜索到任何有价值的东西</span>
	</view>
    <!-- 搜索页顶部提示结束 -->
	
	<!-- 搜索到的小说列表开始 -->
	<view
	  class="hand-movement-serch-list-data"
	  v-for="item in novelList"
	  :key="item.id"
	  >
	  <!-- 搜索到的小说列表左边图片展示 -->
	  <image
	    :src="item.imgSrc"
		class="hand-movement-serch-list-data-left-img"
		></image>
	  <!-- 搜索到的小说列表右边详情介绍 -->
	  <view class="hand-movement-serch-list-data-right-contents" >
	    <view class="hand-movement-serch-list-data-right-contents-title-font-size" >{{item.title}}</view>
		<view class="hand-movement-serch-list-data-right-contents-text" >{{item.details}}</view>
		<view class="hand-movement-serch-list-data-right-contents-bottom" >
		  <view class="hand-movement-serch-list-data-right-contents-bottom-left" >
		    <span>{{item.auther}}</span>
			<span>☞</span>
		    <span>{{item.textNunmber}}</span>
			<span>☞</span>
		    <span>{{item.isOver}}</span>
		  </view>
		  <view class="hand-movement-serch-list-data-right-contents-right" >{{item.attribute}}</view>
		</view>
	  </view>
	</view>
	<!-- 搜索到的小说列表结束 -->
  </view>
</template>

<script setup >
import {
  ref
} from 'vue'
  // 搜索内容
  let serchKeyword = ref('222')
  
  // 搜索到多少条数据
  let serchResultNumber = ref(5)
  
  // 搜索到的小说列表
  let novelList = ref([
    {
	  id: 0,
	  title: '凡人修仙传',
	  attribute: '玄幻',
	  details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
	  auther: '陈详溜点拌',
	  textNunmber: '12万',
	  isOver: '连载'
	},
	{
	  id: 1,
	  title: '一根搅屎棍的成长屎',
	  attribute: '搞笑',
	  details: '我小时候被拐卖了。 一起被拐的还有个小姑娘，她长得很漂亮，身上的裙子特别精美。 后来，我遇到警察叔叔埋伏在附近，得知我们快得救了。 当晚，我用自己的',
	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png',
	  auther: '陈详溜点拌',
	  textNunmber: '100万',
	  isOver: '完结'
	},
	{
	  id: 2,
	  title: '遇见你以后',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结'
	},
	{
	  id: 3,
	  title: '一根搅屎棍的成长屎',
	  attribute: '搞笑',
	  details: '我小时候被拐卖了。 一起被拐的还有个小姑娘，她长得很漂亮，身上的裙子特别精美。 后来，我遇到警察叔叔埋伏在附近，得知我们快得救了。 当晚，我用自己的',
	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png',
	  auther: '陈详溜点拌',
	  textNunmber: '100万',
	  isOver: '完结'
	},
	{
	  id: 4,
	  title: '遇见你以后',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结'
	},
	{
	  id: 5,
	  title: '一根搅屎棍的成长屎',
	  attribute: '搞笑',
	  details: '我小时候被拐卖了。 一起被拐的还有个小姑娘，她长得很漂亮，身上的裙子特别精美。 后来，我遇到警察叔叔埋伏在附近，得知我们快得救了。 当晚，我用自己的',
	  imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png',
	  auther: '陈详溜点拌',
	  textNunmber: '100万',
	  isOver: '完结'
	},
	{
	  id: 6,
	  title: '遇见你以后',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结'
	}
  ])
  
  serchResultNumber.value = novelList.value.length
</script>

<style scoped >
.hand-movement-serch-list{
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  background-color: #f7f7f8;
}
/* 顶部提示 */
.hand-movement-serch-list-top-tips{
  font-size: 12px;
  width: 100%;
  background-color: #fff;
  height: 25px;
  line-height: 22px;
  text-indent: 12px;
}
.hand-movement-serch-list-top-tips-text-color{
  color: red;
}
/* 搜索到的小说列表 */
.hand-movement-serch-list-data{
  width: 100%;
  height: 80px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 8px 12px;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.hand-movement-serch-list-data-left-img{
  width: 55px;
  height: 64px;
  display: block;
}
.hand-movement-serch-list-data-right-contents{
  flex: 1;
  margin-left: 8px;
}
.hand-movement-serch-list-data-right-contents-title-font-size{
  font-size: 12px;
  /* border: 1px solid red; */
  width: 100%;
  height: 14px;
  line-height: 14px;
}
.hand-movement-serch-list-data-right-contents-text{
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 10px;
  line-height: 14px;
  height: 28px;
  text-indent: 12px;
  padding-top: 3px;
  color: #777;
  /* border: 1px solid red; */
}
.hand-movement-serch-list-data-right-contents-bottom{
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: #777;
  line-height: 22px;
  /* border: 1px solid red; */
}
.hand-movement-serch-list-data-right-contents-right{
  border: 1px solid #eefbea;
  height: 16px;
  line-height: 16px;
  text-align: center;
  padding: 0 5px;
  border-radius: 2px;
  font-size: 8px;
}
</style>
