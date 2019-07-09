export default class History {
  constructor (router) {
    this.router = router
    // 当前路由
    this.current = {
      fullPath: '/',
      hash: '',
      matched: [],
      meta: {},
      name: null,
      params: {},
      path: '/',
      query: {}
    }
  }
  // 设置监听，当hash改变，路由跳转，渲染组件
  setupListeners (cf) {
    console.log('setupListeners', this)
    window.addEventListener('hashchange', e => {
      console.log('hashchange', this)
      this.transitionTo(getHash())
    })
  }

  transitionTo (location, onComplete) {
    // 根据当前的location对象，获得匹配的路由对象
    const route = this.router.match(location)
    // console.log('history_transitionTo_route', route)
    this.updateRoute(route)
    // 执行导航完成的回调
    onComplete && onComplete()
  }
  // 设置updateCb 也就是触发最后更新视图的操作
  listen (updateCb) {
    // console.log('listen')
    this.updateCb = updateCb
  }
  // 调用updateCb更新视图
  updateRoute (route) {
    // console.log('updateRoute', route)
    this.current = route
    this.updateCb(route)
  }

  getCurrentLocation () {
    return getHash()
  }

  push (location) {
    this.transitionTo(location, () => {
      pushHash(location)
    })
  }
}

/**
 *  当前页面 http://localhost:8080/hash-mode/#/foo
 *  getHash() 结果：/foo
 * */
function getHash () {
  let href = window.location.href

  const index = href.indexOf('#')
  if (index < 0) return ''

  href = href.slice(index + 1)

  const searchIndex = href.indexOf('?')
  if (searchIndex < 0) {
    const hashIndex = href.indexOf('#')
    if (hashIndex > -1) href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
    else href = decodeURI(href)
  } else {
    if (searchIndex > -1) href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
  }

  return href
}
// 更新页面导航栏的hash
function pushHash (path) {
  window.location.hash = path
}
