import { createStore } from 'redux';
import { enthusiasm } from './enthusiasm';
import { StoreState } from '../types/index';

const store = createStore<StoreState, any, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});

export default store;