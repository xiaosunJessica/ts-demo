import { createStore } from "redux";
import { selector } from "./selector";
// import { StoreState } from "../types/index";

const store = createStore<any, any, any, any>(selector, {
  count: 1,
  countObj: {
    count: 1,
  },
  todos: [
    {
      text: "todo0",
      id: 0,
    },
    {
      text: "todo1",
      id: 1,
    },
  ],
});

export default store;
