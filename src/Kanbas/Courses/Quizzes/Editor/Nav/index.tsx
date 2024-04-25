import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css";

function Nav() {
  const { pathname } = useLocation();
  const { courseId, quizId } = useParams();
  return (
    <div>
      <nav className="nav nav-tabs mt-2">
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor/Details`}
          className={`nav-link ${
            pathname.includes("Details") || !pathname.includes("Questions")
              ? "active"
              : ""
          }`}
        >
          Details
        </Link>
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor/Questions`}
          className={`nav-link ${
            pathname.includes("Questions") ? "active" : ""
          }`}
        >
          Questions
        </Link>
      </nav>
    </div>
  );
}
export default Nav;
