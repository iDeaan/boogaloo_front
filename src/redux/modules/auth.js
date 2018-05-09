const SIGN_START = 'boogaloo/auth/SIGN';
const SIGN_SUCCESS = 'boogaloo/auth/SIGN_SUCCESS';
const SIGN_FAIL = 'boogaloo/auth/SIGN_FAIL';

const initialState = {
  signing: false,
  signed: false,
  data: {},
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_START:
      return {
        ...state,
        signing: true
      };
    case SIGN_SUCCESS:
      return {
        ...state,
        signing: false,
        signed: true,
        data: action.result.data,
        error: null
      };
    case SIGN_FAIL:
      return {
        ...state,
        signing: false,
        signed: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function signIn(login = 'admin', password = 'admin') {
  return {
    types: [SIGN_START, SIGN_SUCCESS, SIGN_FAIL],
    promise: client => client.get(`http://localhost:3030/sign?login=${login}&password=${password}`)
  };
}
