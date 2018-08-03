const currentType = 'prod';

const config = {
  apiHost: currentType === 'prod' ? 'http://boogaloo.com.ua/api' : 'http://localhost:3030'
};

module.exports = config;
