// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {incrementAction, resetAction, incrementObjAction, resetObjAction} from '../../actions'
// /**
//  * 对于 mapState 来讲，所有独立的状态域被绑定到一个对象(object) 上返回。
//  * 返回对象的引用是否是新的并不重要——因为 connect() 会单独的比较每一个域。
//  * 对于 useSelector() 来说，返回一个新的对象引用总是会触发重渲染，
//  * 作为 useSelector() 默认行为
//  */
// export const DemoUseSelector = () => {
// 	const dispatch = useDispatch()
//   const counter = useSelector((state: any) => {
// 		console.info(state, '----state-----')
// 		return state.count
// 	})
//   const counterObj = useSelector((state: any) => {
// 		console.info(state, '----state-----counterObj')
// 		return state.countObj
// 	})
// 	const increment = () => {
// 		dispatch(incrementAction())
// 	}
// 	const incrementObj = () => {
// 		dispatch(incrementObjAction())
// 	}

// 	const reset = () => {
// 		dispatch(resetAction())
// 	}

// 	const resetObj = () => {
// 		dispatch(resetObjAction())
// 	}

// 	console.info('--------render-------')
//   return (
// 		<div>
// 			<div onClick={increment}> increment </div>
// 		 	<div style={{color: 'red'}}>{counter}</div>
// 			<div onClick={reset}>重置1</div>
// 			<div>----------------</div>
// 			<div onClick={incrementObj}> incrementOBJ </div>
// 			{/* <div onClick={() => {
// 							dispatch(incrementObjAction())
// 						}}> increment </div> */}
// 		 	<div style={{color: 'red'}}>{counterObj.count}</div>
// 			<div onClick={resetObj}>重置OBJ</div>
// 		</div>
// 	)
// }

//-------------------------

// // 添加shallowEqual, 如果是对象，值一样，不会触发re-render

// import * as React from 'react';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import {incrementAction, resetAction, incrementObjAction, resetObjAction} from '../../actions'

// export const DemoUseSelector = () => {
// 	const dispatch = useDispatch()
//   const counter = useSelector((state: any) => {
// 		console.info(state, '----state-----')
// 		return state.count
// 	}, shallowEqual)
//   const counterObj = useSelector((state: any) => {
// 		console.info(state, '----state-----counterObj')
// 		return state.countObj
// 	}, shallowEqual)
// 	const increment = () => {
// 		dispatch(incrementAction())
// 	}
// 	const incrementObj = () => {
// 		dispatch(incrementObjAction())
// 	}

// 	const reset = () => {
// 		dispatch(resetAction())
// 	}

// 	const resetObj = () => {
// 		dispatch(resetObjAction())
// 	}

// 	console.info('--------render-------')
//   return (
// 		<div>
// 			<div onClick={increment}> increment </div>
// 		 	<div style={{color: 'red'}}>{counter}</div>
// 			<div onClick={reset}>重置1</div>
// 			<div>----------------</div>
// 			<div onClick={incrementObj}> incrementOBJ </div>
// 			{/* <div onClick={() => {
// 							dispatch(incrementObjAction())
// 						}}> increment </div> */}
// 		 	<div style={{color: 'red'}}>{counterObj.count}</div>
// 			<div onClick={resetObj}>重置OBJ</div>
// 		</div>
// 	)
// }

//-------------------------

import * as React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {incrementAction, resetAction, incrementObjAction, resetObjAction} from '../../actions'

export const DemoUseSelector = () => {
	const dispatch = useDispatch()
  const counter = useSelector((state: any) => {
		console.info(state, '----state-----')
		return state.count
	}, shallowEqual)
  const counterObj = useSelector((state: any) => {
		console.info(state, '----state-----counterObj')
		return state.countObj
	}, shallowEqual)
	const increment = () => {
		dispatch(incrementAction())
	}
	const incrementObj = () => {
		dispatch(incrementObjAction())
	}

	const reset = () => {
		dispatch(resetAction())
	}

	const resetObj = () => {
		dispatch(resetObjAction())
	}

	console.info('--------render-------')
  return (
		<div>
			<div onClick={increment}> increment </div>
		 	<div style={{color: 'red'}}>{counter}</div>
			<div onClick={reset}>重置1</div>
			<div>----------------</div>
			<div onClick={incrementObj}> incrementOBJ </div>
			{/* <div onClick={() => {
							dispatch(incrementObjAction())
						}}> increment </div> */}
		 	<div style={{color: 'red'}}>{counterObj.count}</div>
			<div onClick={resetObj}>重置OBJ</div>
		</div>
	)
}