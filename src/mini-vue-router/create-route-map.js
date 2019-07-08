export function createRouteMap (routes) {
  let nameMap = Object.create(null)
  let pathMap = Object.create(null)
  routes.forEach(item => {
    pathMap[item.path] = item
    item.name && (nameMap[item.name] = item)
  })
  return {
    nameMap,
    pathMap
  }
}
