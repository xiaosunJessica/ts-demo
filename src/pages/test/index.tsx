// This is a React Quiz from BFE.dev

// import React, {Component} from 'react';

// class ErrorBoundary extends Component<
//   { name: string; children: React.ReactNode },
//   { hasError: boolean }
// >{
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch() {
//     console.log(this.props.name);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>;
//     }

//     return <div>{this.props.children}</div>;
//   }
// }

// function renderWithError(): any {
//   throw new Error('error');
// }

// function A() {
//   return <ErrorBoundary name="boundary-2">{renderWithError()}</ErrorBoundary>;
// }

// function Test() {
//   return (
//     <ErrorBoundary name="boundary-1">
//       <A />
//     </ErrorBoundary>
//   )
// }



import React, { useEffect, useState } from "react";

type Test = 'a' |'b'|'a1'
type Key1 = 'a'

type TestExclude = Exclude<Test, Key1>



const Test1 = () => {
  const [studyNum, setStudyNum] = useState<any>(0);
 

  // 死循环
  // useEffect(() => {
  //   setStudyNum(studyNum+1)
  // })


  // const [sObj, setSObj] = useState({})
  // useEffect(() => {
  //   setSObj({})
  // }, [sObj])

  const onRandom = () => {
    setStudyNum(Math.floor(Math.random() * 120))
  }
  

  return <div>{studyNum} <div className="btn" onClick={onRandom}>换题</div></div>
}

export default Test1





