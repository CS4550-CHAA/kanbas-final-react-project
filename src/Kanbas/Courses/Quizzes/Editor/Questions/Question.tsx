import { Box, HStack, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { BsPencil, BsTrash3Fill } from 'react-icons/bs';
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnBulletList, BtnClearFormatting, BtnNumberedList, BtnLink, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo } from 'react-simple-wysiwyg';
import { Question } from '../../questionClient';
import * as answerClient from '../../answerClient';
import {Answer, deleteAnswer, findAllAnswersForQuestion} from "../../answerClient";

interface QuestionProps {
    question: Question
    setQuestion: (value: Question) => void;
    setNewQuestion: (value: boolean) => void;
}

export default function QuestionEditor({ question, setQuestion, setNewQuestion }: QuestionProps) {
    //update answers
    const [answers, setAnswers] = useState<Answer[]>([{
        _id: '',
        answer: ' ',
        isCorrect: true,
        questionId: question.id
    }]);

    //update/delete single answer
    const [answer, setAnswer] = useState({
        _id: '',
        answer: ' answer',
        isCorrect: false,
        questionId: question.id
    });


    function onChange(e: any) {
        setQuestion({...question, question: e.target.value});
    }
    const handleRadioChange = (index: number) => {
        // to be implemented
    };


    const editAnswer = async (answer: Answer) => {
        // const response = await answerClient.updateAnswer(answer)
        // setAnswer(...answer, response.data); TODO
    };


    const deleteAnswer = async (answerId: string) => {
        await answerClient.deleteAnswer(answerId);
        setAnswers(answers.filter((a: answerClient.Answer) => a._id !== answerId));
    };

    const createAnswer = async (questionId : string) => {
        const newAnswer = {
            answer: answer.answer, isCorrect: answer.isCorrect, questionId: questionId
        };
        const response = await answerClient.createAnswer(newAnswer);
        setAnswers([...answers, response]);
        await fetchAnswers();
    };


    useEffect(() => {
        const fetchAnswersForQuestion = async () => {
            if (question.id) {
            const response = await answerClient.findAllAnswersForQuestion(question.id);
            setAnswers(response);
            }
        };
        fetchAnswersForQuestion();
    }, [question.id])

    const fetchAnswers = async() => {
        const answers = await answerClient.findAllAnswersForQuestion(question.id);
        setAnswers(answers);
    }

    return (
        <>
            <Box className="d-grid" style={{ border: '1px solid grey', margin: '60px', padding: '30px' }}>
                <HStack justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                    <div>
                        <Input variant='outline' value={question ? question.title : ''} placeholder='Question Title' style={{ width: '150px' }} />
                        <select
                            value={question ? question.type : ''}
                            onChange={(e) => setQuestion({ ...question, type: e.target.value })}
                            style={{ color: 'grey', height: '30px', margin: '10px' }}>
                            <option value='Multiple Choice'>Multiple Choice</option>
                            <option value='True/False'>True/False</option>
                            <option value='Fill in the Blanks'>Fill in the Blanks</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text>pts:</Text>
                        <Input value={question ? question.points : 0} style={{ marginLeft: '10px', textAlign: 'center', width: '30px' }} variant='outline' placeholder='0' />
                    </div>
                </HStack>
                <hr />
                <Text>Enter your question text, then indicate the correct answer.</Text>

                <Text fontSize='xl'><b>Question:</b></Text>
                <EditorProvider>
                    <Editor value={question ? question.question : ''} onChange={onChange}>
                        <Toolbar>
                            <BtnUndo />
                            <BtnRedo />
                            <BtnStrikeThrough />
                            <BtnBold />
                            <BtnItalic />
                            <BtnBulletList />
                            <BtnNumberedList />
                            <BtnLink />
                            <BtnStyles />
                            <BtnClearFormatting />
                        </Toolbar>
                    </Editor>
                </EditorProvider>
                <Text fontSize='xl' style={{ marginTop: '10px' }}><b>Answers:</b></Text>
                {answers && answers.map((answer: any) => {
                    let textColor = '';
                    let labelText = '';

                    switch (question.type) {
                        case 'Multiple Choice':
                            labelText = answer.isCorrect ? 'Correct Answer' : 'Possible Answer';
                            textColor = answer.isCorrect ? 'green' : 'red';
                            break;
                        case 'Fill in the Blanks':
                            labelText = 'Possible Answer';
                            textColor = 'green';
                            break;
                        case 'True or False':
                            textColor = answer.isCorrect ? 'green' : 'red';
                            break;
                            return (
                                <HStack key={answer._id}>
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${answer._id}`}
                                        value={answer.answer}
                                        checked={answer.isCorrect}
                                        onChange={() => handleRadioChange(answer._id)}
                                    />
                                    <Text color={textColor}>{answer.answer}</Text>
                                </HStack>
                            );
                        default:
                            return <Text key={answer._id}>Invalid question type</Text>;
                    }

                    return (
                        <HStack key={answer._id}>
                            <Text color={textColor}>{labelText}</Text>
                            <input
                                value={answer.answer}
                                onChange={(e) => setAnswer({...answer, answer: e.target.value})}
                            />
                            <button className="quiz-btn" type="button"
                                    onClick={() => editAnswer(answer)}> //TODO
                                <BsPencil/></button>
                            <button className="quiz-btn" type="button"
                                    onClick={() => deleteAnswer(answer._id)}>
                                <BsTrash3Fill/></button>
                        </HStack>
                    );
                })}
                <Flex justifyContent="flex-end" mb={4}>
                <button className="quiz-btn" type="button" onClick = {() => createAnswer(question.id)}>Add another answer</button>
                </Flex>
                <HStack>
                    <button className="quiz-btn-danger" type="button">Cancel</button>
                    <button className="quiz-btn" type="button" onClick={() => editAnswer}>Update Question</button>
                </HStack>
            </Box>
        </>
    );

}
