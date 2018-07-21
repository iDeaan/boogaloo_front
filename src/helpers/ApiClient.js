import superagent from 'superagent';
// import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class ApiClient {
  constructor(req) {
    methods.forEach(method =>
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](path);

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        if (headers) {
          headers.forEach((header) => {
            request.set(header.name, header.value);
          });
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  /* eslint-disable */
  empty() {}
  /* eslint-enable */
}
