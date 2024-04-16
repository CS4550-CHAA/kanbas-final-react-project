import { Box, HStack, Select, Input, Text, VStack, Divider, AbsoluteCenter, Stack, Button, ChakraProvider } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
function Question() {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const editorRef = useRef(null);

    const handleEditorInit = (editor: any) => {
        editorRef.current = editor;
        setEditorLoaded(true);
    };

    const logContent = () => {
        if (editorRef.current) {
            console.log(editorRef.current);
        }
    };
    return (
        <>
            <Box className="d-grid" style={{ border: '1px solid grey', margin: '60px', padding: '30px' }}>
                {/* <VStack> */}
                    {/* <HStack> */}
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
                    {/* </HStack> */}
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
                    {/* <ChakraProvider> */}
                    {/* <Stack direction='row' spacing={1} align='center'>
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
                    </Stack> */}
                    {/* </ChakraProvider> */}
                {/* </VStack> */}
            </Box>
            
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


