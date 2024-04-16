<template>
  <view
    class="bookshlef"
	id="bookshlef"
	:style="{
	  height: tabHeight + 'px'
	}"
   >
	<view class="bookshlef-added-list" >
      <!-- 已加入书架 -->
	  <view
	    class="bookshlef-added"
		v-for="(item, index) in bookshlefDataList"
		:key="item.id"
		:style="{
		  width: windowWidth.width + 'px',
		  height: windowWidth.height + 'px'
		}"
		@longpress="longAddBookshlef(item.id, index)"
		@click="addOrJump(item.id, index)"
		>
		<img
		  class="bookshlef-added-img"
		  :src="item.imgSrc"
		  :style="{
		    height: windowWidth.imgHeight + 'px'
		  }"
		  />
		  <view
		    class="bookshlef-added-bootm"
			:style="{
			  height: windowWidth.height - windowWidth.imgHeight + 'px'
			}"
			>
			<view class="bookshlef-added-name" >{{item.title}}</view>
			<view class="bookshlef-added-read" >已阅读到{{item.id}}章</view>
		  </view>
		<!-- 长按书的封面显示此节点 -->
		<view
		  class="bookshlef-delete"
		  @click="getBookId(item.id)"
		  v-if="item.checked"
		  >
		  <view class="bookshlef-delete-mask" ></view>
		  <view class="bookshlef-delete-checked" >
		    <image
			  src="../../../static/cheked.png"
			  class="bookshlef-delete-checked-image"
			  >
			</image>
		  </view>
		</view>
	  </view>
	  
	  <!-- 添加书架按钮 -->
	  <view
	    :style="{
	  	  width: windowWidth.width + 'px',
	  	  height: windowWidth.height + 'px'
	  	}"
		class="add-bookshlef-button"
		@click="addNewBookshlef"
		v-if="newBookshlefButtonIsShow"
		>
		<image
		  class="add-bookshlef-image"
		  src="../../../static/hom/add.png"
		  >
		</image>
	  </view>
	  
	  <!-- 占位 -->
	  <view
	    :style="{
	  	  width: windowWidth.width + 'px',
	  	  height: windowWidth.height + 'px'
	  	}"
		v-for="(item, i) in reaminNumber"
		:key="i"
		>
	  </view>
	</view>
	
	<!-- 底部删除书架辅助栏 -->
	<view
	  class="bookshlef-bottom"
	  :style="{
	    bottom: bookshlefBottom + 'px'
	  }"
	  >
	  <view
	    class="bookshlef-delete-select-all"
		@click="selectAll"
		>全选</view>
	  <view
	    class="bookshlef-delete-go"
		@click="clickDelete"
		>删除</view>
	  <view
	    class="bookshlef-delete-cancel"
		@click="clickDeleteCancel"
		>取消</view>
	</view>
	
  </view>
</template>

