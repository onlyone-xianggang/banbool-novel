<template>
  <view class="read-book" >
    <view
	  class="read-book-seize-a-seat"
	  :style="{
	    width: '100%',
		height: customTop + 'px',
		background: themeColor.setUpInterfaceBgcolor
	  }"
	  ></view>
    <view
      class="read-book-top"
      :style="{
		background: themeColor.setUpInterfaceBgcolor,
		color: themeColor.textColor
      }"
      >
	  <view
	    class="read-book-top-left-back"
		@click="backpage()"
		>
	    ‹
	  </view>
	  <view
	    class="read-book-top-title"
		@click="changetitle()"
		>
		✰ {{hotBooks.chapter}} ✰{{storagePageNum.length}}--{{pageNow}}
		<!-- <view class="read-book-top-title-page" >{{storagePageNum.length}}-{{pageNow}}</view> -->
	  </view>
    </view>
    <view class="read-book-body" >
	  <!-- {{hotBooks[0].chapterCotents[0]}} -->
	  <!-- <contents-page
	    :sendBookCharpter="setBookCharpter"
		:readCharpterBgColor="themeColor"
		/> -->
		<view
		  class="read-book-body-contents-auto"
		  v-for="items in storagePageNum"
		  :key="items.id"
		  :style="{
			left: items.positionLeft + '%',
			backgroundColor: themeColor.bgColor
		  }"
	      @click="ejectSetUp(1)"
		  @touchstart="starting($event)"
		  @touchmove="moveing($event, items.id)"
		  @touchend="ending($event, items.id)"
		  >
		  <view
		    class="read-book-body-contents"
			:style="{
			  left: -(items.readBookNumber * 100) + '%'
			}"
		    >
		  <!-- <view
		    class="read-book-body-contents"
		    > -->
		    <view
		      class="read-book-body-contents-item"
			  v-for="item in setBookCharpter"
			  :style="{
			    color: themeColor.textColor
			  }"
			  >
			  {{item}}。
		    </view>
		  </view>
		</view>
    </view>
	<!-- 底部展示书籍名称 -->
	<view
      class="read-book-foot"
	  :style="{
	    background: themeColor.bgColor,
		color: themeColor.textColor
	  }"
	  >
	  {{pageTitle}} • {{hotBooks.auther}}
	</view>
	
	<!-- 界面设置面板 -->
	<view
	  class="read-book-set-up-interface"
	  :style="{
	    bottom: 0,
		height: 'calc(100% - 32px - ' + customTop + 'px)',
		display: controlInterface.showSetUpInterface
	  }"
	  >
	  <!-- 自主调节界面亮度和设置开关灯效果 -->
	  <view class="read-book-set-up-interface-open-or-close-flex" >
	    <view
	      class="read-book-set-up-interface-open-or-close"
		  :style="{
		    top: controlInterface.showOpenOrClose + 'px',
			color: themeColor.textColor,
			background: themeColor.setUpInterfaceBgcolor
		  }"
		  >
		  <!-- 自主调节亮度条 -->
		  <view
		    class="read-book-set-up-interface-schedule"
		    >
		    <view
		      class="read-book-set-up-interface-schedule-line"
			  :style="{
			    background: themeColor.scheduleColor
			  }"
		      >
			  <view
			    class="read-book-set-up-interface-schedule-buttn"
			    @touchstart="downstart($event)"
			    @touchmove="downmove($event)"
			    @touchend="downend($event)"
			    :style="{
			      left: slidcoordinate + 'px',
				  background: themeColor.textColor
			    }"
			    >
		        <!-- {{slidcoordinate}} -->
		  	  </view>
		    </view>
		  </view>
		  <!-- 开关灯按钮 -->
		  <view
		    class="read-book-set-up-interface-schedule-is-open"
		    @click="isOpenLamp()"
			:style="{
			  background: themeColor.bgColor,
			  color: themeColor.textColor
			}"
		    >
		    {{isOpening}}
		  </view>
	    </view>
	  </view>
	  
	  <!-- 中间填充区 -->
	  <view
	    class="read-book-set-up-interface-flex1"
	    @click="ejectSetUp(2)"
		>
	  </view>
	  
	  <!-- 底部设置功能区 -->
	  <view class="read-book-set-up-interface-foot-flex" >
	    <view
	      class="read-book-set-up-interface-foot"
		  :style="{
		    bottom: controlInterface.showInterFaceFoot + 'px',
			background: themeColor.setUpInterfaceBgcolor
		  }"
	      >
	      <!-- 上下章及目录 -->
	      <view
		    class="read-book-set-up-interface-foot-butuns"
			:style="{
			  color: themeColor.textColor
			}"
			>
	        <view
			  class="read-book-set-up-interface-foot-up-charpter"
			  @click='addReduceCharpter(-1)'
	    	  >
	    	  上一章
	    	</view>
	    	<view
	    	  class="read-book-set-up-interface-foot-up-catalogue"
			  @click='addReduceCharpter(0)'
	    	  >
	    	  目录
	    	</view>
	    	<view
	    	  class="read-book-set-up-interface-foot-next-charpter"
			  @click='addReduceCharpter(1)'
	    	  >
	    	  下一章
	    	</view>
	    	</view>
	    		
	    	<!-- 主题色色卡 -->
	    	<view
	    	  class="read-book-set-up-interface-foot-theme-color-card"
	    	  >
	    	  <view
			    class="read-book-set-up-interface-foot-theme-color-card-text"
				:style="{
				  color: themeColor.textColor
				}"
				>
				背景
			  </view>
	    		  
	    	  <view
	    		class="read-book-set-up-interface-foot-theme-color-cards"
				v-for="(item, i) in colorList"
				:key="i"
	    		:style="{
	    		  background: item.bgColor,
				  display: item.is
	    		}"
				@click="changeThemeColor(i)"
	    		>
				{{item.theme}}
	    	  </view>
	    	</view>
	    		
	    	<!-- 加入书架 -->
	    	<view class="read-book-set-up-interface-foot-add-bookshelf" >
	    	  <view
	    		class="add-bookshelf"
	    		@click="addBookShelf()"
	    		>
	    	  <image
	    		class="is-add-bookshelf"
	    		:src="hotBooks.isAddBookShelf == 0 ? isAddBookShelf[0].image : isAddBookShelf[1].image"
	    		>
	    	  </image>
	    	  <view
	    		class="is-add-bookshelf-text"
	    		:style="{color: hotBooks.isAddBookShelf == 0 ? isAddBookShelf[0].textColor : isAddBookShelf[1].textColor}"
	    		>
	    		{{hotBooks.isAddBookShelf == 0 ? isAddBookShelf[0].name : isAddBookShelf[1].name}}
	    	  </view>
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
  onMounted,
  nextTick
} from 'vue'
import {
  getNodeMsg
} from '../../utils/utils.js'

  // 小程序右上角胶囊信息
  let custom = uni.getMenuButtonBoundingClientRect()
    
  // 获取设备信息
  let system = uni.getSystemInfoSync()
    
  // 胶囊按钮与顶部的距离
  let customTop = custom.top
  
  // 获取本地存储的路由
 //  localStorage.setItem({
 //    key: 'topage',
	// value: '../my/my'
 //  })
 //  let toPage = localStorage.getItem({
 //    key: 'topage',
	// success: function(data) {
	//   console.log(data.value)
	// }
 //  })
  
  // 返回上一页
  const backpage = () => {
    // uni.navigateTo({
    // 	url: '../my/my'
    // })
	// uni.redirectTo({
	// 	url: '../my/my'
	// })
	console.log('-----')
	uni.redirectTo({
		url: uni.getStorageSync('toReadPage')
		// url: '../my/my'
	})
  }
  
  // 这里是模拟数据，为后端请求过来
  const hotBooks = ref(
    {
      id: 0,
      title: '最强装逼打脸系统',
      attribute: ['玄幻', '系统', '穿越', '修仙'],
      details: '我住在上铺，翻身的时候衣服不小心掉了下去，麻烦舍友帮我捡起来。 「你的内衣怎么坏了？」 「哦，被客人扯坏了。」 舍友表情一僵，默默地将衣服还给我。 后来我盛情邀请她们去我工作的地方。 一开始她们婉言相拒。 后来她们哭着喊着求我手下留情。 最后，她们都舒坦了…… 1. 眼看着宿管要锁门，我玩了命地往里跑。 在宿管的白眼中，我顺利上楼。', // 列表里这里传文章的概要
      imgSrc: 'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210317-162249-76d7.png',
      auther: '太上布衣',
      textNunmber: '12万',
	  introduction: ' “年轻人，当年我开始装逼的时候，你们还只是一滴液体！”“仙子，随在下走一趟，保证带你装逼带你飞，带你一起嘿嘿嘿！”身披狂徒铠甲，肩扛日炎斗篷。左手无尽之刃，右手诛仙神剑。横扫修仙界无敌手，就问一声还有谁？装逼如风，常伴吾身！长路漫漫，装逼相伴！徐缺踏上了一条装逼之路，每天不是在装逼，就是在去装逼的路上！',
      isOver: '连载',
	  chapter: '第一章',
	  readChapter: 0,
	  isAddBookShelf: 0,
	  charpterTitleList: [
	    {
		  id: 0,
		  name: '第一章',
		  title: '一缕刺眼的阳光'
		},
	    {
		  id: 1,
		  name: '第二章',
		  title: '二缕刺眼的阳光'
		},
	    {
		  id: 2,
		  name: '第三章',
		  title: '三缕刺眼的阳光'
		},
	    {
		  id: 3,
		  name: '第四章',
		  title: '四缕刺眼的阳光'
		}
	  ],
	  chapterCotents:[
	  {
	    id: '0',
		name: '第一章',
		contents: '一缕刺眼的阳光照耀下，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。“我不是出车祸死了么？怎么又活过来了？”他有些惊讶，可还没来得及搞清楚自己是如何死里逃生，眼前的景象便使得他立刻激动的瞪大了眼睛。随即就懵逼了！只见一名长得像仙女一般的古装女孩，竟对准他躺着的草丛位置，作势就要蹲下来……???.xXbiQuGe.c0m天呐！这女孩，该不会是想要……不会吧？不能够呀！而且我这么光明磊落的一个人，也不可能偷看呀…… 徐缺瞪大了眼睛。眼看那女孩就要蹲下来，徐缺紧忙将脑袋从茂密的草丛堆中使劲钻了出来，大喊道：“姑娘，你这是干嘛，可不能随地大小便呀！”场面顿时一僵。女子半蹲在地上，整个人也僵化了，然后…… “啊……” 她发出了一声尖叫，惊慌失措的放下裙摆，整个人噌的一下从原地弹起，竟踩着一把利剑横空飞掠而去。我靠，这是啥？御剑飞天？原来，真他妈是仙女啊？徐缺顿时吓了一跳，与此同时，脑袋里也突然涌出一大段陌生却熟悉的记忆，宛若与生俱来经历过的一般。穿越！我他妈穿越了！立刻读档脑海当中本不属于自己的记忆，徐缺理清了一切。这里竟然是一个修仙世界，就像眼前这个愤怒得御剑飞天的小仙女一般，人是可以修炼各种功法成仙的。而自己这幅身体的主人竟是当今驸马爷，可这位驸马爷却是十足的倒霉蛋。他本身只是个穷苦孤儿，却拥有千年难得一遇的独特灵根。年幼时，在机缘下被皇帝看中招为驸马，提供无数天材地宝给他修炼，短短六年间便凝结腹丹，踏入了金丹期。当他踏入金丹期的那一天，那位美得妖艳的公主，七天七夜，竟将他浑身修为抢夺一空，甚至连灵根天赋也被一并夺走。天才驸马爷才刚新婚便沦为废人，已经没有了丝毫利用价值的他被低调连夜送出宫外，在发配到边疆的路上被皇帝安排的人一掌拍死，气绝身亡，最后被弃尸于此。“唉，可惜了！”理清了这些记忆，徐缺满脸遗憾之色，摇头叹了口气，懊恼道：“该死的！怎么就没提早一步。？”想起那位美艳公主，徐缺就愈发觉得可惜，来迟了一步啊！“大胆淫贼，竟然敢偷窥本姑娘，给我纳命来！”这时，一道娇斥声突然传来，竟是那位仙女去而复返。她满脸通红的羞愤，眼神当中却带着无尽的杀意，脚下还踩着那柄寒芒凌冽的利剑，朝徐缺杀了过来。“我靠，仙子，这绝对是误会啊！明明是你一屁股蹲在了我躺着的地方，还有……你要杀我泄愤没问题，可你这个样子，让我很没有逃跑的动力啊！”徐缺大喊了一声，拔腿就跑。女子顿时脸色一变，面红耳赤的将裙摆一提，呸了一声，怒斥道：“淫贼找死。”脚下利剑飞行的速度陡然加快，嗖嗖朝着徐缺杀去。飞奔狂跑间，徐缺疯狂地想着逃命的办法。突然之间，脑中灵光一闪。当即就脚步一停，伸手从怀里摸出一块熟悉的令牌，转身就对着女子大喊道：“大胆妖女，我乃当今火元国驸马，你敢对我不敬？小心我诛你九族！”就在这时，徐缺脑袋里就突然就响起一连串的系统提示音。“恭喜宿主‘徐缺’激活装逼打脸系统，本系统将为您保驾护航，助你装逼助你飞！”“恭喜宿主‘徐缺’装逼成功，奖励装逼值1点，是否进入商城兑换？”“系统检测到宿主‘徐缺’能力低弱，难以在本世界难度下生存，特奖励新手大礼包一份，是否查看礼包？”在提示音响起的同时，眼前还弹出一道光幕窗口，上面显示着几条信息数据。“宿主：徐缺 境界：凡人 经验值：0/100 装逼值：1点 功法：无 职业：无 地位：东荒大陆火元国驸马……”“嘶……哈哈哈……”徐缺先是倒吸了一口气，紧跟着难以抑制的放声狂笑起来。这什么装逼打脸系统，一听就是为我量身打造，助我叼破天际的逆天系统啊！这下可有得玩了。“淫贼，死到临头，你有什么好笑的？”突然，一声娇斥把徐缺从狂喜中拉了回来。女子不知何时已经站在他面前十几米处，手里面拿着飞剑指着他，水灵灵的大眼睛却警惕狐疑的盯着他。徐缺眼眸微眯，想了一下，突然冷笑道：“我乃是火元国的驸马爷！连尊贵的皇室公主我都想看就看，你也就颇有姿色而已，本驸马爷愿意看你那是你的福气！别以为拿着飞剑就能喊打喊杀，本驸马可是百年难得一遇的修仙天纵奇才，还会怕你这个小丫头片子？来来来……想要跟我动手是不是？有种你靠近我一步试试？”“叮，恭喜宿主‘徐缺’装逼成功，奖励装逼值1点。”果不其然，徐缺耳边那只有自己才听得到的系统提示音再度响起，他忍不住再度大笑了起来。原来这装逼打脸系统真的是顾名思义，只要装逼就能获得装逼值，就能升级，就能获得系统的种种奖励……“对了，好像还有个礼包。”徐缺眼中陡然一亮，用意识喊道：“查看礼包。”顿时，眼前光幕窗口的画面一变，出现了一个方形礼盒，礼盒被打开，几道流光跃出，一闪而逝。“恭喜宿主‘徐缺’获得初阶经验丹，服用可得一万经验值。”“恭喜宿主‘徐缺’获得初阶神行遁走符两张，使用后可瞬间移动到方圆五公里之外的任何地方。”“恭喜宿主‘徐缺’获得初阶《太古五行诀》。”“叮，检测到宿主‘徐缺’灵根残缺，不满足修炼条件，系统将为您补全所有灵根。”当即，徐缺感觉体内像被一股电流贯穿，头皮瞬间发麻。可紧随而至的是一种舒畅感，浑身毛孔像被彻底打开，贪婪的汲取四方灵气。轰！很快，他感觉到自己的身体发生了翻天覆地的变化，变得与大自然更加亲近，仿佛能融入万物，掌控万物。可他很清楚这种感觉是多么熟悉，当年天火灵根还没被公主夺走时，便是对火焰有如此亲切的感觉，而今系统不仅将他的天火灵根修复，更是补全了其他属性的灵根。金木水火土，一下子五种灵根都齐了，而且每一条皆是最上乘的“天”级。我了个去，这是要逆天啊！想到这，徐缺终于忍不住振臂高呼：“系统在手，天下我有，什么狗屁火元国公主皇帝，等我徐缺升级归来，就把你们全踩在脚下，踏得粉碎。”“大胆淫贼，既然自称是火元国的驸马，竟还敢口出狂言，妄图弑君？”旁边女子有点听傻了，这驸马失心疯了吗？竟敢说出这等大逆不道的话来。“叮，恭喜宿主‘徐缺’装逼成功，获得装逼值1点。”徐缺这才缓过神来，嘴角微微一抽，妈的，顾着装逼展望未来，差点忘记眼下这个麻烦，得赶紧想办法跑路才行。“对了，经验丹！”他突然想起新手大礼包中还有一颗初阶经验丹。没有丝毫迟疑，紧忙用意念操作系统界面，打开一个包裹，三件物品赫然出现在其中。“使用，使用。”徐缺盯住其中两样物品，心中大喊。脑海里顿时传来一连串系统提示音：“叮，恭喜宿主‘徐缺’修炼《太古五行诀》成功。”“叮，宿主‘徐缺’服用了初阶经验丹，获得一万经验值。”“恭喜宿主‘徐缺’升级，当前境界炼气期一层。”“恭喜宿主‘徐缺’升级，当前境界炼气期二层。”“恭喜宿主‘徐缺’升级，当前境界炼气期三层。”……“恭喜宿主‘徐缺’升级，当前境界炼气期十层。”短短数息之间，徐缺从手无缚鸡之力的凡人变成修仙者，直接冲刺到炼气期十层，距离筑基期仅仅一步之差。而且他现在的实力，竟比正常的炼气期十层还要强大无数。原因就是他拥有了五条天灵根，这就等于一个人拥有了寻常人五倍的实力。甚至在这五种不同灵气的相生相克属性下，爆发出来的力量就远远不止五倍那么简单。“这回可真是没话说了，我不无敌谁无敌？”徐缺内心止不住激动起来。但这时，对面那女子却是挥舞起一道流光，划过云霄，锋芒毕露的剑刃眨眼间如毒蛇般窜了过来。“我靠，仙子，我只是叫你这个小美人上前来给本驸马爷好好瞅瞅的，谁让你出剑了？你这是偷袭！是暗算！”徐缺见着飞剑袭来，顿时吓了一大跳，当即张口破骂。可骂归骂，脚下的动作却一点也不含糊，顺势往后一滑，手指尖竟凝出一缕水元灵气，轻轻弹在迎面掠来的剑刃上。“当！”一声颤音脆鸣，利剑被他弹飞而出。“这……怎么可能？”女子顿时呆住了，宗门里能如此轻巧破解这一剑的，除去那些修为高深莫测的师叔伯不说，至少也得筑基期六层的那些师兄姐才能做到呀！“我就纳闷了，都说了刚才的事是误会，你还老是纠缠不清，居然还想杀我？别以为你长得像仙女我就不打你，反正刚刚也没看清楚，这回我就光明正大的看一次。”徐缺恼火骂道，脚下禹步踏出，土元灵气顿时融入大地，速度猛然倍增，眨眼间便出现在女子面前。紧跟着，一缕水元灵气涌出掌心，环绕四方，女子还未来得及反应，当场就被禁锢。“淫……淫贼，你想干什么？”女子大惊失色，感觉体内的火元灵气被全面压制。“嘿嘿！既然你都叫我淫贼了？那我可不能白白背这个锅。”徐缺一脸贱笑，眉毛一挑，走向前去！网页版章节内容慢，请下载爱阅小说app阅读最新内容“沈兄！”“嗯！”沈长青走在路上，有遇到相熟的人，彼此都会打个招呼，或是点头。但不管是谁。每个人脸上都没有多余的表情，仿佛对什么都很是淡漠。对此。沈长青已是习以为常。因为这里是镇魔司，乃是维护大秦稳定的一个机构，主要的职责就是斩杀妖魔诡怪，当然也有一些别的副业。可以说。镇魔司中，每一个人手上都沾染了许多的鲜血。当一个人见惯了生死，那么对很多事情，都会变得淡漠。刚开始来到这个世界的时候，沈长青有些不适应，可久而久之也就习惯了。镇魔司很大。能够留在镇魔司的人，都是实力强横的高手，或者是有成为高手潜质的人。沈长青属于后者。其中镇魔司一共分为两个职业，一为镇守使，一为除魔使。任何一人进入镇魔司，都是从最低层次的除魔使开始，然后一步步晋升，最终有望成为镇守使。沈长青的前身，就是镇魔司中的一个见习除魔使，也是除魔使中最低级的那种。拥有前身的记忆。他对于镇魔司的环境，也是非常的熟悉。没有用太长时间，沈长青就在一处阁楼面前停下。跟镇魔司其他充满肃杀的地方不同，此处阁楼好像是鹤立鸡群一般，在满是血腥的镇魔司中，呈现出不一样的宁静。此时阁楼大门敞开，偶尔有人进出。沈长青仅仅是迟疑了一下，就跨步走了进去。进入阁楼。环境便是徒然一变。一阵墨香夹杂着微弱的血腥味道扑面而来，让他眉头本能的一皱，但又很快舒展。镇魔司每个人身上那种血腥的味道，几乎是没有办法清洗干净1。'
	  },
	  {
	    id: '1',
		name: '第二章',
		contents: '二缕刺眼的阳光照耀下，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。年轻人，当年我开始装逼的时候，你们还只是一滴液体！”“仙子，随在下走一趟，保证带你装逼带你飞，带你一起嘿嘿嘿！”身披狂徒铠甲，肩扛日炎斗篷。“我不是出车祸死了么？怎么又活过来了？”他有些惊讶，可还没来得及搞清楚自己是如何死里逃生，眼前的景象便使得他立刻激动的瞪大了眼睛。随即就懵逼了！只见一名长得像仙女一般的古装女孩，竟对准他躺着的草丛位置，作势就要蹲下来……???.xXbiQuGe.c0m天呐！这女孩，该不会是想要……不会吧？不能够呀！而且我这么光明磊落的一个人，也不可能偷看呀…… 徐缺瞪大了眼睛。眼看那女孩就要蹲下来，徐缺紧忙将脑袋从茂密的草丛堆中使劲钻了出来，大喊道：“姑娘，你这是干嘛，可不能随地大小便呀！”场面顿时一僵。女子半蹲在地上，整个人也僵化了，然后…… “啊……” 她发出了一声尖叫，惊慌失措的放下裙摆，整个人噌的一下从原地弹起，竟踩着一把利剑横空飞掠而去。我靠，这是啥？御剑飞天？原来，真他妈是仙女啊？徐缺顿时吓了一跳，与此同时，脑袋里也突然涌出一大段陌生却熟悉的记忆，宛若与生俱来经历过的一般。穿越！我他妈穿越了！立刻读档脑海当中本不属于自己的记忆，徐缺理清了一切。这里竟然是一个修仙世界，就像眼前这个愤怒得御剑飞天的小仙女一般，人是可以修炼各种功法成仙的。而自己这幅身体的主人竟是当今驸马爷，可这位驸马爷却是十足的倒霉蛋。他本身只是个穷苦孤儿，却拥有千年难得一遇的独特灵根。年幼时，在机缘下被皇帝看中招为驸马，提供无数天材地宝给他修炼，短短六年间便凝结腹丹，踏入了金丹期。当他踏入金丹期的那一天，那位美得妖艳的公主，七天七夜，竟将他浑身修为抢夺一空，甚至连灵根天赋也被一并夺走。天才驸马爷才刚新婚便沦为废人，已经没有了丝毫利用价值的他被低调连夜送出宫外，在发配到边疆的路上被皇帝安排的人一掌拍死，气绝身亡，最后被弃尸于此。“唉，可惜了！”理清了这些记忆，徐缺满脸遗憾之色，摇头叹了口气，懊恼道：“该死的！怎么就没提早一步。？”想起那位美艳公主，徐缺就愈发觉得可惜，来迟了一步啊！“大胆淫贼，竟然敢偷窥本姑娘，给我纳命来！”这时，一道娇斥声突然传来，竟是那位仙女去而复返。她满脸通红的羞愤，眼神当中却带着无尽的杀意，脚下还踩着那柄寒芒凌冽的利剑，朝徐缺杀了过来。“我靠，仙子，这绝对是误会啊！明明是你一屁股蹲在了我躺着的地方，还有……你要杀我泄愤没问题，可你这个样子，让我很没有逃跑的动力啊！”徐缺大喊了一声，拔腿就跑。女子顿时脸色一变，面红耳赤的将裙摆一提，呸了一声，怒斥道：“淫贼找死。”脚下利剑飞行的速度陡然加快，嗖嗖朝着徐缺杀去。飞奔狂跑间，徐缺疯狂地想着逃命的办法。突然之间，脑中灵光一闪。当即就脚步一停，伸手从怀里摸出一块熟悉的令牌，转身就对着女子大喊道：“大胆妖女，我乃当今火元国驸马，你敢对我不敬？小心我诛你九族！”就在这时，徐缺脑袋里就突然就响起一连串的系统提示音。“恭喜宿主‘徐缺’激活装逼打脸系统，本系统将为您保驾护航，助你装逼助你飞！”“恭喜宿主‘徐缺’装逼成功，奖励装逼值1点，是否进入商城兑换？”“系统检测到宿主‘徐缺’能力低弱，难以在本世界难度下生存，特奖励新手大礼包一份，是否查看礼包？”在提示音响起的同时，眼前还弹出一道光幕窗口，上面显示着几条信息数据。“宿主：徐缺 境界：凡人 经验值：0/100 装逼值：1点 功法：无 职业：无 地位：东荒大陆火元国驸马……”“嘶……哈哈哈……”徐缺先是倒吸了一口气，紧跟着难以抑制的放声狂笑起来。这什么装逼打脸系统，一听就是为我量身打造，助我叼破天际的逆天系统啊！这下可有得玩了。“淫贼，死到临头，你有什么好笑的？”突然，一声娇斥把徐缺从狂喜中拉了回来。女子不知何时已经站在他面前十几米处，手里面拿着飞剑指着他，水灵灵的大眼睛却警惕狐疑的盯着他。徐缺眼眸微眯，想了一下，突然冷笑道：“我乃是火元国的驸马爷！连尊贵的皇室公主我都想看就看，你也就颇有姿色而已，本驸马爷愿意看你那是你的福气！别以为拿着飞剑就能喊打喊杀，本驸马可是百年难得一遇的修仙天纵奇才，还会怕你这个小丫头片子？来来来……想要跟我动手是不是？有种你靠近我一步试试？”“叮，恭喜宿主‘徐缺’装逼成功，奖励装逼值1点。”果不其然，徐缺耳边那只有自己才听得到的系统提示音再度响起，他忍不住再度大笑了起来。原来这装逼打脸系统真的是顾名思义，只要装逼就能获得装逼值，就能升级，就能获得系统的种种奖励……“对了，好像还有个礼包。”徐缺眼中陡然一亮，用意识喊道：“查看礼包。”顿时，眼前光幕窗口的画面一变，出现了一个方形礼盒，礼盒被打开，几道流光跃出，一闪而逝。“恭喜宿主‘徐缺’获得初阶经验丹，服用可得一万经验值。”“恭喜宿主‘徐缺’获得初阶神行遁走符两张，使用后可瞬间移动到方圆五公里之外的任何地方。”“恭喜宿主‘徐缺’获得初阶《太古五行诀》。”“叮，检测到宿主‘徐缺’灵根残缺，不满足修炼条件，系统将为您补全所有灵根。”当即，徐缺感觉体内像被一股电流贯穿，头皮瞬间发麻。可紧随而至的是一种舒畅感，浑身毛孔像被彻底打开，贪婪的汲取四方灵气。轰！很快，他感觉到自己的身体发生了翻天覆地的变化，变得与大自然更加亲近，仿佛能融入万物，掌控万物。可他很清楚这种感觉是多么熟悉，当年天火灵根还没被公主夺走时，便是对火焰有如此亲切的感觉，而今系统不仅将他的天火灵根修复，更是补全了其他属性的灵根。金木水火土，一下子五种灵根都齐了，而且每一条皆是最上乘的“天”级。我了个去，这是要逆天啊！想到这，徐缺终于忍不住振臂高呼：“系统在手，天下我有，什么狗屁火元国公主皇帝，等我徐缺升级归来，就把你们全踩在脚下，踏得粉碎。”“大胆淫贼，既然自称是火元国的驸马，竟还敢口出狂言，妄图弑君？”旁边女子有点听傻了，这驸马失心疯了吗？竟敢说出这等大逆不道的话来。“叮，恭喜宿主‘徐缺’装逼成功，获得装逼值1点。”徐缺这才缓过神来，嘴角微微一抽，妈的，顾着装逼展望未来，差点忘记眼下这个麻烦，得赶紧想办法跑路才行。“对了，经验丹！”他突然想起新手大礼包中还有一颗初阶经验丹。没有丝毫迟疑，紧忙用意念操作系统界面，打开一个包裹，三件物品赫然出现在其中。“使用，使用。”徐缺盯住其中两样物品，心中大喊。脑海里顿时传来一连串系统提示音：“叮，恭喜宿主‘徐缺’修炼《太古五行诀》成功。”“叮，宿主‘徐缺’服用了初阶经验丹，获得一万经验值。”“恭喜宿主‘徐缺’升级，当前境界炼气期一层。”“恭喜宿主‘徐缺’升级，当前境界炼气期二层。”“恭喜宿主‘徐缺’升级，当前境界炼气期三层。”……“恭喜宿主‘徐缺’升级，当前境界炼气期十层。”短短数息之间，徐缺从手无缚鸡之力的凡人变成修仙者，直接冲刺到炼气期十层，距离筑基期仅仅一步之差。而且他现在的实力，竟比正常的炼气期十层还要强大无数。原因就是他拥有了五条天灵根，这就等于一个人拥有了寻常人五倍的实力。甚至在这五种不同灵气的相生相克属性下，爆发出来的力量就远远不止五倍那么简单。“这回可真是没话说了，我不无敌谁无敌？”徐缺内心止不住激动起来。但这时，对面那女子却是挥舞起一道流光，划过云霄，锋芒毕露的剑刃眨眼间如毒蛇般窜了过来。“我靠，仙子，我只是叫你这个小美人上前来给本驸马爷好好瞅瞅的，谁让你出剑了？你这是偷袭！是暗算！”徐缺见着飞剑袭来，顿时吓了一大跳，当即张口破骂。可骂归骂，脚下的动作却一点也不含糊，顺势往后一滑，手指尖竟凝出一缕水元灵气，轻轻弹在迎面掠来的剑刃上。“当！”一声颤音脆鸣，利剑被他弹飞而出。“这……怎么可能？”女子顿时呆住了，宗门里能如此轻巧破解这一剑的，除去那些修为高深莫测的师叔伯不说，至少也得筑基期六层的那些师兄姐才能做到呀！“我就纳闷了，都说了刚才的事是误会，你还老是纠缠不清，居然还想杀我？别以为你长得像仙女我就不打你，反正刚刚也没看清楚，这回我就光明正大的看一次。”徐缺恼火骂道，脚下禹步踏出，土元灵气顿时融入大地，速度猛然倍增，眨眼间便出现在女子面前。紧跟着，一缕水元灵气涌出掌心，环绕四方，女子还未来得及反应，当场就被禁锢。“淫……淫贼，你想干什么？”女子大惊失色，感觉体内的火元灵气被全面压制。“嘿嘿！既然你都叫我淫贼了？那我可不能白白背这个锅。”徐缺一脸贱笑，眉毛一挑，走向前去！网页版章节内容慢，请下载爱阅小说app阅读最新内容“沈兄！”“嗯！”沈长青走在路上，有遇到相熟的人，彼此都会打个招呼，或是点头。但不管是谁。每个人脸上都没有多余的表情，仿佛对什么都很是淡漠。对此。沈长青已是习以为常。因为这里是镇魔司，乃是维护大秦稳定的一个机构，主要的职责就是斩杀妖魔诡怪，当然也有一些别的副业。可以说。镇魔司中，每一个人手上都沾染了许多的鲜血。当一个人见惯了生死，那么对很多事情，都会变得淡漠。刚开始来到这个世界的时候，沈长青有些不适应，可久而久之也就习惯了。镇魔司很大。能够留在镇魔司的人，都是实力强横的高手，或者是有成为高手潜质的人。沈长青属于后者。其中镇魔司一共分为两个职业，一为镇守使，一为除魔使。任何一人进入镇魔司，都是从最低层次的除魔使开始，然后一步步晋升，最终有望成为镇守使。沈长青的前身，就是镇魔司中的一个见习除魔使，也是除魔使中最低级的那种。拥有前身的记忆。他对于镇魔司的环境，也是非常的熟悉。没有用太长时间，沈长青就在一处阁楼面前停下。跟镇魔司其他充满肃杀的地方不同，此处阁楼好像是鹤立鸡群一般，在满是血腥的镇魔司中，呈现出不一样的宁静。此时阁楼大门敞开，偶尔有人进出。沈长青仅仅是迟疑了一下，就跨步走了进去。进入阁楼。环境便是徒然一变。一阵墨香夹杂着微弱的血腥味道扑面而来，让他眉头本能的一皱，但又很快舒展。镇魔司每个人身上那种血腥的味道，几乎是没有办法清洗干净2。'
	  },
	  {
	    id: '2',
		name: '第三章',
		contents: '三缕刺眼的阳光照耀下，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。“我不是出车祸死了么？怎么又活过来了？”他有些惊讶，可还没来得及搞清楚自己是如何死里逃生，眼前的景象便使得他立刻激动的瞪大了眼睛。随即就懵逼了！只见一名长得像仙女一般的古装女孩，竟对准他躺着的草丛位置，作势就要蹲下来……???.xXbiQuGe.c0m天呐！这女孩，该不会是想要……不会吧？不能够呀！而且我这么光明磊落的一个人，也不可能偷看呀…… 徐缺瞪大了眼睛。眼看那女孩就要蹲下来，徐缺紧忙将脑袋从茂密的草丛堆中使劲钻了出来，大喊道：“姑娘，你这是干嘛，可不能随地大小便呀！”场面顿时一僵。女子半蹲在地上，整个人也僵化了，然后…… “啊……” 她发出了一声尖叫，惊慌失措的放下裙摆，整个人噌的一下从原地弹起，竟踩着一把利剑横空飞掠而去。我靠，这是啥？御剑飞天？原来，真他妈是仙女啊？徐缺顿时吓了一跳，与此同时，脑袋里也突然涌出一大段陌生却熟悉的记忆，宛若与生俱来经历过的一般。穿越！我他妈穿越了！立刻读档脑海当中本不属于自己的记忆，徐缺理清了一切。这里竟然是一个修仙世界，就像眼前这个愤怒得御剑飞天的小仙女一般，人是可以修炼各种功法成仙的。而自己这幅身体的主人竟是当今驸马爷，可这位驸马爷却是十足的倒霉蛋。他本身只是个穷苦孤儿，却拥有千年难得一遇的独特灵根。年幼时，在机缘下被皇帝看中招为驸马，提供无数天材地宝给他修炼，短短六年间便凝结腹丹，踏入了金丹期。当他踏入金丹期的那一天，那位美得妖艳的公主，七天七夜，竟将他浑身修为抢夺一空，甚至连灵根天赋也被一并夺走。天才驸马爷才刚新婚便沦为废人，已经没有了丝毫利用价值的他被低调连夜送出宫外，在发配到边疆的路上被皇帝安排的人一掌拍死，气绝身亡，最后被弃尸于此。“唉，可惜了！”理清了这些记忆，徐缺满脸遗憾之色，摇头叹了口气，懊恼道：“该死的！怎么就没提早一步。？”想起那位美艳公主，徐缺就愈发觉得可惜，来迟了一步啊！“大胆淫贼，竟然敢偷窥本姑娘，给我纳命来！”这时，一道娇斥声突然传来，竟是那位仙女去而复返。她满脸通红的羞愤，眼神当中却带着无尽的杀意，脚下还踩着那柄寒芒凌冽的利剑，朝徐缺杀了过来。“我靠，仙子，这绝对是误会啊！明明是你一屁股蹲在了我躺着的地方，还有……你要杀我泄愤没问题，可你这个样子，让我很没有逃跑的动力啊！”徐缺大喊了一声，拔腿就跑。女子顿时脸色一变，面红耳赤的将裙摆一提，呸了一声，怒斥道：“淫贼找死。”脚下利剑飞行的速度陡然加快，嗖嗖朝着徐缺杀去。飞奔狂跑间，徐缺疯狂地想着逃命的办法。突然之间，脑中灵光一闪。当即就脚步一停，伸手从怀里摸出一块熟悉的令牌，转身就对着女子大喊道：“大胆妖女，我乃当今火元国驸马，你敢对我不敬？小心我诛你九族！”就在这时，徐缺脑袋里就突然就响起一连串的系统提示音。“恭喜宿主‘徐缺’激活装逼打脸系统，本系统将为您保驾护航，助你装逼助你飞！”“恭喜宿主‘徐缺’装逼成功，奖励装逼值1点，是否进入商城兑换？”“系统检测到宿主‘徐缺’能力低弱，难以在本世界难度下生存，特奖励新手大礼包一份，是否查看礼包？”在提示音响起的同时，眼前还弹出一道光幕窗口，上面显示着几条信息数据。“宿主：徐缺 境界：凡人 经验值：0/100 装逼值：1点 功法：无 职业：无 地位：东荒大陆火元国驸马……”“嘶……哈哈哈……”徐缺先是倒吸了一口气，紧跟着难以抑制的放声狂笑起来。这什么装逼打脸系统，一听就是为我量身打造，助我叼破天际的逆天系统啊！这下可有得玩了。“淫贼，死到临头，你有什么好笑的？”突然，一声娇斥把徐缺从狂喜中拉了回来。女子不知何时已经站在他面前十几米处，手里面拿着飞剑指着他，水灵灵的大眼睛却警惕狐疑的盯着他。徐缺眼眸微眯，想了一下，突然冷笑道：“我乃是火元国的驸马爷！连尊贵的皇室公主我都想看就看，你也就颇有姿色而已，本驸马爷愿意看你那是你的福气！别以为拿着飞剑就能喊打喊杀，本驸马可是百年难得一遇的修仙天纵奇才，还会怕你这个小丫头片子？来来来……想要跟我动手是不是？有种你靠近我一步试试？”“叮，恭喜宿主‘徐缺’装逼成功，奖励装逼值1点。”果不其然，徐缺耳边那只有自己才听得到的系统提示音再度响起，他忍不住再度大笑了起来。原来这装逼打脸系统真的是顾名思义，只要装逼就能获得装逼值，就能升级，就能获得系统的种种奖励……“对了，好像还有个礼包。”徐缺眼中陡然一亮，用意识喊道：“查看礼包。”顿时，眼前光幕窗口的画面一变，出现了一个方形礼盒，礼盒被打开，几道流光跃出，一闪而逝。“恭喜宿主‘徐缺’获得初阶经验丹，服用可得一万经验值。”“恭喜宿主‘徐缺’获得初阶神行遁走符两张，使用后可瞬间移动到方圆五公里之外的任何地方。”“恭喜宿主‘徐缺’获得初阶《太古五行诀》。”“叮，检测到宿主‘徐缺’灵根残缺，不满足修炼条件，系统将为您补全所有灵根。”当即，徐缺感觉体内像被一股电流贯穿，头皮瞬间发麻。可紧随而至的是一种舒畅感，浑身毛孔像被彻底打开，贪婪的汲取四方灵气。轰！很快，他感觉到自己的身体发生了翻天覆地的变化，变得与大自然更加亲近，仿佛能融入万物，掌控万物。可他很清楚这种感觉是多么熟悉，当年天火灵根还没被公主夺走时，便是对火焰有如此亲切的感觉，而今系统不仅将他的天火灵根修复，更是补全了其他属性的灵根。金木水火土，一下子五种灵根都齐了，而且每一条皆是最上乘的“天”级。我了个去，这是要逆天啊！想到这，徐缺终于忍不住振臂高呼：“系统在手，天下我有，什么狗屁火元国公主皇帝，等我徐缺升级归来，就把你们全踩在脚下，踏得粉碎。”“大胆淫贼，既然自称是火元国的驸马，竟还敢口出狂言，妄图弑君？”旁边女子有点听傻了，这驸马失心疯了吗？竟敢说出这等大逆不道的话来。“叮，恭喜宿主‘徐缺’装逼成功，获得装逼值1点。”徐缺这才缓过神来，嘴角微微一抽，妈的，顾着装逼展望未来，差点忘记眼下这个麻烦，得赶紧想办法跑路才行。“对了，经验丹！”他突然想起新手大礼包中还有一颗初阶经验丹。没有丝毫迟疑，紧忙用意念操作系统界面，打开一个包裹，三件物品赫然出现在其中。“使用，使用。”徐缺盯住其中两样物品，心中大喊。脑海里顿时传来一连串系统提示音：“叮，恭喜宿主‘徐缺’修炼《太古五行诀》成功。”“叮，宿主‘徐缺’服用了初阶经验丹，获得一万经验值。”“恭喜宿主‘徐缺’升级，当前境界炼气期一层。”“恭喜宿主‘徐缺’升级，当前境界炼气期二层。”“恭喜宿主‘徐缺’升级，当前境界炼气期三层。”……“恭喜宿主‘徐缺’升级，当前境界炼气期十层。”短短数息之间，徐缺从手无缚鸡之力的凡人变成修仙者，直接冲刺到炼气期十层，距离筑基期仅仅一步之差。而且他现在的实力，竟比正常的炼气期十层还要强大无数。原因就是他拥有了五条天灵根，这就等于一个人拥有了寻常人五倍的实力。甚至在这五种不同灵气的相生相克属性下，爆发出来的力量就远远不止五倍那么简单。“这回可真是没话说了，我不无敌谁无敌？”徐缺内心止不住激动起来。但这时，对面那女子却是挥舞起一道流光，划过云霄，锋芒毕露的剑刃眨眼间如毒蛇般窜了过来。“我靠，仙子，我只是叫你这个小美人上前来给本驸马爷好好瞅瞅的，谁让你出剑了？你这是偷袭！是暗算！”徐缺见着飞剑袭来，顿时吓了一大跳，当即张口破骂。可骂归骂，脚下的动作却一点也不含糊，顺势往后一滑，手指尖竟凝出一缕水元灵气，轻轻弹在迎面掠来的剑刃上。“当！”一声颤音脆鸣，利剑被他弹飞而出。“这……怎么可能？”女子顿时呆住了，宗门里能如此轻巧破解这一剑的，除去那些修为高深莫测的师叔伯不说，至少也得筑基期六层的那些师兄姐才能做到呀！“我就纳闷了，都说了刚才的事是误会，你还老是纠缠不清，居然还想杀我？别以为你长得像仙女我就不打你，反正刚刚也没看清楚，这回我就光明正大的看一次。”徐缺恼火骂道，脚下禹步踏出，土元灵气顿时融入大地，速度猛然倍增，眨眼间便出现在女子面前。紧跟着，一缕水元灵气涌出掌心，环绕四方，女子还未来得及反应，当场就被禁锢。“淫……淫贼，你想干什么？”女子大惊失色，感觉体内的火元灵气被全面压制。“嘿嘿！既然你都叫我淫贼了？那我可不能白白背这个锅。”徐缺一脸贱笑，眉毛一挑，走向前去！网页版章节内容慢，请下载爱阅小说app阅读最新内容“沈兄！”“嗯！”沈长青走在路上，有遇到相熟的人，彼此都会打个招呼，或是点头。但不管是谁。每个人脸上都没有多余的表情，仿佛对什么都很是淡漠。对此。沈长青已是习以为常。因为这里是镇魔司，乃是维护大秦稳定的一个机构，主要的职责就是斩杀妖魔诡怪，当然也有一些别的副业。可以说。镇魔司中，每一个人手上都沾染了许多的鲜血。当一个人见惯了生死，那么对很多事情，都会变得淡漠。刚开始来到这个世界的时候，沈长青有些不适应，可久而久之也就习惯了。镇魔司很大。能够留在镇魔司的人，都是实力强横的高手，或者是有成为高手潜质的人。沈长青属于后者。其中镇魔司一共分为两个职业，一为镇守使，一为除魔使。任何一人进入镇魔司，都是从最低层次的除魔使开始，然后一步步晋升，最终有望成为镇守使。沈长青的前身，就是镇魔司中的一个见习除魔使，也是除魔使中最低级的那种。拥有前身的记忆。他对于镇魔司的环境，也是非常的熟悉。没有用太长时间，沈长青就在一处阁楼面前停下。跟镇魔司其他充满肃杀的地方不同，此处阁楼好像是鹤立鸡群一般，在满是血腥的镇魔司中，呈现出不一样的宁静。此时阁楼大门敞开，偶尔有人进出。沈长青仅仅是迟疑了一下，就跨步走了进去。进入阁楼。环境便是徒然一变。一阵墨香夹杂着微弱的血腥味道扑面而来，让他眉头本能的一皱，但又很快舒展。镇魔司每个人身上那种血腥的味道，进入阁楼,几乎是没有办法清洗干净3。'
	  },
	  {
	    id: '3',
		name: '第四章',
		contents: '四缕刺眼的阳光照耀下，徐缺微眯着眼睛醒来。脸上有些痒痒的，周围似乎是一片草丛。“我不是出车祸死了么？怎么又活过来了？”他有些惊讶。年轻人，当年我开始装逼的时候，你们还只是一滴液体！”“仙子，随在下走一趟，保证带你装逼带你飞，带你一起嘿嘿嘿！”身披狂徒铠甲，肩扛日炎斗篷。可还没来得及搞清楚自己是如何死里逃生，眼前的景象便使得他立刻激动的瞪大了眼睛。随即就懵逼了！只见一名长得像仙女一般的古装女孩，竟对准他躺着的草丛位置，作势就要蹲下来……???.xXbiQuGe.c0m天呐！这女孩，该不会是想要……不会吧？不能够呀！而且我这么光明磊落的一个人，也不可能偷看呀…… 徐缺瞪大了眼睛。眼看那女孩就要蹲下来，徐缺紧忙将脑袋从茂密的草丛堆中使劲钻了出来，大喊道：“姑娘，你这是干嘛，可不能随地大小便呀！”场面顿时一僵。女子半蹲在地上，整个人也僵化了，然后…… “啊……” 她发出了一声尖叫，惊慌失措的放下裙摆，整个人噌的一下从原地弹起，竟踩着一把利剑横空飞掠而去。我靠，这是啥？御剑飞天？原来，真他妈是仙女啊？徐缺顿时吓了一跳，与此同时，脑袋里也突然涌出一大段陌生却熟悉的记忆，宛若与生俱来经历过的一般。穿越！我他妈穿越了！立刻读档脑海当中本不属于自己的记忆，徐缺理清了一切。这里竟然是一个修仙世界，就像眼前这个愤怒得御剑飞天的小仙女一般，人是可以修炼各种功法成仙的。而自己这幅身体的主人竟是当今驸马爷，可这位驸马爷却是十足的倒霉蛋。他本身只是个穷苦孤儿，却拥有千年难得一遇的独特灵根。年幼时，在机缘下被皇帝看中招为驸马，提供无数天材地宝给他修炼，短短六年间便凝结腹丹，踏入了金丹期。当他踏入金丹期的那一天，那位美得妖艳的公主，七天七夜，竟将他浑身修为抢夺一空，甚至连灵根天赋也被一并夺走。天才驸马爷才刚新婚便沦为废人，已经没有了丝毫利用价值的他被低调连夜送出宫外，在发配到边疆的路上被皇帝安排的人一掌拍死，气绝身亡，最后被弃尸于此。“唉，可惜了！”理清了这些记忆，徐缺满脸遗憾之色，摇头叹了口气，懊恼道：“该死的！怎么就没提早一步。？”想起那位美艳公主，徐缺就愈发觉得可惜，来迟了一步啊！“大胆淫贼，竟然敢偷窥本姑娘，给我纳命来！”这时，一道娇斥声突然传来，竟是那位仙女去而复返。她满脸通红的羞愤，眼神当中却带着无尽的杀意，脚下还踩着那柄寒芒凌冽的利剑，朝徐缺杀了过来。“我靠，仙子，这绝对是误会啊！明明是你一屁股蹲在了我躺着的地方，还有……你要杀我泄愤没问题，可你这个样子，让我很没有逃跑的动力啊！”徐缺大喊了一声，拔腿就跑。女子顿时脸色一变，面红耳赤的将裙摆一提，呸了一声，怒斥道：“淫贼找死。”脚下利剑飞行的速度陡然加快，嗖嗖朝着徐缺杀去。飞奔狂跑间，徐缺疯狂地想着逃命的办法。突然之间，脑中灵光一闪。当即就脚步一停，伸手从怀里摸出一块熟悉的令牌，转身就对着女子大喊道：“大胆妖女，我乃当今火元国驸马，你敢对我不敬？小心我诛你九族！”就在这时，徐缺脑袋里就突然就响起一连串的系统提示音。“恭喜宿主‘徐缺’激活装逼打脸系统，本系统将为您保驾护航，助你装逼助你飞！”“恭喜宿主‘徐缺’装逼成功，奖励装逼值1点，是否进入商城兑换？”“系统检测到宿主‘徐缺’能力低弱，难以在本世界难度下生存，特奖励新手大礼包一份，是否查看礼包？”在提示音响起的同时，眼前还弹出一道光幕窗口，上面显示着几条信息数据。“宿主：徐缺 境界：凡人 经验值：0/100 装逼值：1点 功法：无 职业：无 地位：东荒大陆火元国驸马……”“嘶……哈哈哈……”徐缺先是倒吸了一口气，紧跟着难以抑制的放声狂笑起来。这什么装逼打脸系统，一听就是为我量身打造，助我叼破天际的逆天系统啊！这下可有得玩了。“淫贼，死到临头，你有什么好笑的？”突然，一声娇斥把徐缺从狂喜中拉了回来。女子不知何时已经站在他面前十几米处，手里面拿着飞剑指着他，水灵灵的大眼睛却警惕狐疑的盯着他。徐缺眼眸微眯，想了一下，突然冷笑道：“我乃是火元国的驸马爷！连尊贵的皇室公主我都想看就看，你也就颇有姿色而已，本驸马爷愿意看你那是你的福气！别以为拿着飞剑就能喊打喊杀，本驸马可是百年难得一遇的修仙天纵奇才，还会怕你这个小丫头片子？来来来……想要跟我动手是不是？有种你靠近我一步试试？”“叮，恭喜宿主‘徐缺’装逼成功，奖励装逼值1点。”果不其然，徐缺耳边那只有自己才听得到的系统提示音再度响起，他忍不住再度大笑了起来。原来这装逼打脸系统真的是顾名思义，只要装逼就能获得装逼值，就能升级，就能获得系统的种种奖励……“对了，好像还有个礼包。”徐缺眼中陡然一亮，用意识喊道：“查看礼包。”顿时，眼前光幕窗口的画面一变，出现了一个方形礼盒，礼盒被打开，几道流光跃出，一闪而逝。“恭喜宿主‘徐缺’获得初阶经验丹，服用可得一万经验值。”“恭喜宿主‘徐缺’获得初阶神行遁走符两张，使用后可瞬间移动到方圆五公里之外的任何地方。”“恭喜宿主‘徐缺’获得初阶《太古五行诀》。”“叮，检测到宿主‘徐缺’灵根残缺，不满足修炼条件，系统将为您补全所有灵根。”当即，徐缺感觉体内像被一股电流贯穿，头皮瞬间发麻。可紧随而至的是一种舒畅感，浑身毛孔像被彻底打开，贪婪的汲取四方灵气。轰！很快，他感觉到自己的身体发生了翻天覆地的变化，变得与大自然更加亲近，仿佛能融入万物，掌控万物。可他很清楚这种感觉是多么熟悉，当年天火灵根还没被公主夺走时，便是对火焰有如此亲切的感觉，而今系统不仅将他的天火灵根修复，更是补全了其他属性的灵根。金木水火土，一下子五种灵根都齐了，而且每一条皆是最上乘的“天”级。我了个去，这是要逆天啊！想到这，徐缺终于忍不住振臂高呼：“系统在手，天下我有，什么狗屁火元国公主皇帝，等我徐缺升级归来，就把你们全踩在脚下，踏得粉碎。”“大胆淫贼，既然自称是火元国的驸马，竟还敢口出狂言，妄图弑君？”旁边女子有点听傻了，这驸马失心疯了吗？竟敢说出这等大逆不道的话来。“叮，恭喜宿主‘徐缺’装逼成功，获得装逼值1点。”徐缺这才缓过神来，嘴角微微一抽，妈的，顾着装逼展望未来，差点忘记眼下这个麻烦，得赶紧想办法跑路才行。“对了，经验丹！”他突然想起新手大礼包中还有一颗初阶经验丹。没有丝毫迟疑，紧忙用意念操作系统界面，打开一个包裹，三件物品赫然出现在其中。“使用，使用。”徐缺盯住其中两样物品，心中大喊。脑海里顿时传来一连串系统提示音：“叮，恭喜宿主‘徐缺’修炼《太古五行诀》成功。”“叮，宿主‘徐缺’服用了初阶经验丹，获得一万经验值。”“恭喜宿主‘徐缺’升级，当前境界炼气期一层。”“恭喜宿主‘徐缺’升级，当前境界炼气期二层。”“恭喜宿主‘徐缺’升级，当前境界炼气期三层。”……“恭喜宿主‘徐缺’升级，当前境界炼气期十层。”短短数息之间，徐缺从手无缚鸡之力的凡人变成修仙者，直接冲刺到炼气期十层，距离筑基期仅仅一步之差。而且他现在的实力，竟比正常的炼气期十层还要强大无数。原因就是他拥有了五条天灵根，这就等于一个人拥有了寻常人五倍的实力。甚至在这五种不同灵气的相生相克属性下，爆发出来的力量就远远不止五倍那么简单。“这回可真是没话说了，我不无敌谁无敌？”徐缺内心止不住激动起来。但这时，对面那女子却是挥舞起一道流光，划过云霄，锋芒毕露的剑刃眨眼间如毒蛇般窜了过来。“我靠，仙子，我只是叫你这个小美人上前来给本驸马爷好好瞅瞅的，谁让你出剑了？你这是偷袭！是暗算！”徐缺见着飞剑袭来，顿时吓了一大跳，当即张口破骂。可骂归骂，脚下的动作却一点也不含糊，顺势往后一滑，手指尖竟凝出一缕水元灵气，轻轻弹在迎面掠来的剑刃上。“当！”一声颤音脆鸣，利剑被他弹飞而出。“这……怎么可能？”女子顿时呆住了，宗门里能如此轻巧破解这一剑的，除去那些修为高深莫测的师叔伯不说，至少也得筑基期六层的那些师兄姐才能做到呀！“我就纳闷了，都说了刚才的事是误会，你还老是纠缠不清，居然还想杀我？别以为你长得像仙女我就不打你，反正刚刚也没看清楚，这回我就光明正大的看一次。”徐缺恼火骂道，脚下禹步踏出，土元灵气顿时融入大地，速度猛然倍增，眨眼间便出现在女子面前。紧跟着，一缕水元灵气涌出掌心，环绕四方，女子还未来得及反应，当场就被禁锢。“淫……淫贼，你想干什么？”女子大惊失色，感觉体内的火元灵气被全面压制。“嘿嘿！既然你都叫我淫贼了？那我可不能白白背这个锅。”徐缺一脸贱笑，眉毛一挑，走向前去！网页版章节内容慢，请下载爱阅小说app阅读最新内容“沈兄！”“嗯！”沈长青走在路上，有遇到相熟的人，彼此都会打个招呼，或是点头。但不管是谁。每个人脸上都没有多余的表情，仿佛对什么都很是淡漠。对此。沈长青已是习以为常。因为这里是镇魔司，乃是维护大秦稳定的一个机构，主要的职责就是斩杀妖魔诡怪，当然也有一些别的副业。可以说。镇魔司中，每一个人手上都沾染了许多的鲜血。当一个人见惯了生死，那么对很多事情，都会变得淡漠。刚开始来到这个世界的时候，沈长青有些不适应，可久而久之也就习惯了。镇魔司很大。能够留在镇魔司的人，都是实力强横的高手，或者是有成为高手潜质的人。沈长青属于后者。其中镇魔司一共分为两个职业，一为镇守使，一为除魔使。任何一人进入镇魔司，都是从最低层次的除魔使开始，然后一步步晋升，最终有望成为镇守使。沈长青的前身，就是镇魔司中的一个见习除魔使，也是除魔使中最低级的那种。拥有前身的记忆。他对于镇魔司的环境，也是非常的熟悉。没有用太长时间，沈长青就在一处阁楼面前停下。跟镇魔司其他充满肃杀的地方不同，此处阁楼好像是鹤立鸡群一般，在满是血腥的镇魔司中，呈现出不一样的宁静。此时阁楼大门敞开，偶尔有人进出。沈长青仅仅是迟疑了一下，就跨步走了进去。进入阁楼。环境便是徒然一变。一阵墨香夹杂着微弱的血腥味道扑面而来，让他眉头本能的一皱，但又很快舒展。镇魔司每个人身上那种血腥的味道，几乎是没有办法清洗干净4。'
	  }
	  ]
    }
  )

  // 接收到的标题
  let pageTitle = ref(hotBooks.value.title)
  
  // 阅读界面主题色
  const colorList = ref({
    nigth: {
	  bgColor: 'rgba(55, 55, 55)',
	  textColor: '#fff',
	  scheduleColor: '#fff',
	  is: 'none',
	  setUpInterfaceBgcolor: '#000'
	},
    colorTheme0: {
	  bgColor: 'rgba(244, 231, 189)',
	  scheduleColor: '#ccc',
	  textColor: '#666'
	},
    colorTheme1: {
	  bgColor: 'rgba(246, 240, 224)',
	  scheduleColor: '#ccc',
	  textColor: '#666'
	},
    colorTheme2: {
	  bgColor: 'rgba(247, 246, 241)',
	  scheduleColor: '#ccc',
	  textColor: '#666'
	},
    colorTheme3: {
	  bgColor: 'rgba(238, 251, 234)',
	  scheduleColor: '#ccc',
	  textColor: '#666',
	  theme: '主题'
	}
  })
  
  // 阅读界面主题色
  let themeColor = ref(colorList.value.colorTheme3)
  if(uni.getStorageSync('themecolor')) themeColor.value = uni.getStorageSync('themecolor')
  else uni.setStorageSync('themecolor', colorList.value.colorTheme3)
  
  const changetitle = () => {
    pageTitle.value = hotBooks.value.title
  	console.log('1212121', hotBooks.value.title)
  }
  
  // 阅读内容
  let setBookCharpter = ref([''])
  // 阅读章节进度记录
  let readCharpterstor = uni.getStorageSync('readCharpterstordata') || 0
  const setCharpter = (i) => { 
    setBookCharpter.value = ['']
    setBookCharpter.value = hotBooks.value.chapterCotents[i].contents.split(' ').join('。').split('。')
    hotBooks.value.chapter = hotBooks.value.chapterCotents[i].name
  }
  // console.log('我是文章章节记录员', readCharpterstor)
  setCharpter(readCharpterstor)
  
  // 把正在阅读章节整理成可以滑动的多张书页
  const leftNum = ref([])
  const textWidth = ref([])
  const pageNum = ref(['1'])
  // 翻页标记
  const flippingPageFlag = []
  // 最终需要存储的阅读记录
  const storagePageNum = ref([''])
  const readRagionWidth = () => {
	// 加载完成后获取
	setTimeout(() => {
	  const query = uni.createSelectorQuery()
	  query.selectAll('.read-book-body-contents-item').boundingClientRect(data => {
	  	// console.log(data, '--||--')
		leftNum.value = []
		for(let i=0; i<=data.length-1; i++) {
		  leftNum.value.push(data[i].left)
		}
		// console.log(leftNum.value, '----')
		textWidth.value = Array.from(new Set(leftNum.value))
		// console.log(textWidth.value)
		pageNum.value = []
		for(let y=0; y<=textWidth.value.length-1; y++) {
		  pageNum.value.push(y)
		}
		storagePageNum.value = storageReadBookData(pageNum.value.reverse())
		
		for(let a=storagePageNum.value.length; a>=0; a--) {
		  flippingPageFlag.push(a+1)
		}
		// console.log(pageNum.value.reverse(), '====')
		// console.log(storageReadBookData(pageNum.value.reverse()), '---===---')
		// console.log(deepCopy(pageNum.value).reverse(), '---===---')
	  }).exec()
	}, 1)
  }
  
  // 把正在阅读的章节整理成可存储的数据，便于下次进入时读取并阅读
  const storageReadBookData = (arr) => {
    const tempArr = []
    for(let i=0; i<=arr.length-1; i++) {
	  let obj = {
	    id: i,
		readBookNumber: arr[i],
		positionLeft: 0
	  }
	  tempArr.push(obj)
	}
	return tempArr
  }
  
  // 阅读到第几页
  const pageNow = ref(1)
  let startData = []
  let moveData = []
  let setCharpterNumberTimer = ''
  // 翻页
  // 记录是否滑动
  let recordSlide = ref(false)
  
  const nextcharpter = () => {
    if(readCharpterstor < hotBooks.value.chapterCotents.length - 1) {
      readCharpterstor++
      jumpCharter()
    } else {
      console.log('已经最后一章了')
    }
  }
  
  const upCharpter = () => {
    if(readCharpterstor >= 1) {
      readCharpterstor--
      jumpCharter()
    } else {
      console.log('已经第一章了')
    }
  }
  
  // 滑动方向
  let slideDrection = ref(0)
  const starting = (e) => {
    // if(recordSlide === true) return
	startData = [e.touches[0].pageX, e.touches[0].pageY]
    // console.log(startData[0], '默认')
	
	// 获取到屏幕宽度
	// console.log(system.screenWidth, '屏幕宽度')
  }
  const moveing = (e, i) => {
	moveData = [e.touches[0].pageX, e.touches[0].pageY]
    // console.log(moveData[0], '滑动')
	
	// if(recordSlide) return
	recordSlide = true
	
	// 根据滑动的方向来拖出书页
	if(startData[0] > moveData[0] && i > 0) { // 向左滑动
	  // console.log(startData[0], moveData[0], '左滑')
	  // console.log('左滑', i)
	  slideDrection.value = 1
	  storagePageNum.value[i].positionLeft = -(100 - moveData[0] / system.screenWidth * 100)
	} else if(i<storagePageNum.value.length-1 && startData[0] < moveData[0]) {
	  // console.log('右滑', i)
	  storagePageNum.value[i+1].positionLeft = -(100 - moveData[0] / system.screenWidth * 100)
	  // console.log(startData[0], moveData[0], '右滑')
	  slideDrection.value = 2
	} else if(i <= 0) {
	  // console.log('i<=0')
	  clearTimeout(setCharpterNumberTimer)
	  setCharpterNumberTimer = setTimeout(() => {
	    nextcharpter()
	  }, 301)
	  
	} else if(i >= hotBooks.value.chapterCotents.length - 1) {
	  console.log('向上翻页了', readCharpterstor)
	  clearTimeout(setCharpterNumberTimer)
	  setCharpterNumberTimer = setTimeout(() => {
	    upCharpter()
	  }, 301)
	}
  }
  
  // 章节跳转
  const jumpCharter = () => {
    uni.setStorageSync('readCharpterstordata', readCharpterstor)
    // console.log('存储的章节数', uni.getStorageSync('readCharpterstordata'))
    uni.redirectTo({
        url: '../read-book/read-book'
    })
    // console.log(readCharpterstor, '得到了新的文章内容')
    // console.log(setBookCharpter.value)
    setCharpter(uni.getStorageSync('readCharpterstordata'))
    readRagionWidth()
  }
  
  const ending = (e, i) => {
    // console.log(e, '滑动结束')
	
	// 如果没有滑动，直接返回
	if(!recordSlide) return
	
	// 滑动结束的时候，判断滑动距离有没有超过屏幕的一半，超过一半则进行翻页
	if(Math.abs(startData[0] - moveData[0]) >= system.screenWidth / 3) {
	  // console.log('超过屏幕的一半了')
	  if(slideDrection.value === 1) {
	    storagePageNum.value[i].positionLeft = -120
		pageNow.value = flippingPageFlag[i]
	  } else if(slideDrection.value === 2) {
		pageNow.value = flippingPageFlag[i+2]
	    storagePageNum.value[i+1].positionLeft = 0
	  }
	} else {
	  if(slideDrection.value === 1) {
	    storagePageNum.value[i].positionLeft = 0
	  } else if(slideDrection.value === 2) {
	    storagePageNum.value[i+1].positionLeft = -120
	  }
	}
	
	recordSlide = false
	slideDrection.value = 0
  }
  
  // 切换主题颜色或开关灯时进度条展示相应的进度
  // 色值进度条的长度
  let scheduleWidth = ref(0)
  const addReduceColorVal = (colorArr) => {
    let tempColorList = colorArr.slice(5, colorArr.length-1).split(',')
  	
  	// 获取到进度条的长度
  	getNodeMsg('.read-book-set-up-interface-schedule-line').then(data => {
  	  // 色值换算后进度条的位置
  	  scheduleWidth.value = data.width
  	  slidcoordinate.value = data.width * (Math.max.apply(null, tempColorList) / 256)
  	})
  }
  
  // 点击界面招唤出设置窗口
  // 控制属性
  let controlInterface = ref({
    showSetUpInterface: 'none', // 控制设置界面是否显示
	showOpenOrClose: -70, // 控制设置界面顶部开关灯展开
	showInterFaceFoot: -160 // 控制设置界面底部功能区展开
  })
  const ejectSetUp = (is) => {
	clearTimeout(setCharpterNumberTimer)
	if(is === 1) {
	  controlInterface.value.showSetUpInterface = 'flex'
	  setCharpterNumberTimer = setTimeout(() => {
	    controlInterface.value.showOpenOrClose = 0
	    controlInterface.value.showInterFaceFoot = 0
		addReduceColorVal(themeColor.value.bgColor)
	  }, 1)
	} else {
	  controlInterface.value.showOpenOrClose = -70
	  controlInterface.value.showInterFaceFoot = -160
	  setCharpterNumberTimer = setTimeout(() => {
	    controlInterface.value.showSetUpInterface = 'none'
	  }, 200)
	}
  }
  
  // 拖动进度条时，改变主题色值
  let tempRgba = ''
  let maxColorVal = ''
  let minColorVal = ''
  let maxColorValIndex = 0
  const dragScheduleChangeThemeColor = (value) => {
	// console.log(tempRgba, '色值')
	// console.log(value, '最大值的索引')
	if(value == 0) {
	  themeColor.value.bgColor = 'rgba(' +
	                              slidcoordinate.value +
							      ',' +
							      (slidcoordinate.value - (maxColorVal - tempRgba[value+1])) +
							      ',' +
							      (slidcoordinate.value - (maxColorVal - tempRgba[value+2])) +
							      ')'
	} else if(value == 1) {
	  themeColor.value.bgColor = 'rgba(' +
							      (slidcoordinate.value - (maxColorVal - tempRgba[value-1])) +
							      ',' +
	                              slidcoordinate.value +
							      ',' +
							      (slidcoordinate.value - (maxColorVal - tempRgba[value+1])) +
							      ')'
	} else if(value == 2) {
	  themeColor.value.bgColor = 'rgba(' +
							      (slidcoordinate.value - (maxColorVal - tempRgba[value-2])) +
							      ',' +
							      (slidcoordinate.value - (maxColorVal - tempRgba[value-1])) +
							      ',' +
	                              slidcoordinate.value +
							      ')'
	}
	// console.log(themeColor.value.bgColor, '---------------')
  }
  
  // 开关灯文本提醒
  let isOpening = ref('关灯')
  // 界面设置-开关灯
  let themeColorName = ref('colorTheme3')
  const isOpenLamp = () => {
	if(isOpening.value === '开灯') {
      uni.setStorageSync('openOrCloseLamp', null)
	  isOpening.value = '关灯'
	  // themeColor.value = uni.getStorageSync('themecolor')
	  themeColor.value = colorList.value[themeColorName.value]
	  // uni.setStorageSync('openOrCloseLamp', isOpening.value)
	} else {
	  isOpening.value = '开灯'
	  themeColor.value = colorList.value.nigth
	  uni.setStorageSync('openOrCloseLamp', isOpening.value)
	}
	addReduceColorVal(themeColor.value.bgColor)
	uni.setStorageSync('temprgba', themeColor.value.bgColor)
	uni.setStorageSync('themecolor', themeColor.value)
  }
  
 //  if(uni.getStorageSync('openOrCloseLamp')) {
 //    isOpening.value = uni.getStorageSync('openOrCloseLamp')
	// isOpenLamp()
 //  }
  
  // 自主调节界面亮度
  let slidcoordinate = ref(0)
  const downstart = (e) => {
    console.log(e, 'start')
	if(!uni.getStorageSync('temprgba')) uni.setStorageSync('temprgba', colorList.value.colorTheme3.bgColor)
	tempRgba = uni.getStorageSync('temprgba')
	console.log(tempRgba, '存储的色值')
	tempRgba = tempRgba.slice(5, tempRgba.length-1).split(',')
	maxColorVal = Math.max.apply(null, tempRgba)
	minColorVal = Math.min.apply(null, tempRgba)
	for(let i=0; i<tempRgba.length; i++) {
	  if(tempRgba[i] == maxColorVal) maxColorValIndex = i
	}
  }
  
  // 得到进度条的X坐标位置
  const coodinateStartX = (system.screenWidth - 256) / 2
  
  const downmove = (e) => {
	if(e.changedTouches[0].pageX < coodinateStartX + 256 &&
	   e.changedTouches[0].pageX > coodinateStartX + maxColorVal - minColorVal) {
	  slidcoordinate.value = e.changedTouches[0].pageX - coodinateStartX
	  dragScheduleChangeThemeColor(maxColorValIndex)
	}
  }
  const downend = (e) => {
    console.log(e, 'end')
	uni.setStorageSync('themecolor', themeColor.value)
  }
  
  // 切换主题颜色
  const changeThemeColor = (name) => {
	themeColorName.value = name
	themeColor.value = colorList.value[name]
	isOpening.value = '关灯'
	// uni.setStorageSync('openOrCloseLamp', null)
	uni.setStorageSync('openOrCloseLamp', isOpening.value)
	uni.setStorageSync('themecolor', themeColor.value)
	addReduceColorVal(themeColor.value.bgColor)
	uni.setStorageSync('temprgba', themeColor.value.bgColor)
  }
  
  
  // 加入书架
  // 是否加入了书架
  const isAddBookShelf = ref([
    {
  	  id: 0,
  	  name: '加入书架',
  	  image: '../../static/book-shelf/addbookshelfed.png',
  	  textColor: 'rgba(143, 200, 100)'
  	},
  	{
  	  id: 1,
  	  name: '已加入书架',
  	  image: '../../static/book-shelf/addbookshelf.png',
  	  textColor: 'rgba(112, 112, 112)'
  	}
  ])
  const addBookShelf = () => {
  	if(hotBooks.value.isAddBookShelf === 0) {
      // 未加入地书架的点击后加入书架
  	  hotBooks.value.isAddBookShelf = 1 // 这里实际是一个加入书架的请求
  	} else {
  	  // 对已经加入过书架的，进行提示
  	  console.log(isAddBookShelf.value[0].name)
  	}
  }
  
  // 上一章，目录，下一章
  const addReduceCharpter = (i) => {
	// 上一章
	if(i === -1) upCharpter()
	// 下一章
	if(i === 1) nextcharpter()
	// 查看目录
	if(i === 0) {
	  // 路由存储
	  uni.setStorageSync('charpterListUp', '/pages/read-book/read-book')
	  // 存储文章章节数
	  uni.setStorageSync('charpterListData', hotBooks.value.charpterTitleList)
	  uni.redirectTo({
	    url: '/pages/charpter-list/charpter-list'
	  })
	}
  }
  

