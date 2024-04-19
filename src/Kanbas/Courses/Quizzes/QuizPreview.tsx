import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { FaPen } from "react-icons/fa";

function QuizPreview() {
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  return (
    <div>
      <h1>{quiz.title}</h1>
      <label>This is a preview of the published version of the quiz</label>
      <br />
      <label>Started: Nov 29 at 8:19 am</label>
      <h1>Quiz Instructions</h1>
      <hr />
      <button>
        <FaPen />
        Keep Editing This Quiz
      </button>
      <h3>Questions</h3>
    </div>
  );
}

export default QuizPreview;
