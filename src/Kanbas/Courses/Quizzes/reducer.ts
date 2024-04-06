import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as {
    id: string;
    title: string;
    availability: string;
    published: boolean;
    "due-date": string;
    points: number;
    "number-of-questions": number;
    course: string;
  }[],
  quiz: {
    id: "new id",
    title: "new title",
    availability: "Closed",
    published: false,
    "due-date": "new due date",
    points: 0,
    "number-of-questions": 0,
    course: "new course",
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.quizzes,
      ];
    },
    setQuizzes: (state, action) => {
      state.quiz = action.payload;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
