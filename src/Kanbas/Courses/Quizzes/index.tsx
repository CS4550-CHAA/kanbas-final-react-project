import React, { useEffect, useState } from "react";
import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import * as client from "./client";
import { Quiz } from "./client";
function QuizList() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({
    id: "",
    title: "Quiz",
    availability: "",
    published: false,
    dueDate: new Date(0),
    points: 0,
    numberOfQuestions: 0,
    course: "",
  });

  const createQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(quiz);
      setQuizzes([newQuiz, ...quizzes]);
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

  const fetchQuizzes = async () => {
    const quizzes = await client.findAllQuizzes();
    setQuizzes(quizzes);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  console.log(quizzes);

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
              <FaCheckCircle className="text-success" />

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
                    <p className="multipleModules">{quiz.availability}</p>
                  </div>

                  <div className="col">
                    <p>Due {quiz.dueDate.toString()}</p>
                    <p>{String(quiz.points)} points</p>

                    <p>{String(quiz.numberOfQuestions)} questions</p>
                  </div>
                </div>

                <span className="float-end">
                  <FaCheckCircle className="text-success" />

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

                      <Dropdown.Item onClick={() => deleteQuiz(quiz)}>
                        Publish
                      </Dropdown.Item>
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
