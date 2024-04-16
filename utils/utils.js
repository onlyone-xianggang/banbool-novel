import {
  h
} from 'vue'

// 点击标题进入小说详情页面
export function enterNovelDetails(id) {
  console.log('详情页面还没有开发', id)
}

// 获取元素信息
export function getNodeMsg(className, index = 0) {
  return new Promise((resolve) => {
    let Nodes = uni.createSelectorQuery().selectAll(className)
	Nodes.boundingClientRect((data) => {
      resolve(data[index])
	}).exec()
  })
}

// 深拷贝
export function deepCopy(obj) {
  let obj1 = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let i in obj) {
	  let isRapeat = obj[i]
	  if (isRapeat == obj) continue
	  if (obj.hasOwnProperty(i)) {
	    if (isRapeat && typeof isRapeat === 'object') {
		  obj1[i] = (isRapeat.constructor  === Array) ? [] : {},
		  arguments.callee(isRapeat, obj1[i])
		} else {
		  obj1[i] = isRapeat
		}
	  }
	}
  }
  return obj1
}
  
  // 支付
const numberarr = [1000, 200, 1300, 4000, 2700, 3600, 800]
export function paymentTo(val, val1) {
	if(uni.getStorageSync('setStorageUserInfo').status === 0){
	  uni.showToast({
	  	title: '请先登录',
	  	icon:'none',
	  	duration: 2000
	  })
	  return
	}
	let mathnumber = Math.random() * 7
    uni.showLoading({
      title: val
    })
	setTimeout(() => {
	  uni.hideLoading()
	  uni.showToast({
	  	title: val1,
	  	icon:'none',
	  	duration: 2000
	  })
	}, numberarr[parseInt(mathnumber)])
	
  }
