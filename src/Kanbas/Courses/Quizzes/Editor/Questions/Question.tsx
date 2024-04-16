import { Box, HStack, Flex, Select, Input, Text, VStack, Divider, AbsoluteCenter, Stack, Button, ChakraProvider } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
function Question() {
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
                <Editor
                    apiKey='91iov1c2w4sqvg05ldeofgsfdb3eo5rouvuv90u2ekhr5l8f'
                    init={{
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                    }}
                    initialValue="Welcome to TinyMCE!"
                />
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


