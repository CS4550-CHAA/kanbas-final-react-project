import { Box, HStack, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { BsPencil, BsTrash3Fill } from 'react-icons/bs';
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnBulletList, BtnClearFormatting, BtnNumberedList, BtnLink, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo } from 'react-simple-wysiwyg';
import { Question } from '../../questionClient';
import * as answerClient from '../../answerClient';

interface QuestionProps {
    question: Question
    setQuestion: (value: Question) => void;
    setNewQuestion: (value: boolean) => void;
  }

export default function QuestionEditor({ question, setQuestion, setNewQuestion }: QuestionProps)  {
    const [html, setHtml] = useState('my <b>HTML</b>');
    const [answers, setAnswers] = useState([]);

    function onChange(e: any) {
        setHtml(e.target.value);
    }
    const handleRadioChange = (index: number) => {
        // to be implemented
    };

    const selectQuestion = async (questionId: string,) => {
        const response = await questionClient.findQuestionById(questionId);
        setQuestion(response.data);
    };

    const editAnswer = async () => {
        const response = await answerClient.updateAnswer(answer)
        setAnswers(...answers, response.data);
    };

    const deleteQuestion = async (questionId: string) => {
        await questionClient.deleteQuestion(questionId);
        setQuestions(questions.filter((q) => q._id !== questionId));
    };

    const createAnswer = async () => {
        const response = await answerClient.createAnswer(answer);
        setAnswers(answers.filter((a: answerClient.Answer) => a._id !== response.data._id));
    };

    useEffect(() => {
        const fetchAnswersForQuestion = async () => {
            if (question.id) {
                const response = await answerClient.findAllAnswersForQuestion(question.id);
                setAnswers(response.data);
            }
        };
        fetchAnswersForQuestion();
    }, [question.id])

    return (
        <>
            <Box className="d-grid" style={{ border: '1px solid grey', margin: '60px', padding: '30px' }}>
                <HStack justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
                    <div>
                        <Input variant='outline' placeholder='Question Title' style={{ width: '150px' }} />
                        <select style={{ color: 'grey', height: '30px', margin: '10px' }}>
                            <option value='option1'>Multiple Choice</option>
                            <option value='option2'>True/False</option>
                            <option value='option3'>Fill In The Blanks</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text>pts:</Text>
                        <Input style={{ marginLeft: '10px', textAlign: 'center', width: '30px' }} variant='outline' placeholder='0' />
                    </div>
                </HStack>
                <hr />
                <Text>Enter your question text, then indicate the correct answer.</Text>

                <Text fontSize='xl'><b>Question:</b></Text>
                <EditorProvider>
                    <Editor value={html} onChange={onChange}>
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
                            labelText = answer.correct ? 'Correct Answer' : 'Possible Answer';
                            textColor = answer.correct ? 'green' : 'red';
                            break;
                        case 'Fill in The Blanks':
                            labelText = 'Possible Answer';
                            textColor = 'green';
                            break;
                        case 'True or False':
                            textColor = answer.correct ? 'green' : 'red';
                            return (
                                <HStack key={answer._id}>
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${answer._id}`}
                                        value={answer.answer}
                                        checked={answer.correct}
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
                            <input value={answer.answer} />
                            <button className="quiz-btn" type="button"><BsPencil /></button>
                            <button className="quiz-btn" type="button"><BsTrash3Fill /></button>
                        </HStack>
                    );
                })}
                <Flex justifyContent="flex-end" mb={4}>
                    <button className="quiz-btn" type="button" onClick={createAnswer}>Add another answer</button>
                </Flex>
                <HStack>
                    <button className="quiz-btn-danger" type="button">Cancel</button>
                    <button className="quiz-btn" type="button" onClick={editAnswer}>Update Question</button>
                </HStack>
            </Box>
        </>
    );

}
