import React, { useEffect, useState } from "react";
import { KanbasState } from "../../store";
import {
  FaPen,
  FaChevronRight,
  FaQuestion,
  FaCheckCircle,
  FaEllipsisV,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Quiz } from "./client";
import * as client from "./client";

function QuizDetails() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>({
    id: "",
    title: "",
    availability: "",
    description: "",
    published: false,
    dueDate: new Date(0),
    numberOfQuestions: 0,
    course: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: 20,
    multipleAttempts: "No",
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    webCamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    availableDate: new Date(0),
    untilDate: new Date(0),
  });

  const getQuizById = async (id: any) => {
    const newQuiz = await client.findQuizById(id);
    setQuiz(newQuiz);
  };
  useEffect(() => {
    if (quizId) {
      getQuizById(quizId);
    }
  }, []);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button style={{ backgroundColor: "green", color: "white" }}>
          <FaCheckCircle /> Published
        </button>
        <button>Preview</button>
        <button>
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor`}>
            <FaPen /> Edit
          </Link>
        </button>
        <button>
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <h3>{quiz.title}</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "right",
          }}
        >
          <label>Quiz Type</label>
          <label>Points</label>
          <label>Assignment Group</label>
          <label>Shuffle Answers</label>
          <label>Time Limit</label>
          <label>Multiple Attempts</label>
          <label>Show Correct Answers</label>
          <label>One Question at a Time</label>
          <label>Webcam Required</label>
          <label>Lock Questions After Answering</label>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {quiz.quizType}
          {/* <p>{String(quiz.points)}</p> */}
          <label>QUIZZES</label>
          {/* {quiz.shuffleAnswers} TODO: add this into the database*/}
          {/* {quiz.timeLimit} TODO: add this into the database*/}
          {/* {quiz.multipleAttempts} TODO: add this into the database*/}
          {/* {quiz.showCorrect} TODO: add this into the database*/}
          {/* {quiz.oneQuestionAtATime} TODO: add this into the database*/}
          {/* {quiz.webcamRequired} TODO: add this into the database*/}
          {/* {quiz.lockQuestionsAfterAnswering} TODO: add this into the database*/}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <h6>Due</h6>
        <h6>For</h6>
        <h6>Available from</h6>
        <h6>Until</h6>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        {/* {quiz.dueDate} TODO: add this into the database*/}
        <label>Everyone</label>
        {/* {quiz.availableDate} TODO: add this into the database*/}
        {/* {quiz.untilDate} TODO: add this into the database*/}
      </div>
      <hr />
    </div>
  );
}

export default QuizDetails;
