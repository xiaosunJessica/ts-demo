import * as constants from '../contants';

export interface Increment {
	type: constants.INCREMENT;
}
export interface IncrementObj {
	type: constants.INCREMENT_OBJECT;
}

export interface Decrement {
	type: constants.DECREMENT;
}

export interface Number1 {
	type: constants.NUMBER1
}
export interface ResetObj {
	type: constants.RESET_OBJECT
}


export type Action = Increment | Decrement | Number1 |IncrementObj |ResetObj;


export function incrementAction(): Increment {
	return {
		type: constants.INCREMENT
	}
}

export function incrementObjAction(): IncrementObj {
	return {
		type:  constants.INCREMENT_OBJECT
	}
}

export function decrementAction(): Decrement {
	return {
		type: constants.DECREMENT
	}
}

export function resetAction(): Number1 {
	return {
		type: constants.NUMBER1
	}
}
export function resetObjAction(): ResetObj {
	return {
		type: constants.RESET_OBJECT
	}
}