onMounted(() => {
  readRagionWidth()
})

</script>

<style scoped>
.read-book{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  box-sizing: border-box;
}
.read-book-top{
  width: 100%;
  height: 32px;
  padding: 0 40px 0 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
}
.read-book-top-left-back{
  /* border: 1px solid blue; */
  width: 32px;
  line-height: 24px;
  font-size: 32px;
  font-weight: 100;
}
.read-book-top-title{
  /* line-height: 30px; */
  /* border: 1px solid springgreen; */
  flex: 1;
  /* color: #666; */
  font-size: 14px;
  text-align: center;
  position: relative;
  line-height: 32px;
}
/* .read-book-top-title-page{
  width: 100%;
  font-size: 10px;
  height: 12px;
  position: absolute;
  line-height: 14px;
  bottom: -5px;
  left: 0;
} */
.read-book-body{
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  overflow-x: auto;
  position: relative;
}
.read-book-body-contents-auto{
  width: 100%;
  height: 100%;
  /* border: 1px solid blue; */
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.1s;
  box-shadow: #000 0px 0px 20px;
}
.read-book-body-contents{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  column-count: 1;
  -moz-column-count: 1;
  -webkit-column-count: 1;
  position: absolute;
  /* background-color: red; */
}
.read-book-body-contents-item{
  text-indent: 16px;
  margin: 5px 0;
  color: #333;
  font-size: 14px;
  /* background-color: #fff; */
  line-height: 24px;
  /* border: 1px solid red; */
}
.read-book-foot{
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #ccc;
}
.read-book-set-up-interface{
  width: 100%;
  /* border: 1px solid red; */
  position: fixed;
  /* background: rgba(69, 69, 69); */
  display: none;
  flex-direction: column;
  overflow: hidden;
  
}
.read-book-set-up-interface-open-or-close-flex{
  width: 100%;
  height: 80px;
  position: relative;
}
.read-book-set-up-interface-open-or-close{
  width: 100%;
  height: 100%;
  position: absolute;
  box-shadow: #ccc 0 2px 10px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  transition: all 0.2s;
  box-sizing: border-box;
  top: -70px;
  left: 0;
}
.read-book-set-up-interface-schedule{
  width: 280px;
  height: 24px;
  /* border: 1px solid #f7f7f8; */
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.read-book-set-up-interface-schedule-line{
  width: 256px;
  height: 2px;
  border-radius: 1px;
  background: rgba(246, 240, 224);
  position: relative;
}
.read-book-set-up-interface-schedule-buttn{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
  position: absolute;
  left: 0;
  top: -3px;
}
.read-book-set-up-interface-schedule-is-open{
  padding: 0 15px;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #f7f7f8;
  border-radius: 15px;
  background: #fff;
  text-align: center;
  margin-top: 8px;
}
.read-book-set-up-interface-flex1{
  flex: 1;
}
.read-book-set-up-interface-foot-flex{
  width: 100%;
  height: 145px;
  position: relative;
}
.read-book-set-up-interface-foot{
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: #ccc 0 0 10px 5px;
  position: absolute;
  transition: all 0.2s;
  bottom: -160px;
  left: 0;
}
.read-book-set-up-interface-foot-butuns,
.read-book-set-up-interface-foot-theme-color-card{
  width: 100%;
  height: 32px;
  /* border: 1px solid red; */
  justify-content: space-between;
  display: flex;
  padding: 0 8px;
  box-sizing: border-box;
}
.read-book-set-up-interface-foot-up-catalogue,
.read-book-set-up-interface-foot-up-charpter,
.read-book-set-up-interface-foot-next-charpter{
  /* border: 1px solid red; */
  line-height: 32px;
  font-size: 14px;
}
.read-book-set-up-interface-foot-theme-color-card{
  margin-top: 12px;
  align-items: center;
  font-size: 14px;
}
.read-book-set-up-interface-foot-theme-color-cards{
  width: 17%;
  height: 24px;
  border-radius: 12px;
  text-align: center;
  line-height: 24px;
  font-size: 10px;
}

.book-details-in-buttons{
  width: 100%;
  height: 60px;
  /* border: 1px solid red; */
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  box-sizing: border-box;
  box-shadow: #ccc 0 0 20px 0px;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.read-book-set-up-interface-foot-add-bookshelf{
  width: 100%;
  height: 55px;
  /* border: 1px solid red; */
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-bookshelf{
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
  align-items: center;
  width: 90px;
}
.is-add-bookshelf{
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.is-add-bookshelf-text{
  width: auto;
  height: 35px;
  line-height: 35px;
  font-size: 12px;
}
</style>