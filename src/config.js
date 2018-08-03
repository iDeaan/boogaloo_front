const currentType = 'prod';

global.config = {
  apiHost: currentType === 'prod' ? 'http://boogaloo.com.ua/api' : 'http://localhost:3030'
};
