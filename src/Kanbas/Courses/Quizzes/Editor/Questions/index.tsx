import React, { useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import './index.css';
import Question from "./Question";
import MCAnswer from "./MCAnswer";
import TFAnswer from "./TFAnswer";
import FillInTheBlankAnswer from "./FillInTheBlankAnswer";
import Nav from "../Nav";
import {IoSearch} from "react-icons/io5";
// import { quizzes } from "../../../../Database";


function Questions() {
  const { pathname } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);

  // TODO // Need to import quizzes from Database
  //   const { courseId } = useParams();
  //   const quizList = quizzes.filter(
  //       (quiz) => quiz.course === courseId);

    return (
    <div>
        {/*TODO need to have question lists here*/}
        <br/>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="quiz-btn" type="button">+ New Question</button>
            <button className="quiz-btn" type="button">+ New Question Group</button>
            <button className="quiz-btn" type="button"><IoSearch /> Find Questions</button>
        </div>
        <hr />
        <div className="d-grid gap-2 d-md-flex justify-content-between">
            <label>
                <input type="checkbox" />
                Notify users that this quiz has changed
            </label>
            <div className="d-grid d-md-flex float-end">
                <button className="quiz-btn" type="button">Cancel</button>
                <button className="quiz-btn" type="button">Save & Publish</button>
                <button className="quiz-btn-danger" type="button">Save</button>
            </div >
        </div>
        {/*<Question />*/}
        {/*<MCAnswer />*/}
        {/*<TFAnswer />*/}
        {/*<FillInTheBlankAnswer />*/}

        <hr />
    </div>
  );
}
export default Questions;
