import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { FaExclamationCircle, FaPen } from "react-icons/fa";

function QuizPreview() {
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionNumbers = Array.from({ length: quiz.numberOfQuestions }, (_, index) => index + 1);
  return (
    <div>
      <h3>{quiz.title}</h3>
      <div style={{backgroundColor: "F7ECE9", color: "#B1330A", paddingTop: "15px", paddingBottom: "15px", paddingLeft: "15px"}}>
        <label>
            <FaExclamationCircle/> This is a preview of the published version of the quiz
        </label>
      </div>
      <br />
      <label>Started: Nov 29 at 8:19 am</label>
      <h1>Quiz Instructions</h1>
      <hr />
      <button style={{width: "100%"}}>
        <FaPen />
        Keep Editing This Quiz
      </button>
      <h3>Questions</h3>
      <h2>Questions:</h2>
      <ul>
        {questionNumbers.map((questionNumber) => (
          <li key={questionNumber}>Question {questionNumber}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuizPreview;
