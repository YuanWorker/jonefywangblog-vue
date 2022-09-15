import Vue from 'vue'
import VueRouter from 'vue-router'
import Blogs from '../views/Blogs.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'index',
      redirect: {name: "blogs"}
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blog/:blogId',
      name: 'blogdetail',
      component: BlogDetail
    },
    {
      path: '/blog/add',
      name: 'blogdetail',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId/edit',
      name: 'blogedit',
      component: BlogEdit
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
