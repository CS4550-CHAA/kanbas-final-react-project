import React from "react";
import "./index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuiz } from "./reducer";
import { KanbasState } from "../../store";
import Dropdown from "react-bootstrap/Dropdown";
import {
  FaRegUserCircle,
  FaTachometerAlt,
  FaBook,
  FaRegCalendarAlt,
  FaEnvelope,
  FaClock,
  FaTv,
  FaShareSquare,
  FaQuestionCircle,
} from "react-icons/fa";
function QuizDetailsEditor() {
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const links2 = [
    { label: "Home", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Modules", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Piazza", icon: <FaBook className="fs-2" /> },
    { label: "Zoom", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Assignments", icon: <FaEnvelope className="fs-2" /> },
    { label: "Quizzes", icon: <FaClock className="fs-2" /> },
    { label: "Grades", icon: <FaTv className="fs-2" /> },
    { label: "People", icon: <FaShareSquare className="fs-2" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        value="Unnamed Quiz"
        onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))}
      />
      <br />
      <p> Quiz Instructions: </p>
      {/* TODO: add the editor bar for instructions  */}
      <textarea
        value={quiz.instructions}
        onChange={(e) =>
          dispatch(setQuiz({ ...quiz, instructions: e.target.value }))
        }
      />
      {/* <div>
        <label htmlFor="quiz-type"></label>
        <select id="quiz-type">
          <option selectedValue="GradedQuiz">Graded Quiz</option>
          <option>Practice Quiz</option>
          <option>Graded Quiz</option>
        </select>
      </div> */}
      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle float-left"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          hi
        </button>
        <ul className="dropdown-menu bar">
          <li key="0" className="">
            Graded Quiz
          </li>
          <li>Practice Quiz</li>
          <li>Graded Survey</li>
          <li>Ungraded Survey</li>
        </ul>
      </div>
      {/* this doesnt work so ill use checkbox instead for now
    <Dropdown>
      <Dropdown.Toggle
        className="quizzesButton btn btn-secondary"
        variant="secondary"
        id="dropdown-basic"
      ></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={(e) => dispatch(setQuiz({ ...quiz, type: e.target.value }))}
        >
          Graded Quiz
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDeleteQuiz}>Practice Quiz</Dropdown.Item>
        <Dropdown.Item onClick={handlePublishQuiz}>Publish</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
      {/* <input type="checkbox">
      value={quiz.shuffle}
      onChange={(e) =>
        dispatch(setQuiz({ ...quiz, shuffle: e.target.value }))
      }{" "}
    </input> */}
      <br />
      <div>
        {" "}
        <input type="checkbox" value="Shuffle Answers" id="shuffle" />
        <label htmlFor="shuffle">Shuffle Answers</label>
      </div>

      {/* TODO: make the time limit and minutes in the same row  */}
      <div className="flex-row">
        <div>
          {" "}
          <input type="checkbox" value="Time Limit" id="time" />
          <label htmlFor="time">Time Limit</label>
        </div>

        <input
          type="number"
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, minutes: parseInt(e.target.value) }))
          }
        />
        <label>Minutes</label>
      </div>

      <div>
        {" "}
        <input type="checkbox" value="Allow Multiple Attempts" id="attempts" />
        <label htmlFor="attempts">Allow Multiple Attemps</label>
      </div>

      <div>
        {" "}
        <input type="checkbox" id="One" />
        <label htmlFor="One">One Question at a Time</label>
      </div>

      <div>
        {" "}
        <input type="checkbox" id="WebCam" />
        <label htmlFor="WebCam">WebCam Required</label>
      </div>

      <div>
        {" "}
        <input type="checkbox" id="lock" />
        <label htmlFor="lock">Lock Questions after answering</label>
      </div>

      <label htmlFor="text-fields-due"> Due Date : </label>
      <input
        type="date"
        id="text-fields-due"
        value="2000-01-21"
        onChange={(e) =>
          dispatch(setQuiz({ ...quiz, "due-date": e.target.value }))
        }
      />

      <label htmlFor="text-fields-available"> Available Date: </label>
      <input type="date" id="text-fields-available" value="2000-01-21" />

      <label htmlFor="text-fields-from"> Available From: </label>
      <input type="date" id="text-fields-from" value="2000-01-21" />

      <label htmlFor="text-fields-until"> Until: </label>
      <input type="date" id="text-fields-until" value="2000-01-21" />

      <hr />
      <div className="row">
        <div>
          <input
            type="checkbox"
            value="Text Entry"
            name="text-entry"
            id="chkbox-text-entry"
          />
          <label> Online Entry Options</label>
        </div>

        <br />
        <div>
          <button> Cancel </button>
          <button> Save </button>
          <button> Save/Publish </button>
        </div>
      </div>
    </div>
  );
}
export default QuizDetailsEditor;
