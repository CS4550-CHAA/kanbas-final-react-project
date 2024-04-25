import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import * as client from "../../client";
import { Quiz } from "../../client";
import { FaChevronDown, FaEllipsisV, FaPen } from "react-icons/fa";
import Nav from "../Nav";
import * as questionClient from "../../questionClient";
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnBulletList, BtnClearFormatting, BtnNumberedList, BtnLink, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo } from 'react-simple-wysiwyg';
function QuizDetailsEditor() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
  // const [flag, setFlag] = useState(false);
  const [points, setPoints] = useState(0);

  const getQuizPoints = async (id: any) => {
    let totalPoints = 0;
    if (quizId) {
      const allQuestions = await questionClient.findAllQuestionsForQuiz(id);
      allQuestions.forEach((question: any) => {
        totalPoints += question.points;
      });
    }
    setPoints(totalPoints);
  };

  useEffect(() => {
    if (quizId) {
      getQuizPoints(quizId);
    }
  }, [quizId]);

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

  const deleteQuiz = async (quiz: Quiz) => {
    try {
      await client.deleteQuiz(quiz);
      setQuizzes(quizzes.filter((q) => q.id !== quiz.id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuizzes = async () => {
    if (courseId) {
      const quizzes = await client.findQuizzesForCourse(courseId);
      setQuizzes(quizzes);
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const updateQuiz = async () => {
    const newQuiz = await client.updateQuiz(quiz);
    setQuiz(newQuiz);
  };

  const publishQuiz = async () => {
    setQuiz({ ...quiz, published: true });
    const newQuiz = await client.updateQuiz(quiz);
    setQuiz(newQuiz);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Nav />
      <input
        value={String(quiz?.title)}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <br />
      <p> Quiz Instructions: </p>
      <EditorProvider>
                    <Editor value={String(quiz?.description)} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        >
                        <Toolbar>
                            <BtnUndo />
                            <BtnRedo />
                            <BtnStrikeThrough />
                            <BtnBold />
                            <BtnItalic />
                            <BtnBulletList />
                            <BtnNumberedList />
                            <BtnLink />
                            <BtnStyles />
                            <BtnClearFormatting />
                        </Toolbar>
                    </Editor>
                </EditorProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <label>p</label>
      </div>

      <label htmlFor="quiz-type">Quiz Type</label>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {quiz.quizType}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, quizType: "Graded Quiz" })}
          >
            Graded Quiz
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, quizType: "Practice Quiz" })}
          >
            Practice Quiz
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, quizType: "Graded Survey" })}
          >
            Graded Survey
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, quizType: "Ungraded Survey" })}
          >
            Ungraded Survey
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <label htmlFor="quiz-type">Assignment Group</label>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {quiz.assignmentGroup}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, assignmentGroup: "Quizzes" })}
          >
            Quizzes
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, assignmentGroup: "Exams" })}
          >
            Exams
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, assignmentGroup: "Assignments" })}
          >
            Assignments
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setQuiz({ ...quiz, assignmentGroup: "Project" })}
          >
            Project
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h5>Options</h5>
      <div>
        {" "}
        <input
          type="checkbox"
          value="Shuffle Answers"
          id="shuffle"
          checked={quiz.shuffleAnswers === "Yes"}
          onChange={() =>
            quiz.shuffleAnswers === "Yes"
              ? setQuiz({ ...quiz, shuffleAnswers: "No" })
              : setQuiz({ ...quiz, shuffleAnswers: "Yes" })
          }
        />
        <label htmlFor="shuffle">Shuffle Answers</label>
      </div>

      <p>{points} Points</p>

      <div className="flex-row">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <input type="checkbox" value="Time Limit" id="time" />
          {/* <label htmlFor="time">{quiz.timeLimit.toString()}</label> */}
        </div>

        <input
          type="number"
          value={String(quiz.timeLimit)}
          onChange={(e) =>
            setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })
          }
        />
        <label>Minutes</label>
      </div>

      <div>
        {" "}
        <input
          type="checkbox"
          value="Allow Multiple Attempts"
          id="attempts"
          checked={quiz.multipleAttempts === "Yes"}
          onChange={() =>
            quiz.multipleAttempts === "Yes"
              ? setQuiz({ ...quiz, multipleAttempts: "No" })
              : setQuiz({ ...quiz, multipleAttempts: "Yes" })
          }
        />
        <label htmlFor="attempts">Allow Multiple Attemps</label>
      </div>

      <div>
        {" "}
        <input
          type="checkbox"
          id="One"
          // checked={quiz.oneQuestionAtATime === "Yes"}
          // onChange={() =>
          //   quiz.oneQuestionAtATime === "Yes"
          //     ? setQuiz({ ...quiz, oneQuestionAtATime: "No" })
          //     : setQuiz({ ...quiz, oneQuestionAtATime: "Yes" })
          // }
        />
        <label htmlFor="One">Show Correct Answers</label>
      </div>

      <label htmlFor="access">Access Code</label>
      <textarea
        id="access"
        value={String(quiz.accessCode)}
        onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
      />

      <div>
        {" "}
        <input
          type="checkbox"
          id="One"
          checked={quiz.oneQuestionAtATime === "Yes"}
          onChange={() =>
            quiz.oneQuestionAtATime === "Yes"
              ? setQuiz({ ...quiz, oneQuestionAtATime: "No" })
              : setQuiz({ ...quiz, oneQuestionAtATime: "Yes" })
          }
        />
        <label htmlFor="One">One Question at a Time</label>
      </div>

      <div>
        {" "}
        <input
          type="checkbox"
          id="WebCam"
          checked={quiz.webCamRequired === "Yes"}
          onChange={() =>
            quiz.webCamRequired === "Yes"
              ? setQuiz({ ...quiz, webCamRequired: "No" })
              : setQuiz({ ...quiz, webCamRequired: "Yes" })
          }
        />
        <label htmlFor="WebCam">WebCam Required</label>
      </div>

      <div>
        {" "}
        <input
          type="checkbox"
          id="lock"
          checked={quiz.lockQuestionsAfterAnswering === "Yes"}
          onChange={() =>
            quiz.lockQuestionsAfterAnswering === "Yes"
              ? setQuiz({ ...quiz, lockQuestionsAfterAnswering: "No" })
              : setQuiz({ ...quiz, lockQuestionsAfterAnswering: "Yes" })
          }
        />
        <label htmlFor="lock">Lock Questions after answering</label>
      </div>

      <label htmlFor="text-fields-due"> Due Date : </label>
      <input
        type="date"
        id="text-fields-due"
        value={String(new Date(quiz.dueDate).toISOString().slice(0, 10))}
        onChange={(e) =>
          setQuiz({ ...quiz, dueDate: new Date(e.target.value) })
        }
      />

      <label htmlFor="text-fields-available"> Available From: </label>
      <input
        type="date"
        id="text-fields-available"
        value={String(new Date(quiz.availableDate).toISOString().slice(0, 10))}
        onChange={(e) =>
          setQuiz({ ...quiz, availableDate: new Date(e.target.value) })
        }
      />

      <label htmlFor="text-fields-until"> Until: </label>
      <input
        type="date"
        id="text-fields-until"
        value={String(new Date(quiz.untilDate).toISOString().slice(0, 10))}
        onChange={(e) =>
          setQuiz({ ...quiz, untilDate: new Date(e.target.value) })
        }
      />

      <hr />
      <div className="row">
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input
              type="checkbox"
              value="Text Entry"
              name="text-entry"
              id="chkbox-text-entry"
            />
            <label> Notify users this quiz has changed </label>
          </div>
          <div>
            <button
              className="btn btn-light"
              style={{ backgroundColor: "lightgray", marginRight: "10px" }}
              // onClick={() => deleteQuiz(quiz)}
            >
              {" "}
              <Link
                to={`/Kanbas/Courses/${courseId}/Quizzes/`}
                style={{ textDecoration: "none" }}
              >
                Cancel
              </Link>{" "}
            </button>
            <button
              onClick={publishQuiz}
              className="btn btn-light"
              style={{ backgroundColor: "lightgray", marginRight: "10px" }}
            >
              {" "}
              <Link
                to={`/Kanbas/Courses/${courseId}/Quizzes/`}
                style={{ textDecoration: "none" }}
              >
                Save & Publish
              </Link>{" "}
            </button>
            <button onClick={updateQuiz} className="btn btn-danger">
              {" "}
              <Link
                to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Save
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuizDetailsEditor;
