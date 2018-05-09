import {
  App,
  Register
} from './containers';

const routes = [{
  path: '/',
  component: App,
  routes: [
    {
      path: '/registration',
      exact: true,
      component: Register,
    }
  ]
}];

export default routes;
