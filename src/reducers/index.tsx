import { createStore } from 'redux';
import { selector } from './selector';
import { StoreState } from '../types/index';

const store = createStore<StoreState, any, any, any>(selector, {
	count: 1,
	countObj: {
		count: 1
	}
});

export default store;