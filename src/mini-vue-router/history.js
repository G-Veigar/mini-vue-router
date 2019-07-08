export class History {
  // 设置监听，当hash改变，路由跳转，渲染组件
  setupListeners (cf) {
    window.addEventListener('hashchange', e => {
      this.transitionTo(getHash())
    })
  }

  transitionTo (location) {
    // 根据当前的location对象，获得匹配的路由对象
    const route = this.router.match(location)
    this.updateRoute(route)
  }
  // 设置updateCb 也就是触发最后更新视图的操作
  listen (updateCb) {
    this.updateCb = updateCb
  }
  // 调用updateCb更新视图
  updateRoute (route) {
    this.updateCb(route)
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
