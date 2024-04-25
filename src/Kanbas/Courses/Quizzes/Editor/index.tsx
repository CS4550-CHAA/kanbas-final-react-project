import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Nav from "./Nav";
import { FaEllipsisV } from "react-icons/fa";
import ConditionalPublished from "../ConditionalPublished";
import { Navigate, Route, Routes } from "react-router";
import Questions from "./Questions";
import Details from "./Details";
import * as questionClient from '../questionClient'

function Quizzes() {
  const [points, setPoints] = useState(0);
  const { quizId } = useParams();

  const getQuizPoints = async (id: any) => {
    let totalPoints = 0;
    if (quizId) {
      const allQuestions = await questionClient.findAllQuestionsForQuiz(id);
      allQuestions.forEach((question: any) => {
        totalPoints += question.points;
    });
    }
    setPoints(totalPoints)
  }

  useEffect(() => {
    if (quizId) {
      getQuizPoints(quizId);
    }
  }, [quizId]);

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
