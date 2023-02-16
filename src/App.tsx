import * as React from "react";
import "./App.css";
// import { DemoUseSelector } from "./pages/DemoUseSelector";
// import SliderLogin from "./pages/slider-login";
// import Dazhuanpan from "./pages/dazhuanpan";
// import HooksDemo from "./pages/hooksDemo";
// import VisualList from "./pages/visualList";
// import Dazhuanpan1 from "./pages/dazhuanpan1";
// import NineGame from "./pages/nineGame";
// import NineGrid from "./pages/nineGrid";
// import NineGrid1 from "./pages/nineGrid1";
import Love from "./pages/love";
import Test from "./pages/test";
import test, { testVal } from './test.js'
// import Guaguaka from "./pages/guaguaka";

class App extends React.Component {
  public render() {
    console.log(test, '----test')
    test.a = 99999
    console.log(test, '----test')
    return (
      <div className="App">
        {/* <Guaguaka /> */}
        {/* <NineGrid1 />  */}
       {/* <NineGrid /> */}
        {/* <NineGame />
        <Dazhuanpan1 />
        <SliderLogin />
        <DemoUseSelector />
        <Dazhuanpan />
        <HooksDemo />
        <VisualList /> */}
        {/* <Love/> */}
        <Test />
      </div>
    );
  }
}

export default App;
