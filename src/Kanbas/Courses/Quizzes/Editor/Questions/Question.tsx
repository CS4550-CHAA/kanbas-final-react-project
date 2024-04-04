function Question() {

    return (
        <div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <input type={"text"} placeholder={"Question Title"}/>
                <select className="form-select">
                    <option selected>Multiple Choice</option>
                    <option value="2">True/False</option>
                    <option value="3">Fill in the blanks</option>
                </select>
                <input type={"number"} placeholder={"0"}></input>
                <hr/>
            </div>

            <p>Enter your question text, then indicate the correct answer.</p>
            <h4>Question:</h4>
            <p> Edit View Insert Format Tools Table</p>
            <span>12pt  Paragraph | B  I  U  A  </span>
            <i className="fa-solid fa-highlighter"></i>
            <span> T  |  :</span>
            <br/>
            <textarea className="form-control"></textarea>
        </div>


    );

}

export default Question;


