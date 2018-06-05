const SET_SIDEBAR_MODULE = 'boogaloo/sidebarModule/SET_SIDEBAR_MODULE';

const initialState = {
  sidebarModule: 'todo'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SIDEBAR_MODULE:
      return {
        ...state,
        sidebarModule: action.sidebarModule
      };
    default:
      return state;
  }
}

export function setSidebarModule(moduleName) {
  return {
    type: [SET_SIDEBAR_MODULE],
    sidebarModule: moduleName
  };
}
