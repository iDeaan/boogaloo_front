import {
  App,
  Sign,
  Home,
  Friends
} from './containers';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/sign',
      exact: true,
      component: Sign,
    },
    {
      path: '/friends',
      exact: true,
      component: Friends,
    }
  ]
}];

export default routes;
