import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutation-types'
import book from './module/book'

Vue.use(Vuex)
// 本应用主要划分为四个模块：读书、电影、音乐、同城活动，有些模块下面划分了更小的模块，如读书模块还有'按标签分类'和'按类型分类'子模块
// 此处的moduleTypes主要用于BaseHeader部件，切换不同模块时，BaseHeader部件的背景颜色，logo，搜索提示内容，搜索的字段等都会有不同，因此将信息存放至此对象，方便读取。
const moduleTypes = [
  {
  	value:'book',
  	text:'读书',
  	field:'books',
  	logo:'book-logo',
  	searchIcon:'book-search-icon',
  	placeholder:'书名、作者、ISBN',
  	backgroundColor:'#f6f6f1',
  	subTypes:[{
  		text:'按标签分类',
  		path:'book-tag'
  	},{
  		text:'按类型分类',
  		path:'book-type'
  	}]
  }]

const state={
	moduleTypes,
	currentModuleType:moduleTypes[0],
	searchData:[]
}

const mutations={
	[types.CHANGE_CURRENT_MODULE_TYPE](state,moduleType){
		state.currentModuleType=moduleType
	},
	[types.SET_SEARCH_DATA](state,data){
		state.searchData=data
	}
}

const actions={
	 // 根据关键字以及当前所处的模块发送对应的搜索请求，处在读书模块和电影模块搜索相同的关键字发送的是不同的请求
  getSearchData ({commit, state}, {keyword, count = 6, start = 0}) {
    axios.get(`./api/${state.currentModuleType.value}/search`, {
      params: {
        q: keyword,
        start,
        count
      }
    })
      .then(response => {
        commit(types.SET_SEARCH_DATA, response.data[state.currentModuleType.field])
      })
  }
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules:{
		book
	}
})