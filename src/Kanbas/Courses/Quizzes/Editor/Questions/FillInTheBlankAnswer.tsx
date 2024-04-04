import exp from "node:constants";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashCan } from '@awesome.me/kit-KIT_CODE/icons'

function FillInTheBlankAnswer() {
    return (
        <div>
            <i className="fa-solid fa-trash-can"></i>

            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Answers</legend>
                <div className="col-sm-10">
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="r1"> Possible Answer: </label>
                        <input type={"text"} id={"r1"}></input>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="r2"> Possible Answer: </label>
                        <input type={"text"} id={"r2"}></input>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="r3"> Possible Answer: </label>
                        <input type={"text"} id={"r3"}></input>

                    </div>


                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-danger" type="button">+ Add Another Answer</button>
                    </div>
                    <button className="btn btn-primary" type="button">Cancel</button>
                    <button className="btn btn-danger" type="button">Update Question</button>

                </div>
            </fieldset>
        </div>
    );
}

export default FillInTheBlankAnswer;