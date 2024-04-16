import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
}


const store = configureStore({
  reducer: {
    modulesReducer,
    // quizzesReducer
  },
});

export default store;
