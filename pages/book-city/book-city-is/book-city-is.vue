<template>
  <view class="book-city-is" >
	  
    <!-- 今日热书 -->
	<view
	  class="book-city-is-hot-books"
	  >
	  <!-- 今日热书标题 -->
	  <view
        class="book-city-is-hot-books-title"
		>
		<view class="book-city-is-hot-books-title-text" >{{boyOrGirlVal[0]}}</view>
		<view class="book-city-is-hot-books-title-right" >更多 ></view>
	  </view>
	  <!-- 今日热书重点推荐 -->
	  <view
	    class="book-city-is-hot-books-top"
		v-for="item in hotBooks"
		:key="item.id"
		>
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
	  <!-- 今日热书推荐 -->
	  <view
	    class="book-city-is-hot-books-bottom">
		<view
		  class="book-city-is-bookshlef-added"
		  v-for="(item, index) in hotBookData"
		  :key="item.id"
		  :style="{
		    width: windowWidth.width + 'px',
			height: windowWidth.height + 'px'
		  }"
		  @longpress="longAddBookshlef(item.id, index)"
		  @click="addOrJump(item.id, index)"
		  >
		  <img
		    class="book-city-is-bookshlef-added-img"
			:src="item.imgSrc"
			:style="{
			  height: windowWidth.imgHeight + 'px'
			}"
			/>
		  <view
			class="book-city-is-bookshlef-added-bootm"
			:style="{
			  height: windowWidth.height - windowWidth.imgHeight + 'px'
			}"
			>
			<view class="book-city-is-bookshlef-added-name" >{{item.title}}</view>
			<view class="book-city-is-bookshlef-added-read" >已阅读到{{item.id}}章</view>
		  </view>
		</view>
	  </view>
	</view>
	
	<!-- 重磅新书 -->
	<view class="book-city-is-hot-books" >
	  <!-- 重磅新书标题 -->
	  <view class="book-city-is-hot-books-title" >
	  	<view class="book-city-is-hot-books-title-text" >{{boyOrGirlVal[1]}}</view>
	  	<view class="book-city-is-hot-books-title-right" >更多 ></view>
	  </view>
	  <!-- 重磅新书推荐列表 -->
	  <view class="heavyweight-list" >
	    <view
		  class="heavyweight-lists"
		  v-for="item in heavyweightBookData"
		  :key="item.id"
		  >
		  <view
		    class="book-city-is-bookshlef-added heavyweight-list-data"
		    v-for="(items, index) in item.datalist"
		    :key="items.id"
		    :style="{
		      width: windowWidth.width + 'px',
		  	  height: windowWidth.height + 'px'
		    }"
		    @longpress="longAddBookshlef(items.id, index)"
		    @click="addOrJump(items.id, index)"
		    >
		    <img
		      class="book-city-is-bookshlef-added-img"
		  	:src="items.imgSrc"
		  	:style="{
		  	  height: windowWidth.imgHeight + 'px'
		  	}"
		  	/>
		    <view
		  	class="book-city-is-bookshlef-added-bootm"
		  	:style="{
		  	  height: windowWidth.height - windowWidth.imgHeight + 'px'
		  	}"
		  	>
		  	<view class="book-city-is-bookshlef-added-name" >{{items.title}}</view>
		  	<view class="book-city-is-bookshlef-added-read" >已阅读到{{items.id}}章</view>
		    </view>
		  </view>
		</view>
	  </view>
	</view>
	
	<!-- 热门推荐 -->
	<view class="book-city-is-hot-books" >
	  <!-- 热门推荐标题 -->
	  <view class="book-city-is-hot-books-title" >
	  	<view class="book-city-is-hot-books-title-text" >{{boyOrGirlVal[2]}}</view>
	  	<view class="book-city-is-hot-books-title-right" >更多 ></view>
	  </view>
	  <!-- 热门推荐推荐列表 -->
	  <view class="popular-book-list" >
	    <view
	      class="book-city-is-popular-book-list"
	      v-for="item in popularBook.slice(0, 3)"
		  :key="item.id"
		  >
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
	  </view>
	</view>
  </view>
