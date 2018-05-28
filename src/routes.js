import {
  App,
  Sign,
  Home,
  Friends,
  People
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
    },
    {
      path: '/people',
      exact: true,
      component: People,
    }
  ]
}];

export default routes;
