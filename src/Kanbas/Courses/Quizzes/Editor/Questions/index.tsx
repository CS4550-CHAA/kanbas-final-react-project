import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import './index.css';
import Question from "./Question";
import {IoSearch} from "react-icons/io5";
import {Card, CardBody, CardHeader, HStack, Text} from "@chakra-ui/react";
import { BsTrash3Fill, BsPencil } from "react-icons/bs";

function Questions() {
  const { pathname } = useLocation();
  // const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [newQuestion, setNewQuestion] = useState(false);

    // const [question, setQuestion] = useState({ TODO
    // });
    // const [questions, setQuestions] = useState<any[]>(db.quizzes);
    // const addNewCourse = () => {
    //     setQuestions([...questions, {...question, _id: new Date().getTime().toString()}]);
    // };

    // TODO // Need to import quizzes from Database
    //   const { courseId } = useParams();
    //   const quizList = quizzes.filter(
    //       (quiz) => quiz.course === courseId);

    const questionList = [
        {
            course_id: 1,
            quiz_id: 1,
            _id: 1,
            title: "Question title 1 ",
            quiz_type: "Multiple Choice",
            question: "How much is 2+2?",
            answers: [
                {answer: '1', correct: false},
                {answer: '2', correct: false},
                {answer: '3', correct: false},
                {answer: '4', correct: true},
            ],
            points: 5,
        },
        {
            course_id: 1,
            quiz_id: 1,
            _id: 2,
            title: "Question title 2 ",
            quiz_type: "True/False",
            question: "Is 2 an integer?",
            answers: [
                {answer: 'True', correct: true},
                {answer: 'False', correct: false},
            ],
            points: 5,
        },
        {
            course_id: 1,
            quiz_id: 1,
            _id: 3,
            title: "Question title 3 ",
            quiz_type: "Fill In The Blanks",
            question: "The Sum of 2 + 2 is  ______.",
            answers: [
                {answer: '4', correct: true},
                {answer: '2', correct: true},
                {answer: '5', correct: true},
            ],
            points: 5,
        }
    ]

    return (
        <div>
            <br/>
            {questionList
                .map((question: any) => (
                    <div key={question._id} className="card">
                        <Card>
                            <CardHeader backgroundColor='lightGrey'>
                                <HStack justifyContent='space-between' alignItems='center'
                                        style={{width: '100%', padding: "10px", paddingBottom: "0px"}}>
                                    <HStack>
                                        <Text> Question</Text>
                                        <button className="quiz-btn" type="button">
                                            <BsPencil />
                                        </button>
                                        <button className="quiz-btn" type="button">
                                            <BsTrash3Fill />
                                        </button>
                                    </HStack>
                                    
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Text>{question.points} pts</Text>
                                    </div>
                                </HStack>
                            </CardHeader>

                            <CardBody style={{padding: "10px", paddingBottom: "0px", backgroundColor: "white"}}>
                                <Text>{question.question}</Text>
                            </CardBody>
                        </Card>
                    </div>
                ), [])}
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button className="quiz-btn" type="button" onClick={() => setNewQuestion(true)}>+ New Question</button>
                <button className="quiz-btn" type="button">+ New Question Group</button>
                <button className="quiz-btn" type="button"><IoSearch/> Find Questions</button>
            </div>
            <hr/>

            {newQuestion && <Question/>}

            <div className="d-grid gap-2 d-md-flex justify-content-between">
                <label>
                    <input type="checkbox"/>
                    Notify users that this quiz has changed
                </label>
                <div className="d-grid d-md-flex float-end">
                    <button className="quiz-btn" type="button">Cancel</button>
                    <button className="quiz-btn" type="button">Save & Publish</button>
                    {/*onClick : saves the edits*/}
                    <button className="quiz-btn-danger" type="button">Save</button>
                </div>
            </div>


            <hr/>
        </div>
    );
}
export default Questions;