</template>

<script setup>
import {
  ref,
  defineProps,
  onMounted
} from 'vue';

defineProps({
  boyOrGirlVal: {
    type: Array,
	default: []
  }
})

// 今日热书列表模拟数据
const hotBooks = ref([
  {
    id: 0,
    title: '凡人修仙传',
    attribute: '玄幻',
    details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
    imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
    auther: '陈详溜点拌',
    textNunmber: '12万',
    isOver: '连载'
  }
])

// 热闹推荐列表模拟数据
const popularBook = ref([
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
    title: '凡人修仙传',
    attribute: '玄幻',
    details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
    imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
    auther: '陈详溜点拌',
    textNunmber: '12万',
    isOver: '连载'
  },
  {
    id: 2,
    title: '凡人修仙传',
    attribute: '玄幻',
    details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
    imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
    auther: '陈详溜点拌',
    textNunmber: '12万',
    isOver: '连载'
  },
  {
    id: 3,
    title: '凡人修仙传',
    attribute: '玄幻',
    details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
    imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
    auther: '陈详溜点拌',
    textNunmber: '12万',
    isOver: '连载'
  }
])

 // 书架测试数据
  const bookshlefDataList = ref([
    {
      id: 0,
      title: '凡人修仙传',
      attribute: '玄幻',
      details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      auther: '陈详溜点拌',
      textNunmber: '12万',
      isOver: '连载',
	  checked: false
    },
    {
      id: 1,
      title: '一根搅屎棍的成长屎',
      attribute: '搞笑',
      details: '我小时候被拐卖了。 一起被拐的还有个小姑娘，她长得很漂亮，身上的裙子特别精美。 后来，我遇到警察叔叔埋伏在附近，得知我们快得救了。 当晚，我用自己的',
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210927-175014-265e.png',
      auther: '陈详溜点拌',
      textNunmber: '100万',
      isOver: '完结',
	  checked: false
    },
    {
      id: 2,
      title: '遇见你以后',
      attribute: '言情',
      details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
      imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
      auther: '陈详溜点拌',
      textNunmber: '9字',
      isOver: '完结',
	  checked: false
    },
	{
	  id: 3,
	  title: '遇见你以后1',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结',
	  checked: false
	},
	{
	  id: 4,
	  title: '遇见你以后1',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结',
	  checked: false
	},
	{
	  id: 5,
	  title: '遇见你以后1',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结',
	  checked: false
	},
	{
	  id: 6,
	  title: '遇见你以后1',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结',
	  checked: false
	},
	{
	  id: 7,
	  title: '遇见你以后1',
	  attribute: '言情',
	  details: '夫君征战东海时，带回一个有孕的鲛人。 鲛人说：“我腹中胎儿是将军的，姐姐可愿与我共侍一夫？” 我不愿与她共侍一夫。 是夜，她死在湖中，一尸两命。 至此，夫君',
	  imgSrc: 'https://gd-filems.dancf.com/gaoding/gaoding/0/295b5bb5-05fe-4248-ba4f-4d1e15b23f89484875.jpg',
	  auther: '陈详溜点拌',
	  textNunmber: '9字',
	  isOver: '完结',
	  checked: false
	}
  ])
  
  // 获取到手机屏的宽度，计算添加书架的宽度
  let windowWidth = ref({width: 0, height: 0})
  let tempNumber = ref(0)
  let reaminNumber = ref(0)
  const hotBookData = ref([])
  const heavyweightBookData = ref([])
  const computedAttribute = () => {
  	let Nodes = uni.getSystemInfo()
  	Nodes.then((data) => {
  	  if (data.screenWidth <= 250) tempNumber.value = 3
  	  if (data.screenWidth > 250 && data.screenWidth <= 350) tempNumber.value = 3
  	  if (data.screenWidth > 350 && data.screenWidth <= 500) tempNumber.value = 4
  	  if (data.screenWidth > 500 && data.screenWidth <= 650) tempNumber.value = 5
  	  if (data.screenWidth > 650 && data.screenWidth <= 800) tempNumber.value = 6
  	  if (data.screenWidth > 800 && data.screenWidth <= 1000) tempNumber.value = 7
  	  if (data.screenWidth > 1000 ) tempNumber.value = 9
  	  windowWidth.value = {
  	    width: ((data.screenWidth - 20) / tempNumber.value - 6),
  		height: ((data.screenWidth - 20) / tempNumber.value - 6) * 1.65,
  		imgHeight: ((data.screenWidth - 20) / tempNumber.value - 6) * 1.25
  	  }
  	  reaminNumber.value = tempNumber.value - (bookshlefDataList.value.length % tempNumber.value) - 1
	  hotBookData.value = bookshlefDataList.value.slice(0, tempNumber.value)
	  heavyweightBookData.value = [
	    {
		  id: 0,
		  datalist: bookshlefDataList.value.slice(0, tempNumber.value)
		},
		{
		  id: 1,
		  datalist: bookshlefDataList.value.slice(tempNumber.value, tempNumber.value * 2)
		}
	  ]
  	})
  }
  
  onMounted(() => {
    computedAttribute()
  })

