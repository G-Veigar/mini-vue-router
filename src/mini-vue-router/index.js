import History from './history'
import { install } from './install'
import { createMatcher } from './create-matcher'

export default class VueRouter {
  constructor (options) {
    this.options = options
    this.history = new History(this)
    this.matcher = createMatcher(options.routes, this)
  }
  /** 初始化 init
   * 1. 监听hashChange事件
   *
   *
  */
  init (app) {
    // console.log('router实例init')
    const history = this.history

    // 设置updateCb函数 _route是响应式属性，更新_route会刷新视图
    history.listen(route => {
      // console.log('history.listen 调用, 设置_route', route, app)
      app._route = route
    })

    /** 初始化路由，即渲染页面的初始路由对应的组件
     * 然后在transitionTo第二个参数传入history.setupHashListener，即设置了hashchange的事件监听
    */
    const setupHashListener = () => {
      history.setupListeners()
    }
    history.transitionTo(history.getCurrentLocation(), setupHashListener)
  }

  // 根据路径，返回匹配的路由
  match (location) {
    return this.matcher(location)
  }

  afterEach () {}
}

VueRouter.install = install
