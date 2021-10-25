import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as constants from "../../contants";
import useInterval from "../../component/hooks/useInterval";

export const DemoUseSelector = () => {
  const dispatch = useDispatch();
  const onAdd = () => {
    console.info("----onAdd");
    dispatch({ type: constants.ADD_TODO });
  };
  const [num, setNum] = React.useState(0);

  useInterval(() => {
    setNum((num) => num + 1);
  }, 1000);
  return (
    <div>
      <div>num: {num}</div>
      <Child id={1} onAdd={onAdd} />
      <Child id={2} onAdd={onAdd} />
    </div>
  );
};

const Child = (props: { id: number; onAdd: () => void }) => {
  const todo = useSelector((state: any) => {
    return state.todos.filter((t: any) => t.id === props.id);
  });
  const onAdd = () => {
    props.onAdd();
  };
  return <div onClick={onAdd}>{todo[0]?.text}</div>;
};
