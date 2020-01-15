import * as React from 'react';
import './Hello.css'

function getExclamationMarks(numChars: number) {
	return Array(numChars + 1).join('!');
}

interface IProps {
	name: string,
	enthusiasmLevel?: number,
	onIncrement?: () => void;
	onDecrement?: () => void;
}

class Hello extends React.Component<IProps, object> {
	public render() {
		const { name, enthusiasmLevel = 1, onDecrement, onIncrement} = this.props;
		if (enthusiasmLevel <= 0) {
			throw new Error('You could be a little more enthusiastic : d');
		}

		return (
			<div className="hello">
				<div className="greeting">
					Hello {name + getExclamationMarks(enthusiasmLevel)}
				</div>
				<button onClick={onIncrement}>加1</button>
				<button onClick={onDecrement}>减1</button>
			</div>
		)
	}
}

export default Hello;
