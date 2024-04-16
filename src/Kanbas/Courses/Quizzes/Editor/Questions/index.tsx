import React, { useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import './index.css';
import Question from "./Question";
import MCAnswer from "./MCAnswer";
import TFAnswer from "./TFAnswer";
import FillInTheBlankAnswer from "./FillInTheBlankAnswer";
import Nav from "../Nav";
import {IoSearch} from "react-icons/io5";
import {Box, Card, CardBody, CardHeader, Heading, HStack, Input, Text, Stack, StackDivider} from "@chakra-ui/react";
// import { quizzes } from "../../../../Database";


function Questions() {
  const { pathname } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [newQuestion, setNewQuestion] = useState(false);

  // TODO // Need to import quizzes from Database
  //   const { courseId } = useParams();
  //   const quizList = quizzes.filter(
  //       (quiz) => quiz.course === courseId);
    const questionList = [
        {
            _id: 1,
            title: "Question 1 ",
            answer: "answer 1",
            points: 5,
        },
        {
            _id: 2,
            title: "Question 2",
            answer: "answer 2",
            points: 5,
        },
        {
            _id: 3,
            title: "Question 3",
            answer: "answer 3",
            points: 5,
        },
    ]

    return (
    <div>
        <br/>
        {questionList
            .map((question: any) => (
                <div key={question._id} className="card">
                    <Card>
                        <CardHeader backgroundColor='lightGrey'>
                            <HStack justifyContent='space-between' alignItems='center' style={{ width: '100%', padding : "10px", paddingBottom : "0px" }}>
                                <Text> Question</Text>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text>{question.points} pts</Text>
                                </div>
                            </HStack>
                        </CardHeader>

                        <CardBody style={{padding : "10px",paddingBottom : "0px", backgroundColor : "white"}}>
                            <Text>{question.title}</Text>
                        </CardBody>
                    </Card>
                </div>
            ), [])}
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="quiz-btn" type="button" onClick={() => setNewQuestion(true)}>+ New Question</button>
            <button className="quiz-btn" type="button">+ New Question Group</button>
            <button className="quiz-btn" type="button"><IoSearch /> Find Questions</button>
        </div>
        <hr />
        <div className="d-grid gap-2 d-md-flex justify-content-between">
            <label>
                <input type="checkbox" />
                Notify users that this quiz has changed
            </label>
            <div className="d-grid d-md-flex float-end">
                <button className="quiz-btn" type="button">Cancel</button>
                <button className="quiz-btn" type="button">Save & Publish</button>
                <button className="quiz-btn-danger" type="button">Save</button>
            </div >
        </div>
        {newQuestion && <Question />}
        {/*<MCAnswer />*/}
        {/*<TFAnswer />*/}
        {/*<FillInTheBlankAnswer />*/}

        <hr />
    </div>
  );
}
export default Questions;
