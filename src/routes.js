import {
  App,
  Sign,
  Home
} from './containers';

import authenticated from './helpers/authenticated';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: authenticated(Home),
    },
    {
      path: '/sign',
      exact: true,
      component: Sign,
    }
  ]
}];

export default routes;
