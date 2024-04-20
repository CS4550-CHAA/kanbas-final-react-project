import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Nav from "./Nav";
import { FaEllipsisV } from "react-icons/fa";
import ConditionalPublished from "../ConditionalPublished";
import { Navigate, Route, Routes } from "react-router";
import Questions from "./Questions";
import Details from "./Details";

function Quizzes() {
  const { pathname } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const { courseId } = useParams();

  return (
    <div>
      <div className="flex-row">
        <div className="d-flex justify-content-end">
          <button className={"btn"}>Points: {points}</button>
          <ConditionalPublished />
          <button className="btn btn-secondary">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />
      <Nav />
      <Routes>
        {/* <Route
          path="/"
          element={<Navigate to={`/Kanbas/Courses/${courseId}/Quizzes/`} />}
        /> */}
        {/* <Route path=":quizId/Editor/Questions" element={<Questions />} />
        <Route path=":quizId/Editor/Details" element={<Details />} /> */}
      </Routes>
    </div>
  );
}
export default Quizzes;
