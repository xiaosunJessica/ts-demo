import * as React from "react";
import "./App.css";
import { DemoUseSelector } from "./pages/DemoUseSelector";
import SliderLogin from "./pages/slider-login";
// import Dazhuanpan from "./pages/dazhuanpan";
import HooksDemo from "./pages/hooksDemo";
import VisualList from "./pages/visualList";
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <SliderLogin />
        <DemoUseSelector />
        {/* <Dazhuanpan /> */}
        <HooksDemo />
        <VisualList />
      </div>
    );
  }
}

export default App;
