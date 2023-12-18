import { legacy_createStore as createStore } from "redux";
import reducer from "./Products/reducer";

export const store = new createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
