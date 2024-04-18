import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "../Nav";

function Details() {
  const { pathname } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  return (
    <div>
        <p>Details</p>
    </div>
  );
}
export default Details;
