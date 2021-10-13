import * as React from "react";
import "./App.css";
import { DemoUseSelector } from "./pages/DemoUseSelector";
import SliderLogin from "./pages/slider-login";
// import Dazhuanpan from "./pages/dazhuanpan";
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <SliderLogin />
        <DemoUseSelector />
        {/* <Dazhuanpan /> */}
      </div>
    );
  }
}

export default App;
