import routerView from './components/router-view'
import routerLink from './components/router-link'
import Home from '../views/Home.vue'

export default class VueRouter {
  /** 初始化 init
   * 1. 监听hashChange事件
   *
   *
  */
  init (app) {
    const history = this.history
    /** 初始化路由，即渲染页面的初始路由对应的组件
     * 然后在transitionTo第二，第三个参数传入history.setupHashListener，即设置了hashchange的事件监听
    */
    history.transitionTo(history.getCurrentLocation(), history.setupHashListener, history.setupHashListener)

    // 设置updateCb函数 _route是响应式属性，更新_route会刷新视图
    history.listen(route => {
      app._route = route
    })
  }
}
/**
 *  1. vue-router是如何导航到初始路由页面的？
 *  2.
*/
VueRouter.install = (Vue, options) => {
  // 注册全局组件 router-view和router-link
  Vue.component('RouterView', routerView)
  Vue.component('RouterLink', routerLink)

  Vue.mixin({
    beforeCreate () {
      // 如果实在根vue实例上
      if (isDef(this.$options.router)) {
        // router实例对象
        this._router = this.$options.router
        // 执行路由初始化函数
        this._router.init(this)
        // 在根vue实例定义响应式数据_route，即_route改变会触发页面render
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
    }
  })

  // 在原型上面挂载当前路由实例对象 $route
  Vue.prototype.$route = {
    hash: '',
    name: 'home',
    component: Home,
    path: '/'
  }

  let hashHistory = new History()
  hashHistory.listen()
}

// 判断是否定义函数
function isDef (v) {
  return v !== undefined
}
