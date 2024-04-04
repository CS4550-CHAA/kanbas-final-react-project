
import exp from "node:constants";
import React from "react";

function TFAnswer() {
    return (
        <div>
            <i className="fa-solid fa-trash-can"></i>

            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Answers</legend>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="r1"
                            value="option1"
                            checked
                        />
                        <label className="form-check-label" htmlFor="r1"> True</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="r2"
                            value="option1"
                            checked
                        />
                        <label className="form-check-label" htmlFor="r2"> False</label>
                    </div>

                    <button className="btn btn-primary" type="button">Cancel</button>
                    <button className="btn btn-danger" type="button">Update Question</button>

                </div>
            </fieldset>
        </div>
    );
}

export default TFAnswer;