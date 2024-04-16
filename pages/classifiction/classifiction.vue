<template>
  <view class="classifiction">
	<!-- 顶部tab菜单 -->
	<view class="classifiction-tab-menu" >
	  <view
	    class="classifiction-tab-menu-list"
		v-for="item in menuList"
		:key="item.id"
		:style="{
		  color: item.color
		}"
		@click="changeTab(item.id)"
		>
		{{item.name}}
	  </view>
	</view>
	
	<!-- 详情 -->
	<view class="classifiction-contents" >
	  <view
	    class="classifiction-books-list"
	  	v-for="item in classifictionBooksList"
	  	:key="item.id"
		@click="toBookDetails(item.id)"
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
</template>

<script setup>
import {
  ref,
  onMounted
} from 'vue'

// 菜单列表
const menuList = ref([
  {
    id: 0,
	name: '全部',
	attributeName: 'all',
	color: 'rgb(143, 200, 100)'
  },
  {
    id: 1,
	name: '言情',
	attributeName: 'romantic',
	color: '#000'
  },
  {
    id: 2,
	name: '穿越',
	attributeName: 'passThrough',
	color: '#000'
  },
  {
    id: 3,
	name: '系统',
	attributeName: 'system',
	color: '#000'
  },
  {
    id: 4,
	name: '恐怖',
	attributeName: 'terror',
	color: '#000'
  },
  {
    id: 5,
	name: '修仙',
	attributeName: 'xiuxian',
	color: '#000'
  },
  {
    id: 6,
	name: '都市',
	attributeName: 'city',
	color: '#000'
  }
])

// 详情
const classifictionDetails = ref(menuList.value[0].name)

// 精品分类书籍列表模拟数据
const classifictionBooksList = ref([
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
  }
])

// 切换菜单
const changeTab = (i) => {
  menuList.value.map((item) => {
    return item.color = '#000'
  })
  menuList.value[i].color = 'rgb(143, 200, 100)'
  classifictionDetails.value = menuList.value[i].name
  console.log('4545454')
}

// 点击分类详情列表进入书籍详情页面
const toBookDetails = (id) => {
  console.log('我想去查看书籍的详情内容')
  uni.setStorageSync('topage', '../classifiction/classifiction')
  
  uni.redirectTo({
      url: '../book-details/book-details'
  })
}



// 进入页面加载
onMounted(() => {
  console.log('2222')
})
</script>

<style scoped>
.classifiction{
  width: 100vw;
  height: 100vh;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.classifiction-tab-menu{
  width: 100%;
  height: 32px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f8;
  padding: 0 8px;
  box-sizing: border-box;
}
.classifiction-contents{
  width: 100%;
  height: calc(100% - 32px);
  /* border: 1px solid blue; */
  padding: 8px 8px 0;
  box-sizing: border-box;
}

.classifiction-books-list{
  width: 100%;
  height: 100px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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
</style>
