# mini-vue-router

一个mini版的vue-router实现

## vue-router的核心思想

1. 监听popstate/hashChange事件，触发路由更新
2. 使用Vue.util.defineReactive工具函数，在根vue实例上定义一个响应式属性_route，即当前路由对象
3. <router-view> 渲染当前路由对象_route对应的组件，由于_route是响应式的，所以_route变化会触发render渲染

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
