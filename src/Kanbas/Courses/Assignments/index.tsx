import React from "react";
import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <input
          id="text-fields-assignments"
          placeholder="Search for Assignments"
          className="assignmentsButton"
        />
        <button type="button" className="assignmentsButton btn btn-secondary">
          + Group
        </button>
        <button type="button" className="assignmentsButton btn btn-danger">
          {" "}
          + Assignment
        </button>
        <button type="button" className="assignmentsButton btn btn-secondary">
          <FaEllipsisV></FaEllipsisV>
        </button>
      </div>

      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <div className="row">
                  <div className="col-2">
                    <p className="multipleModules">Multiple Modules</p>
                  </div>
                  <div className="col">
                    <p>| Due 3/16/24 | 100 points</p>
                  </div>
                </div>

                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;
