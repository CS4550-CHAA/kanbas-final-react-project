import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import quizzesReducer from "../Courses/Quizzes/Editor/Details/reducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    quizzesReducer,
  },
});

export default store;
