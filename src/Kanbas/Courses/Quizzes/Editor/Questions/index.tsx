import { useEffect, useState } from "react";
import './index.css';
import QuestionEditor from "./Question";
import { IoSearch } from "react-icons/io5";
import { Card, CardBody, CardHeader, HStack, Text } from "@chakra-ui/react";
import { BsTrash3Fill, BsPencil } from "react-icons/bs";
import { useParams } from "react-router";
import { Question } from "../../questionClient";
import * as questionClient from '../../questionClient';

function Questions() {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [question, setQuestion] = useState<Question>({
        id: '',
        title: '',
        question: '',
        type: '',
        points: 0,
        quizId: '',
    })
    const [newQuestion, setNewQuestion] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const selectQuestion = async (questionId: string) => {
        console.log(questionId)
        const res = await questionClient.findQuestionById(questionId);
        console.log(res)
        setQuestion(res);
        console.log(question)
        setEditMode(true);
    };

    const editQuestion = async (question: any) => {
        const response = await questionClient.updateQuestion(question)
        setQuestion(response.data);
        setQuestions(questions.map((q) =>
            (q._id === question._id ? question : q)));
    };

    const deleteQuestion = async (questionId: string) => {
        await questionClient.deleteQuestion(questionId);
        setQuestions(questions.filter((q) => q.id !== questionId));
    };

    useEffect(() => {
        const findAllQuestionsForQuiz = async () => {
            if (quizId) {
                const res = await questionClient.findAllQuestionsForQuiz(quizId);
                setQuestions(res);
            }
        };
        findAllQuestionsForQuiz();
    }, [quizId])

    return (
        <div>
            <br />
            {questions && questions
                .map((question: any) => (
                    <div key={question.id} className="card">
                        <Card>
                            <CardHeader backgroundColor='lightGrey'>
                                <HStack justifyContent='space-between' alignItems='center'
                                    style={{ width: '100%', padding: "10px", paddingBottom: "0px" }}>
                                    <HStack>
                                        <Text> Question</Text>
                                        <button className="quiz-btn" type="button" onClick={() => selectQuestion(question.id)}>
                                            <BsPencil />
                                        </button>
                                        <button className="quiz-btn" type="button" onClick={() => deleteQuestion(question.id)}>
                                            <BsTrash3Fill />
                                        </button>
                                    </HStack>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text>{question.points} pts</Text>
                                    </div>
                                </HStack>
                            </CardHeader>

                            <CardBody style={{ padding: "10px", paddingBottom: "0px", backgroundColor: "white" }}>
                                <Text>{question.question}</Text>
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

            {(editMode || newQuestion) && <QuestionEditor question={question} setQuestion={setQuestion} setNewQuestion={setNewQuestion} />}

            <div className="d-grid gap-2 d-md-flex justify-content-between">
                <label>
                    <input type="checkbox" />
                    Notify users that this quiz has changed
                </label>
                <div className="d-grid d-md-flex float-end">
                    <button className="quiz-btn" type="button">Cancel</button>
                    <button className="quiz-btn" type="button">Save & Publish</button>
                    {/*onClick : saves the edits*/}
                    <button className="quiz-btn-danger" type="button">Save</button>
                </div>
            </div>


            <hr />
        </div>
    );
}
export default Questions;
