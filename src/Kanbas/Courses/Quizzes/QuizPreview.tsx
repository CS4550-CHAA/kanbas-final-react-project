import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaPen } from "react-icons/fa";
import { Quiz } from "./client";
import { useParams } from "react-router";
import * as client from "./client";

function QuizPreview() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>({
    id: "Q" + Math.random().toString(4).slice(2),
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

  const fetchQuiz = async () => {
    if (quizId) {
      const curQuiz: Quiz = await client.findQuizById(quizId);
      setQuiz(curQuiz);
    }
  };

  useEffect(() => {
    async function fetchTheQuiz() {
      await fetchQuiz();
    }
    fetchTheQuiz();
  }, []);

  const questionNumbers = [1, 2, 3];
  //TODO:fix this
  // Array.from(
  //   { length: quiz.numberOfQuestions },
  //   (_, index) => index + 1
  // );
  return (
    <div>
      <h3>{quiz.title}</h3>
      <div
        style={{
          backgroundColor: "F7ECE9",
          color: "#B1330A",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft: "15px",
        }}
      >
        <label>
          <FaExclamationCircle /> This is a preview of the published version of
          the quiz
        </label>
      </div>
      <br />
      <label>Started: Nov 29 at 8:19 am</label>
      <h1>Quiz Instructions</h1>
      <hr />
      <button style={{ width: "100%" }}>
        <FaPen />
        Keep Editing This Quiz
      </button>
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
