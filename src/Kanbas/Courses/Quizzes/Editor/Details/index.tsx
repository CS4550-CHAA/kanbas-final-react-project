import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
