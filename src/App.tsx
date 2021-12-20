import * as React from "react";
import "./App.css";
import { DemoUseSelector } from "./pages/DemoUseSelector";
import SliderLogin from "./pages/slider-login";
import Dazhuanpan from "./pages/dazhuanpan";
import HooksDemo from "./pages/hooksDemo";
import VisualList from "./pages/visualList";
import Dazhuanpan1 from "./pages/dazhuanpan1";
import NineGame from "./pages/nineGame";
// import NineGrid from "./pages/nineGrid";
import NineGrid1 from "./pages/nineGrid1";
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NineGrid1 />
        {/* <NineGrid /> */}
        <NineGame />
        <Dazhuanpan1 />
        <SliderLogin />
        <DemoUseSelector />
        <Dazhuanpan />
        <HooksDemo />
        <VisualList />
      </div>
    );
  }
}

export default App;
