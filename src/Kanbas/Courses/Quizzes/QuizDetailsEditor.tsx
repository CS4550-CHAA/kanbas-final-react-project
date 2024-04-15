import React, { useState } from "react";
import "./index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuiz } from "./reducer";
import { KanbasState } from "../../store";
import Dropdown from "react-bootstrap/Dropdown";
import * as client from "./client";
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
  FaTimes,
} from "react-icons/fa";
function QuizDetailsEditor() {
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const handleAddQuiz = () => {
    if (courseId) {
      client.createQuiz(courseId, quiz).then((quiz) => {
        dispatch(addQuiz(quiz));
      });
    }
  };
  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };

  const handlePublishQuiz = () => {
    if (courseId) {
      client.createQuiz(courseId, quiz).then((quiz) => {
        dispatch(setQuiz({ ...quiz, published: true }));
        dispatch(addQuiz(quiz));
      });
    }
  };
  const [selectedQuizType, setSelectedQuizType] = useState("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        value={quiz.title}
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

      <label htmlFor="quiz-type">Quiz Type</label>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {selectedQuizType}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedQuizType("Graded Quiz")}>
            Graded Quiz
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedQuizType("Practice Quiz")}>
            Practice Quiz
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedQuizType("Graded Survey")}>
            Graded Survey
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedQuizType("Ungraded Survey")}>
            Ungraded Survey
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <label htmlFor="quiz-type">Assignment Group</label>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {assignmentGroup}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setAssignmentGroup("Quizzes")}>
            Quizzes
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setAssignmentGroup("Exams")}>
            Exams
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setAssignmentGroup("Assignments")}>
            Assignments
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setAssignmentGroup("Project")}>
            Project
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
          <button
          //delete quiz here?
          >
            {" "}
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/`}>Cancel</Link>{" "}
          </button>
          <button onClick={() => handleAddQuiz()}>
            {" "}
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/`}>Save</Link>{" "}
          </button>
          <button onClick={() => handlePublishQuiz()}>
            {" "}
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/`}>
              Save/Publish
            </Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default QuizDetailsEditor;
