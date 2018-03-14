import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const BaseHeader = () => import('../components/common/BaseHeader.vue')
const BookTag = () => import('../components/book/BookTag.vue')
const BookTagContent = () => import('../components/book/BookTagContent.vue')
const BookTagMoreContent = () => import('../components/book/BookTagMoreContent.vue')
const BookTypeContent = () => import('../components/book/BookTypeContent.vue')



export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/book-tag'
    },
    {
      path: '/book-tag',
      name: 'bookTag',
      components: {
        default: BaseHeader,
        aside: BookTag,
        content: BookTagContent
      }
    },
    {
      path: '/book-tag-more-info',
      name: 'bookTagMoreInfo',
      components: {
        default: BaseHeader,
        aside: BookTag,
        content: BookTagMoreContent
      }
    },
    {
      path: '/book-type',
      name: 'bookType',
      components: {
        default: BaseHeader,
        content: BookTypeContent
      }
    }
  ]
})