</script>

<style scoped >
.book-city-is{
  width: 100%;
  min-height: 130%;
  /* background: red; */
  /* border: 1px solid darkred; */
}
.book-city-is-hot-books{
  width: 100%;
  min-height: 200px;
  /* border: 1px solid blue; */
  background: #fff;
  margin-bottom: 8px;
}
.book-city-is-hot-books-title{
  width: 100%;
  height: 32px;
  /* border: 1px solid #000; */
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.book-city-is-hot-books-title-text,
.book-city-is-hot-books-title-right{
  line-height: 32px;
  font-size: 14px;
}
.book-city-is-hot-books-title-right{
  color: #999;
  font-size: 10px;
}
.book-city-is-hot-books-top{
  width: 100%;
  height: 100px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.hand-movement-serch-list-data-left-img{
  width: 75px;
  height: 100px;
  display: block;
  /* border: 1px solid red; */
  background: skyblue;
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
  margin-bottom: 4px;
}
.hand-movement-serch-list-data-right-contents-text{
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 10px;
  line-height: 14px;
  height: 56px;
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
.book-city-is-hot-books-bottom{
  width: 100%;
  min-height: 90px;
  /* border: 1px solid darkred; */
  box-sizing: border-box;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  /* background: #669966; */
}
.book-city-is-bookshlef-added{
  margin-bottom: 8px;
  /* border: 1px solid #eefbea; */
  position: relative;
  /* height: 100px; */
}
.book-city-is-bookshlef-added-img{
  width: 100%;
  /* height: 50px; */
  display: block;
  /* border: 1px solid red; */
}
.book-city-is-bookshlef-added-bootm{
  flex: 1;
  display: flex;
  flex-direction: column;
  /* background-color: #eefbea; */
}
.book-city-is-bookshlef-added-name,
.book-city-is-bookshlef-added-read{
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #555;
  text-align: center;
  /* background-color: rgb(200, 227, 160); */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  font-size: 10px;
  color: #777;
}
.book-city-is-bookshlef-added-name{
  padding: 0 5px;
  padding-top: 2px;
}
.book-city-is-bookshlef-added-read{
  font-size: 9px;
  padding-bottom: 2px;
}
.heavyweight-list{
  width: 100%;
  min-height: 200px;
  /* border: 1px solid red; */
}
.heavyweight-lists{
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
}
.popular-book-list{
  width: 100%;
  height: auto;
  /* background: red; */
  /* border: 1px solid red; */
}
.book-city-is-popular-book-list{
  width: 100%;
  height: auto;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  /* background: blue; */
  margin-bottom: 8px;
}
</style>
