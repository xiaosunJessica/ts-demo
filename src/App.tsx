import * as React from 'react';
import './App.css';

import Hello from './component/Hello'; 
import * as actions from './actions';
import { StoreState } from './types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import logo from './logo.svg';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
	return {
		enthusiasmLevel,
		name: languageName
	}
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
	return {
		onIncrement: () => dispatch(actions.incrementEnthusiasm()),
		onDecrement: () => dispatch(actions.decrementEnthusiasm()),
	}
}
class App extends React.Component {
  public render() {
    return (
      <div className="App">
				<Hello name="typescript" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
