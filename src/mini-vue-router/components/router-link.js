/** router-view的作用是渲染当前路由匹配的组件
 * 1. 如何在router-view中有获取到当前路由的组件？
 * 答：通过在vue原型上面定义变量$route，保存当前路由对象，然后每个vue实例都可以访问到$route，router-view组件必然是被某个组件使用，
 * 换句话说，router-view组件一定存在父组件，所以可以在router-view的render函数中通过父元素访问到$route
*/
export default {
  name: 'RouterLink',
  functional: true,
  render (createElement, { parent }) {
    // console.log('RouterView_parent_$route ', parent.$route)
    return createElement('a', {
      attrs: {
        href: '/#/about'
      }
    }, 'about')
  }
}
