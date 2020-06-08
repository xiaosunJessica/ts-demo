import { Action } from '../actions';
import { StoreState } from '../types/index';

import { INCREMENT,INCREMENT_OBJECT, DECREMENT, NUMBER1, RESET_OBJECT } from '../contants/index';

export function selector(state: StoreState, action: Action): StoreState {
	switch(action.type) {
		case INCREMENT:
			return { ...state, count: state.count + 1 };
		case INCREMENT_OBJECT:
			return { ...state, countObj: {
				count: state.countObj.count + 1
			} };
		case DECREMENT:
			return { ...state, count: Math.max(1, state.count - 1) };
		case NUMBER1:
			return { ...state, count: 1 };
		case RESET_OBJECT:
			return { ...state, countObj: {
				count: 1
			}  };
		default: 
			return state;
	}
}