// import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import axios from "axios";
import { useEffect, useState } from "react";
import QuizList from "./Quizzes";
import QuizNavigation from "./Quizzes/Editor";
import Details from "./Quizzes/Editor/Details";
import Questions from "./Quizzes/Editor/Questions";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";

function Courses({ courses }: { courses: any[] }) {
  const API_BASE = process.env.REACT_APP_API_BASE;
  const { courseId } = useParams();
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <div>
      <h2>
        <HiMiniBars3 /> Course {course?.name}
      </h2>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Quizzes" element={<QuizList />} />
            <Route path="Quizzes/:quizId/*" element={<QuizDetails />} />
            <Route path="Quizzes/:quizId/Editor" element={<QuizNavigation />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
            {/*TODO currently set to Quizzes/Editor, have to change to Quizzes (create index.tsx for Quiz)*/}
            {/* <Route path="Quizzes/*" element={<Quizzes />} /> */}
            <Route
              path="Quizzes/:quizId/Editor/Details"
              element={<Details />}
            />
            <Route
              path="Quizzes/:quizId/Editor/Questions"
              element={<Questions />}
            />
            <Route
              path="Quizzes/:quizId/QuizPreview"
              element={<QuizPreview />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
