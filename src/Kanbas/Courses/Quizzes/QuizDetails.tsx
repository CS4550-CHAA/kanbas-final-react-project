import React, { useEffect, useState } from "react";
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
    title: "Quiz",
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
  const [flag, setFlag] = useState(false);

  const getQuizById = async (id: any) => {
    const newQuiz = await client.findQuizById(id);
    setQuiz(newQuiz);
  };
  useEffect(() => {
    if (quizId) {
      getQuizById(quizId);
    }
  }, []);

  const updateQuiz = async () => {
    const newQuiz = await client.updateQuiz(quiz);
    setQuiz(newQuiz);
  };

  const publishQuiz = async () => {
    setQuiz({ ...quiz, published: true });
    const newQuiz = await client.updateQuiz(quiz);
    setQuiz({ ...newQuiz, published: true });
    setQuiz(newQuiz);
    setFlag((flag) => !flag);
  };

  console.log(quiz);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          style={
            flag
              ? { backgroundColor: "red", color: "white" }
              : { backgroundColor: "green", color: "white" }
          }
          onClick={() => publishQuiz()}
        >
          <FaCheckCircle /> {flag ? "Unpublish" : "Publish"}
        </button>

        <button>
          <Link
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizPreview`}
          >
            Preview
          </Link>
        </button>
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
      <h3>{quiz?.title}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingRight: "20px",
          }}
        >
          <label>Quiz Type</label>
          <label>Points</label>
          <label>Assignment Group</label>
          <label>Shuffle Answers</label>
          <label>Time Limit</label>
          <label>Multiple Attempts</label>
          <label>Show Correct Answers</label>
          <label>Access Code</label>
          <label>One Question at a Time</label>
          <label>Webcam Required</label>
          <label>Lock Questions After Answering</label>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>{quiz?.quizType}</label>
          <label>10</label>
          <label>{/* <p>{String(quiz.points)}</p> */}</label>
          <label>QUIZZES</label>
          <label>{quiz?.shuffleAnswers}</label>
          <label>{String(quiz?.timeLimit)}</label>
          <label>{quiz?.multipleAttempts}</label>
          <label>{quiz?.showCorrectAnswers}</label>
          <label>{quiz?.accessCode}</label>
          <label>{quiz?.oneQuestionAtATime}</label>
          <label>{quiz?.webCamRequired}</label>
          <label>{quiz?.lockQuestionsAfterAnswering}</label>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <h6>Due</h6>
          <hr style={{ width: "100%" }} />
          {String(quiz?.dueDate)}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <h6>For</h6>
          <hr style={{ width: "100%" }} />
          <label>Everyone</label>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <h6>Available from</h6>
          <hr style={{ width: "100%" }} />
          {String(quiz?.availableDate)}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h6 style={{ paddingRight: "50px" }}>Until</h6>
          <hr style={{ width: "100%" }} />
          <label style={{ paddingRight: "50px" }}>
            {String(quiz?.untilDate)}
          </label>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default QuizDetails;
