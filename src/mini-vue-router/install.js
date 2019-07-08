import routerView from './components/router-view'
import routerLink from './components/router-link'

/**
 *  1. vue-router是如何导航到初始路由页面的？
 *  2.
*/
export function install (Vue, options) {
  // 注册全局组件 router-view和router-link
  Vue.component('RouterView', routerView)
  Vue.component('RouterLink', routerLink)

  Vue.mixin({
    beforeCreate () {
      // 如果实在根vue实例上
      if (isDef(this.$options.router)) {
        // _routerRoot
        this._routerRoot = this
        // router实例对象
        this._router = this.$options.router
        // 执行路由初始化函数
        this._router.init(this)
        // 在根vue实例定义响应式数据_route，即_route改变会触发页面render
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        console.log('defineReactive: _route', this)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

  // 在原型上面挂载当前路由实例对象 $route
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
}

// 判断是否定义函数
function isDef (v) {
  return v !== undefined
}
