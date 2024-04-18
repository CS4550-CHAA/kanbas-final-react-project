import { useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import './index.css';

function Nav() {
  const { pathname } = useLocation();
  const { courseId } = useParams();
  return (
    <div>
      <nav className="nav nav-tabs mt-2">
        {/*TODO add quizId*/}
        <Link to= {`/Kanbas/Courses/${courseId}/Quizzes/Editor/Details`}  className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>
          Details
        </Link>
        <Link to= {`/Kanbas/Courses/${courseId}/Quizzes/Editor/Questions`} className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
          Questions
        </Link>
      </nav>
    </div>
  )
}
export default Nav;