<script setup >
import {
  onMounted,
  ref
} from 'vue'
import {
  getNodeMsg,
  login
} from '../../../utils/utils.js'
  const tabname = 'bookshlef'
  
  // tab页的高度
  let tabHeight = ref(0)
  let getWindowHeight = () => {
    let windowAttribute = uni.getSystemInfo()
    windowAttribute.then((data) => {
  	tabHeight.value = data.screenHeight - data.statusBarHeight - 124
    })
  }
  
  // 书架测试数据
  let bookshlefDataList = ref([
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
    }
  ])
  
  // 获取到手机屏的宽度，计算添加书架的宽度
  let windowWidth = ref({width: 0, height: 0})
  let tempNumber = ref(0)
  let reaminNumber = ref(0)
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
	    width: (data.screenWidth - 20) / tempNumber.value - 6,
		height: ((data.screenWidth - 20) / tempNumber.value - 6) * 1.65,
		imgHeight: ((data.screenWidth - 20) / tempNumber.value - 6) * 1.25
	  }
	  reaminNumber.value = tempNumber.value - (bookshlefDataList.value.length % tempNumber.value) - 1
	})
  }
  
  // 新增书架
  let newBookshlefButtonIsShow = ref(true)
  const addNewBookshlef = () => {
    uni.switchTab({
      url: '/pages/book-city/book-city'
    })
  }
  
  // 长按已添加书架的节点触发事件--进行删除操作
  let bookshlefBottom = ref(-100)
  const longAddBookshlef = (id, i) => {
    console.log('454545454545')
	bookshlefBottom.value = 0
	bookshlefDataList.value[i].checked = !bookshlefDataList.value[i].checked
	newBookshlefButtonIsShow.value = false
	reaminNumber.value = reaminNumber.value + 1
  }
  
  // 点击获取已添加到书架上书的ID--进行删除操作
  const getBookId = (id) => {
    console.log('id', id)
  }
  
  // 选择书架上的书或是要前往阅读
  const addOrJump = (id, i) => {
	if (newBookshlefButtonIsShow.value) {
	  console.log('去阅读')
	} else {
	  bookshlefDataList.value[i].checked = !bookshlefDataList.value[i].checked
	}
  }
  
  // 取消删除
  const clickDeleteCancel = () => {
    bookshlefBottom.value = -100
	newBookshlefButtonIsShow.value = true
	// 清空状态
	reaminNumber.value = reaminNumber.value - 1
	bookshlefDataList.value.map((item) => {
	  return item.checked = false
	})
  }
  
  // 全选
  const selectAll = () => {
    bookshlefDataList.value.map((item) => {
	  return item.checked = true
	})
  }
 
  // 删除--调出二次确认删除框
  let alertTip = ref(false)
  let maskTip = ref(false)
  let longinIs = ref(true)
  let tipsTitleChange = ref('提示')
  let tipsContents = ref('确定要移除这些书吗')
  const clickDelete = () => {
    alertTip.value = true
    maskTip.value = true
  }
  
  // 是否删除--最终选择了什么
  const getChecked = (checked) => {
    console.log(checked)
	if (checked === 'cancel') {
	  clickDeleteCancel()
	  alertTip.value = false
	  maskTip.value = false
	} else {
	  tipsTitleChange.value = '莫慌，正在移除！'
	  longinIs.value = false
	  console.log(tipsContents.value)
	}
  }
  
  // 进入页面时需要加载的一些东西
  onMounted(() => {
	computedAttribute()
	getWindowHeight()
  })
  
</script>

<style scoped >
.header{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border: 1px solid saddlebrown;
  background-color: #000;
}
.bookshlef{
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
}
.bookshlef-added-list{
  width: 100%;
  min-height: 130px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* border: 1px solid red; */
}
.bookshlef-added{
  margin-bottom: 8px;
  border: 1px solid #eefbea;
  position: relative;
}
.bookshlef-added-img{
  width: 100%;
  height: 130px;
  display: block;
}
.bookshlef-added-bootm{
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #eefbea;
}
.bookshlef-added-name,
.bookshlef-added-read{
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
.bookshlef-added-name{
  padding: 0 5px;
  padding-top: 2px;
}
.bookshlef-added-read{
  font-size: 9px;
  padding-bottom: 2px;
}
.add-bookshlef-button{
  border: 1px solid #eefbea;
  box-sizing: border-box;
  background-color: #f7f7f8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-bookshlef-image{
  display: block;
  width: 40%;
  height: 40%;
}
.bookshlef-delete{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-self: center;
}
.bookshlef-delete-mask{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
}
.bookshlef-delete-checked{
  width: 20px;
  height: 20px;
  border: 1px solid blue;
  border-radius: 50%;
  background-color: blue;
  align-self: center;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bookshlef-delete-checked-image{
  width: 80%;
  height: 80%;
  display: block;
}
.bookshlef-bottom{
  width: 100%;
  height: 50px;
  border-top: 1px solid #dbdbdb;
  position: fixed;
  left: 0;
  /* bottom: 0; */
  z-index: 3;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: all 300ms;
}
.bookshlef-delete-select-all,
.bookshlef-delete-go,
.bookshlef-delete-cancel{
  width: 60px;
  height: 30px;
  background-color: blue;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
}
.bookshlef-delete-go{
  background-color: red;
}
.bookshlef-delete-cancel{
  background-color: green;
}
.bookshlef-mask{
  width: 100%;
  height: 100%;
  
}
</style>
