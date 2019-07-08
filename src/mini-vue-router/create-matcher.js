import { createRouteMap } from './create-route-map'

export function createMatcher (routes, router) {
  let { nameMap, pathMap } = createRouteMap(routes)

  return function match (location) {
    return pathMap[location]
  }
}
