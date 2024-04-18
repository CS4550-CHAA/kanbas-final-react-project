import React, { useEffect } from "react";
import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./Editor/Details/reducer";
import * as client from "./Editor/Details/client";
function QuizList() {
  const { courseId } = useParams();

  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };

  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  useEffect(() => {
    if (courseId) {
      client
        .findQuizzesForCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)));
    }
  }, [courseId]);

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

  const handlePublishQuiz = (quizId: string) => {
    // TODO: we have to update quiz to be unpublished
  };

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
          onClick={() => handleAddQuiz()}
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
            {quizList.map((quiz) => (
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
                    <p>Due {quiz["due-date"]}</p>
                    <p>{quiz.points} points</p>
                    <p>{quiz["number-of-questions"]} questions</p>
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
                      <Dropdown.Item onClick={() => handleDeleteQuiz(quiz.id)}>
                        Delete{" "}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handlePublishQuiz(quiz.id)}>
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
