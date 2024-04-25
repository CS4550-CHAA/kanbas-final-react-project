import React, { useEffect, useState } from "react";
import "./index.css";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import * as client from "./client";
import { Quiz } from "./client";
function QuizList() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
  const [flag, setFlag] = useState(false);
  const createQuiz = async () => {
    try {
      if (courseId) {
        const newQuiz: Quiz = await client.createQuiz(quiz);
        newQuiz["course"] = courseId;
        setQuiz(newQuiz);
        await updateQuiz();
        setQuizzes([newQuiz, ...quizzes]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuiz = async (quiz: Quiz) => {
    try {
      await client.deleteQuiz(quiz);
      setQuizzes(quizzes.filter((q) => q.id !== quiz.id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuiz = async () => {
    const newQuiz: Quiz = await client.updateQuiz(quiz);
    setQuiz(newQuiz);
  };

  const fetchQuizzesForCourse = async () => {
    if (courseId) {
      const quizzes = await client.findAllQuizzes();
      console.log("quizzes" + quizzes);
      setQuizzes(quizzes);
    }
  };
  useEffect(() => {
    console.log("courseid" + courseId);
    fetchQuizzesForCourse();
  }, [quizzes]);
  
  const publishQuiz = async (quiz: any) => {
    const newQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(newQuiz);
    const res = await client.findQuizById(quiz.id);
    setQuizzes(quizzes.map((q) => (q.id === res.id ? res : q)));
    console.log(res)
  }

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <input
          id="text-fields-assignments"
          placeholder="Search for Quizzes"
          className="quizzesButton"
        />
        <p> Please click the "Add Quiz" button below to create a new quiz:</p>
        <button
          type="button"
          className="quizzesButton btn btn-danger"
          onClick={() => createQuiz()}
        >
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}>
            + Quiz
          </Link>
        </button>
      </div>

      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> QUIZZES
            <span className="float-end">
              {flag ? (
                <FaCheckCircle className="text-success" />
              ) : (
                <FaTimesCircle className="text-danger" />
              )}
              <FaPlusCircle className="ms-2" />

              <FaEllipsisV className="ms-2" />
            </span>
          </div>

          <ul className="list-group">
            {quizzes.map((quiz: Quiz) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}>
                  {quiz.title}
                </Link>

                <div className="row">
                  <div className="col-2">
                    <p className="multipleModules">
                      Available Until {quiz.availableDate.toString()}{" "}
                    </p>
                  </div>

                  <div className="col">
                    <p>{quiz.availability}</p>
                    <p>Due {quiz.dueDate.toString()}</p>
                    <p>11 points</p>
                    {/* <p>{String(quiz.points)} points</p> TODO: make this a sum of all question points*/}

                    <p>{String(quiz.numberOfQuestions)} questions</p>
                  </div>
                </div>

                <span className="float-end">
                  {quiz.published ? (
                    <FaCheckCircle className="text-success" onClick={() => publishQuiz(quiz)} />
                  ) : (
                    <FaTimesCircle className="text-danger" onClick={() => publishQuiz(quiz)} />
                  )}

                  <Dropdown>
                    <Dropdown.Toggle
                      className="quizzesButton btn btn-secondary"
                      variant="secondary"
                      id="dropdown-basic"
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link
                          to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
                        >
                          Edit
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => deleteQuiz(quiz)}>
                        Delete
                      </Dropdown.Item>

                      {quiz.published ? (
                        <Dropdown.Item onClick={() => publishQuiz(quiz)}>
                          Unpublish
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item onClick={() => publishQuiz(quiz)}>
                          Publish
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default QuizList;
