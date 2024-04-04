import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Questions() {
  const { pathname } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  return (
    <div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="btn btn-primary" type="button">+ New Question</button>
            <button className="btn btn-primary" type="button">+ New Question Group</button>
            <button className="btn btn-primary" type="button">Find Questions</button>
        </div>
        <hr />
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <label>
                <input type="checkbox" />
                Notify users that this quiz has changed
            </label>
            <div>
                <button className="btn btn-warning" type="button">Cancel</button>
                <button className="btn btn-success" type="button">Save & Publish</button>
                <button className="btn btn-danger" type="button">Save</button>
            </div>  
        </div>
        <hr />
    </div>
  );
}
export default Questions;
