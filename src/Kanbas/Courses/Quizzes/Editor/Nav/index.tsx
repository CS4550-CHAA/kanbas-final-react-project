import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();
  return (
    <div>
      <nav className="nav nav-tabs mt-2">
        <Link to="/Kanbas/Courses/:courseId/Quizzes/Editor/Details" className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>
          Details
        </Link>
        <Link to="/Kanbas/Courses/:courseId/Quizzes/Editor/Questions" className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
          Questions
        </Link>
      </nav>
    </div>
  )
}
export default Nav;