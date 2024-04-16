import { Box, HStack, Select, Input, Text, VStack, Divider, AbsoluteCenter, Stack, Button, ChakraProvider } from '@chakra-ui/react'
function Question() {

    return (
        <>
            <Box className="d-grid gap-2 d-md-flex justify-content-md-center" style={{ border: '1px solid grey', margin: '60px', padding: '30px' }}>
                <VStack>
                    <HStack>
                        <Input variant='outline' placeholder='Question Title' />
                        <Select style={{ color: 'grey', height: '30px' }}>
                            <option value='option1'>Multiple Choice</option>
                            <option value='option2'>True/False</option>
                            <option value='option3'>Fill In The Blanks</option>
                        </Select>
                        <Text>pts:</Text>
                        <Input style={{ textAlign: 'center', width: '30px' }} variant='outline' placeholder='0' />


                    </HStack>
                    <Text>Enter your question text, then indicate the correct answer.</Text>
                    <Text fontSize='xl'><b>Question:</b></Text>
                    <ChakraProvider>
                    <Stack direction='row' spacing={1} align='center'>
                        <Button variant='ghost' style={{width: '20px'}}>
                            Edit
                        </Button>
                        <Button variant='ghost' style={{width: '20px'}}>
                            View
                        </Button>
                        <Button variant='ghost' style={{width: '50px'}}>
                            Insert
                        </Button>
                        <Button variant='ghost' style={{width: '50px'}}>
                            Format
                        </Button>
                        <Button variant='ghost' style={{width: '20px'}}>
                            Tools
                        </Button>
                        <Button variant='ghost' style={{width: '20px'}}>
                            Table
                        </Button>
                    </Stack>
                    </ChakraProvider>
                </VStack>
            </Box>
            <Box position='relative' padding='10'>
                <Divider />
                <AbsoluteCenter bg='white' px='4'>
                    Content
                </AbsoluteCenter>
            </Box>
            <Text>Hello</Text>
        </>
        // <div>
        //     <div className="d-grid gap-2 d-md-flex justify-content-md-center">

        //         <hr/>
        //     </div>

        //     <p>Enter your question text, then indicate the correct answer.</p>
        //     <h4>Question:</h4>
        //     <p> Edit View Insert Format Tools Table</p>
        //     <span>12pt  Paragraph | B  I  U  A  </span>
        //     <i className="fa-solid fa-highlighter"></i>
        //     <span> T  |  :</span>
        //     <br/>
        //     <textarea className="form-control"></textarea>
        // </div>


    );

}

export default Question;


