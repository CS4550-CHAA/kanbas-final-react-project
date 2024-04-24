import { Box, HStack, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { BsPencil, BsTrash3Fill } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnBulletList, BtnClearFormatting, BtnNumberedList, BtnLink, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo } from 'react-simple-wysiwyg';
import { Question } from '../../questionClient';
import * as answerClient from '../../answerClient';

interface QuestionProps {
    question: Question
    setQuestion: (value: Question) => void;
    setNewQuestion: (value: boolean) => void;
    editQuestion: (value: any) => void;
    setEditMode: (value: boolean) => void;
    createQuestion: (value: any) => void;
    editMode: boolean;
    answers: any[];
    setAnswers: (value: any) => void;
}

export default function QuestionEditor({ question, setQuestion, setNewQuestion, editQuestion, createQuestion, editMode, setEditMode, answers, setAnswers }: QuestionProps) {

    const [answer, setAnswer] = useState({
        _id: '',
        answer: 'answer',
        isCorrect: false,
        questionId: question.id
    });
    const [answerEdit, setAnswerEdit] = useState(false);

    const handleRadioChange = (index: number) => {
        // to be implemented
    };

    const selectAnswer = async (answerId: string) => {
        const response = await answerClient.findAnswerById(answerId);
        setAnswer(response);
        setAnswerEdit(true);
    };

    const editAnswer = async (answer: any) => {
        const response = await answerClient.updateAnswer(answer)
        setAnswer(response)
        setAnswers(answers.map((a) =>
            (a.id === a._id ? answer : a)));
        setAnswerEdit(false);
    };

    const deleteAnswer = async (answerId: string) => {
        await answerClient.deleteAnswer(answerId);
        setAnswers(answers.filter((a: answerClient.Answer) => a._id !== answerId));
    };

    const createAnswer = async () => {
        const newAnswer = {
            answer: answer.answer,
            isCorrect: answer.isCorrect,
            questionId: question.id
        };
        const response = await answerClient.createAnswer(newAnswer);
        setAnswers([...answers, response]);
        await fetchAnswers();
    };


    useEffect(() => {
        const fetchAnswersForQuestion = async () => {
            if (question && question.id) {
            const response = await answerClient.findAllAnswersForQuestion(question.id);
            setAnswers(response);
            }
        };
        fetchAnswersForQuestion();
    }, [question, answers])

    const fetchAnswers = async() => {
        const answers = await answerClient.findAllAnswersForQuestion(question.id);
        setAnswers(answers);
    }

    return (
        <>
            <Box className="d-grid" style={{ border: '1px solid grey', margin: '60px', padding: '30px' }}>
                <HStack justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                    <div>
                        <Input variant='outline' onChange={(e) => setQuestion({ ...question, title: e.target.value })} value={question ? question.title : ''} placeholder='Question Title' style={{ width: '150px' }} />
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
                        <Input onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) })} value={question ? question.points : 0} style={{ marginLeft: '10px', textAlign: 'center', width: '30px' }} variant='outline' placeholder='0' />
                    </div>
                </HStack>
                <hr />
                <Text>Enter your question text, then indicate the correct answer.</Text>

                <Text fontSize='xl'><b>Question:</b></Text>
                <EditorProvider>
                    <Editor value={question ? question.question : ''} onChange={(e) => setQuestion({...question, question: e.target.value})}>
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
                {answers && answers.map((currAnswer: any) => {
                    let textColor = '';
                    let labelText = '';
                    if (question) {
                        switch (question.type) {
                            case 'Multiple Choice':
                                labelText = currAnswer.correct ? 'Correct Answer' : 'Possible Answer';
                                textColor = currAnswer.correct ? 'green' : 'red';
                                break;
                            case 'Fill in the Blanks':
                                labelText = 'Possible Answer';
                                textColor = 'green';
                                break;
                            case 'True/False':
                                textColor = currAnswer.correct ? 'green' : 'red';
                                return (
                                    <HStack key={currAnswer._id}>
                                        <input
                                            type="radio"
                                            name={`correctAnswer-${currAnswer._id}`}
                                            value={currAnswer.answer}
                                            checked={currAnswer.correct}
                                            onChange={() => handleRadioChange(currAnswer._id)}
                                        />
                                        <Text color={textColor}>{currAnswer.answer}</Text>
                                    </HStack>
                                );
                            default:
                                return <Text key={answer._id}>Invalid question type</Text>;
                        }
                    }

                    return (
                        <HStack key={currAnswer._id}>
                            <Text color={textColor}>{labelText}</Text>
                            {(answerEdit && (answer._id === currAnswer._id)) ? <input value={answer?.answer} onChange={(e) => setAnswer({...answer, answer: e.target.value})} /> : <Text>{currAnswer.answer}</Text>}
                            {(answerEdit && (answer._id === currAnswer._id)) ? <button className="quiz-btn" type="button" onClick={() => editAnswer(answer)}><IoIosCheckmarkCircleOutline /></button> : <button className="quiz-btn" type="button" onClick={() => selectAnswer(currAnswer._id)}><BsPencil /></button>}
                            <button className="quiz-btn" type="button"
                                    onClick={() => deleteAnswer(currAnswer._id)}>
                                <BsTrash3Fill/></button>
                        </HStack>
                    );
                })}
                <Flex justifyContent="flex-end" mb={4}>
                <button className="quiz-btn" type="button" onClick = {() => createAnswer()}>Add another answer</button>
                </Flex>
                <HStack>
                    <button className="quiz-btn-danger" type="button" onClick={() => {setNewQuestion(false); setEditMode(false);}}>Cancel</button>
                    <button className="quiz-btn" type="button" onClick={() => editMode ? editQuestion(question) : createQuestion(question)}>Update Question</button>
                </HStack>
            </Box>
        </>
    );

}
