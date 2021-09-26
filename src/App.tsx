import * as React from "react";
import "./App.css";
import { DemoUseSelector } from "./pages/DemoUseSelector";
import SliderLogin from "./pages/slider-login";
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <DemoUseSelector />
        <SliderLogin />
      </div>
    );
  }
}

export default App;
