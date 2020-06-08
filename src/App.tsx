import * as React from 'react';
import './App.css';
import { DemoUseSelector } from './pages/DemoUseSelector';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
				<DemoUseSelector />
      </div>
    );
  }
}

export default App;
