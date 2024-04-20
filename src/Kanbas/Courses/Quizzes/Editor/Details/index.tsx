import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuiz } from "./reducer";
import { KanbasState } from "../../../../store";
import Dropdown from "react-bootstrap/Dropdown";
import * as client from "../../client";
import { Quiz } from "../../client";
import { FaChevronDown, FaEllipsisV, FaPen } from "react-icons/fa";
import { create } from "domain";
function QuizDetailsEditor() {
  const { courseId } = useParams();
  // const quizList = useSelector(
  //   (state: KanbasState) => state.quizzesReducer.quizzes
  // );
  // const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  // const dispatch = useDispatch();
  // const handleAddQuiz = () => {
  //   if (courseId) {
  //     client.createQuiz(courseId, quiz).then((quiz) => {
  //       dispatch(addQuiz(quiz));
  //     });
  //   }
  // };
  // const handleDeleteQuiz = (quizId: string) => {
  //   client.deleteQuiz(quizId).then((status) => {
  //     dispatch(deleteQuiz(quizId));
  //   });
  // };

  // const handlePublishQuiz = () => {
  //   if (courseId) {
  //     client.createQuiz(courseId, quiz).then((quiz) => {
  //       dispatch(setQuiz({ ...quiz, published: true }));
  //       dispatch(addQuiz(quiz));
  //     });
  //   }
  // };
  // const [selectedQuizType, setSelectedQuizType] = useState("Graded Quiz");
  // const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");

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

  const updateQuiz = async () => {
    const newQuiz = await client.updateQuiz(quiz);
    setQuiz(newQuiz);
  };

  function publishQuiz(): void {
    setQuiz({ ...quiz, published: true });
    createQuiz();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        value={quiz.title.toString()}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <br />
      <p> Quiz Instructions: </p>
      {/* TODO: add the editor bar for instructions  */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: "15px",
        }}
      >
        <div>
          <label style={{ paddingRight: "50px" }}>Edit</label>
          <label style={{ paddingRight: "50px" }}>View</label>
          <label style={{ paddingRight: "50px" }}>Insert</label>
          <label style={{ paddingRight: "50px" }}>Format</label>
          <label style={{ paddingRight: "50px" }}>Tools</label>
          <label style={{ paddingRight: "50px" }}>Table</label>
        </div>
        <label style={{ paddingRight: "50px" }}>100%</label>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <label style={{ paddingRight: "50px" }}>
          12 pt <FaChevronDown />
        </label>
        <label style={{ paddingRight: "50px" }}>
          Paragraph <FaChevronDown />
        </label>
        <label style={{ paddingRight: "50px" }}> | </label>
        <label style={{ paddingRight: "50px" }}> B </label>
        <label style={{ paddingRight: "50px" }}> I </label>
        <label style={{ paddingRight: "50px" }}> U </label>
        <label style={{ paddingRight: "50px" }}>
          {" "}
          A <FaChevronDown />{" "}
        </label>
        <label style={{ paddingRight: "50px" }}>
          {" "}
          <FaPen /> <FaChevronDown />{" "}
        </label>
        <label style={{ paddingRight: "50px" }}>
          {" "}
          T2 <FaChevronDown />{" "}
        </label>
        <label style={{ paddingRight: "50px" }}> | </label>
        <label style={{ paddingRight: "50px" }}>
          {" "}
          <FaEllipsisV /> <FaChevronDown />{" "}
        </label>
      </div>
      <textarea
      // value={quiz.instructions} TODO: add this to schema
      // onChange={updateQuiz}
      />
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
          {/* {selectedQuizType} TODO: add to schema*/}
        </Dropdown.Toggle>
        {/* <Dropdown.Menu>
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
        </Dropdown.Menu> */}
      </Dropdown>
      <br />
      <label htmlFor="quiz-type">Assignment Group</label>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {/* {assignmentGroup} TODO: add to schema or hardcode*/}
        </Dropdown.Toggle>
        {/* <Dropdown.Menu>
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
        </Dropdown.Menu> */}
      </Dropdown>
      <h5>Options</h5>
      <div>
        {" "}
        <input type="checkbox" value="Shuffle Answers" id="shuffle" />
        <label htmlFor="shuffle">Shuffle Answers</label>
      </div>

      {/* TODO: make the time limit and minutes in the same row  */}
      <div className="flex-row">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <input type="checkbox" value="Time Limit" id="time" />
          <label htmlFor="time">Time Limit</label>
        </div>

        {/* TODO: add minutes <input
          type="number"
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, minutes: parseInt(e.target.value) }))
          }
        /> */}
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
        value={quiz.dueDate ? quiz.dueDate.toISOString().split("T")[0] : ""}
        onChange={(e) =>
          setQuiz({ ...quiz, dueDate: new Date(e.target.value) })
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
              onClick={() => deleteQuiz(quiz)}
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
            <button onClick={createQuiz} className="btn btn-danger">
              {" "}
              <Link
                to={`/Kanbas/Courses/${courseId}/Quizzes/`}
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
