const PEOPLES_LOAD_START = 'boogaloo/friends/FRIENDS_LOAD_START';
const PEOPLES_LOAD_SUCCESS = 'boogaloo/auth/FRIENDS_LOAD_SUCCESS';
const PEOPLES_LOAD_FAIL = 'boogaloo/auth/FRIENDS_LOAD_FAIL';

const SEARCH_PEOPLES_LOAD_START = 'boogaloo/friends/SEARCH_FRIENDS_LOAD_START';
const SEARCH_PEOPLES_LOAD_SUCCESS = 'boogaloo/auth/SEARCH_FRIENDS_LOAD_SUCCESS';
const SEARCH_PEOPLES_LOAD_FAIL = 'boogaloo/auth/SEARCH_FRIENDS_LOAD_FAIL';

const initialState = {
  peoples: [],
  currentPage: 0,
  loading: false,
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case PEOPLES_LOAD_START:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case PEOPLES_LOAD_SUCCESS: {
      let peoplesArray = action.result.data;
      if (action.result && action.result.data && action.order && action.order.length) {
        const sortedIds = action.order;
        const peoplesWithOrders = action.result.data.map(people =>
          ({...people, ...sortedIds.find(item => item.id === people.id)}));
        peoplesArray = peoplesWithOrders.sort((first, second) => first.order - second.order);
      }

      return {
        ...state,
        loading: false,
        loaded: true,
        peoples: peoplesArray,
        error: null
      };
    }
    case PEOPLES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SEARCH_PEOPLES_LOAD_START:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case SEARCH_PEOPLES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      };
    case SEARCH_PEOPLES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export function loadUsersList(idsList, limit = 20, offset = 0, order) {
  return {
    types: [PEOPLES_LOAD_START, PEOPLES_LOAD_SUCCESS, PEOPLES_LOAD_FAIL],
    promise: client => client.get(`http://localhost:3030/users?limit=${limit}&offset=${offset}${idsList && idsList.length ? `&where=(id*IN*${idsList})` : ''}&relations=images`),
    order
  };
}

export function searchUsersByString(searchString) {
  return {
    types: [SEARCH_PEOPLES_LOAD_START, SEARCH_PEOPLES_LOAD_FAIL, SEARCH_PEOPLES_LOAD_SUCCESS],
    promise: client => client.get(`http://localhost:3030/search?query=${searchString}`)
  }
}
