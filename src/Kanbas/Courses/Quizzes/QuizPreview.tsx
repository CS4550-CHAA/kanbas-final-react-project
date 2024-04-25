import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaPen } from "react-icons/fa";
import { Quiz } from "./client";
import { useParams } from "react-router";
import * as client from "./client";
import * as questionClient from "./questionClient";
import * as answerClient from "./answerClient"
import { Card, CardBody, CardHeader, HStack, Text } from "@chakra-ui/react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Question } from "./questionClient";

function QuizPreview() {
  const { courseId } = useParams();
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>({
    id: "Q" + Math.random().toString(4).slice(2),
    title: "Quiz",
    availability: "",
    description: "",
    published: false,
    dueDate: new Date(0),
    numberOfQuestions: 0,
    course: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: 20,
    multipleAttempts: "No",
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    webCamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    availableDate: new Date(0),
    untilDate: new Date(0),
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<any>({});

  useEffect(() => {
    const fetchAnswers = async () => {
      const newQuestionAnswers: any = {};
      for (const question of questions) {
        try {
          const res = await findAnswersForQuiz(question.id);
          newQuestionAnswers[question.id] = res;
        } catch (error) {
          console.error(`Error fetching answers for question ${question.id}:`, error);
          newQuestionAnswers[question.id] = [];
        }
      }
      setQuestionAnswers(newQuestionAnswers);
    };

    fetchAnswers();
  }, [questions]);

  const fetchQuiz = async () => {
    if (quizId) {
      const curQuiz: Quiz = await client.findQuizById(quizId);
      setQuiz(curQuiz);
    }
  };

  useEffect(() => {
    const findAllQuestionsForQuiz = async () => {
      if (quizId) {
        const res = await questionClient.findAllQuestionsForQuiz(quizId);
        setQuestions(res);
      }
    };
    findAllQuestionsForQuiz();
  }, [quizId]);

  useEffect(() => {
    async function fetchTheQuiz() {
      await fetchQuiz();
    }
    fetchTheQuiz();
  }, []);

  const findAnswersForQuiz = async (id: any) => {
      const res = await answerClient.findAllAnswersForQuestion(id);
      return res;
  };

  const questionNumbers = [1, 2, 3];
  //TODO:fix this
  // Array.from(
  //   { length: quiz.numberOfQuestions },
  //   (_, index) => index + 1
  // );
  return (
    <div>
      <h1>{quiz.title}</h1>
      <label>This is a preview of the published version of the quiz</label>
      <br />
      <label>Started: Nov 29 at 8:19 am</label>
      <h1>Quiz Instructions</h1>
      <hr />
      {/* <button style={{ width: "100%" }}>
        <Link
          to={/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor/Details}
          style={{ color: "white", textDecoration: "none" }}
        >
          <FaPen />
          Keep Editing This Quiz
        </Link>
      </button> */}
      <h2>Questions:</h2>
      <ul>
      {questions.map((question: Question) => (
  <div key={question.id} className="card">
    <Card>
      <CardHeader backgroundColor="lightGrey">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          style={{
            width: "100%",
            padding: "10px",
            paddingBottom: "0px",
          }}
        >
          <HStack>
            <Text>{question?.title}</Text>
          </HStack>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Text>{question.points} pts</Text>
          </div>
        </HStack>
      </CardHeader>

      <CardBody
        style={{
          padding: "10px",
          paddingBottom: "0px",
          backgroundColor: "white",
        }}
      >
        {question.type === 'Multiple Choice' && (
          <div>
            <p>{question.question}</p>
            <ul>
            {questionAnswers[question.id] && (
  <ul>
    {questionAnswers[question.id].map((choice: any, index: any) => (
      <li key={index} style={{ color: choice.isCorrect ? 'green' : 'red' }}>
        {choice.answer}
      </li>
    ))}
  </ul>
)}

            </ul>
          </div>
        )}
        {question.type === 'Fill in the Blanks' && (
          <div>
            <p>{question.question}</p>
            {questionAnswers[question.id] && (
  <ul>
    {questionAnswers[question.id].map((choice: any, index: any) => (
     <li key={index} >
        Blank {index + 1}: {choice.answer}
      </li>
    ))}
  </ul>
)}
          </div>
        )}
        {question.type === 'True/False' && (
          <div>
            <p>{question.question}</p>
            <div>
            {questionAnswers[question.id] && (
  <ul>
    {questionAnswers[question.id].map((choice: any, index: any) => (
      <li key={index} style={{ color: choice.isCorrect ? 'green' : 'red' }}>
        {choice.answer}
      </li>
    ))}
  </ul>
)}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  </div>
))}

      </ul>
    </div>
  );
}

export default QuizPreview;