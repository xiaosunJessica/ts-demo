import * as React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import * as constants from '../../contants';


export const DemoUseSelector = () => {
	const dispatch = useDispatch();
	const store = useStore();
	const onAdd = () => {
		console.info('----onAdd')
		dispatch({type: constants.ADD_TODO})
	}
	console.info(store, '----storestore')
  return (
		<div>
			<Child id={1} onAdd={onAdd}/>
			<Child id={2} onAdd={onAdd}/>
		</div>
	)
}

const Child = (props: {
	id: number;
	onAdd: () => void;
}) => {
	const todo = useSelector((state:any) => {
		console.info(state, '----state-----', state.todos.filter((t: any) => t.id === props.id))
		return state.todos.filter((t: any) => t.id === props.id)
	})
	const onAdd = () => {
		props.onAdd()
	}
	return <div onClick={onAdd}>{todo[0]?.text}</div>
}

