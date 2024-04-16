import { Box, HStack, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnBulletList, BtnClearFormatting, BtnNumberedList, BtnLink, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo } from 'react-simple-wysiwyg';

function Question() {
    const [html, setHtml] = useState('my <b>HTML</b>');

    function onChange(e: any) {
        setHtml(e.target.value);
    }
    const questionExample = {
        name: 'Question Title',
        question: 'This is the question',
        type: 'Fill in The Blanks',
        answers: [
            {
                answer: 'choice 1',
                correct: true
            },
            {
                answer: 'choice 2',
                correct: false
            },
            {
                answer: 'choice 3',
                correct: false
            },
        ]
    }
    const [question, setQuestion] = useState(questionExample)
    const handleRadioChange = (index: number) => {
        // to be implemented
    };

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
                {question.answers.map((answer: any, index: number) => {
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
                                <HStack key={index}>
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${index}`}
                                        value={answer.answer}
                                        checked={answer.correct}
                                        onChange={() => handleRadioChange(index)}
                                    />
                                    <Text color={textColor}>{answer.answer}</Text>
                                </HStack>
                            );
                        default:
                            return <Text key={index}>Invalid question type</Text>;
                    }

                    return (
                        <HStack key={index}>
                            <Text color={textColor}>{labelText}</Text>
                            <input value={answer.answer} />
                            <button className="quiz-btn" type="button"><EditIcon /></button>
                            <button className="quiz-btn" type="button"><DeleteIcon /></button>
                        </HStack>
                    );
                })}
                <Flex justifyContent="flex-end" mb={4}>
                    <button className="quiz-btn" type="button">Add another answer</button>
                </Flex>
                <HStack>
                    <button className="quiz-btn-danger" type="button">Cancel</button>
                    <button className="quiz-btn" type="button">Update Question</button>
                </HStack>
            </Box>
        </>
    );

}

export default Question;


