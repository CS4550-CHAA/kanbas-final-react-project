import { useState } from "react";
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Assignment3 from "../../../../Labs/a3";
import Assignment4 from "../../../../Labs/a4";
import Assignment5 from "../../../../Labs/a5";
import Details from "./Details";
import Questions from "./Questions";

function Quizzes() {
  const { pathname } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  return (
    <div>
        <p>Points: {points}</p>
        <p>Not Published</p>
        <button type="button">:</button>
        <hr />
        <Nav />
    </div>
  );
}
export default Quizzes;
