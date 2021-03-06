/* global window */
import ActionType from 'actions/ActionTypes';
import url from 'url';

const defaultState = Object.assign({
  Address: '',
  Radius: -1,
  Category: '',
}, url.parse(window.location.href, true).query);

delete defaultState.page;

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.SEARCH:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
