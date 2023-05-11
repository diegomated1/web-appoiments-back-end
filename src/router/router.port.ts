import { Router } from './router.dependency'

export default interface WebAppRouterPort {
  router: Router
  routes: () => void
}
