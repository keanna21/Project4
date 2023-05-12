import { useState } from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'

export default function AddTravelForm(){

    const [caption, setCaption] = useState('')

    const [selectedFile, setSelectedFile] = useState('')

    function handleChange(e){
        setCaption(e.target.value)
    }

    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
    }
    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('caption', caption)
        formData.append('photo', selectedFile)
    }

    return(
       <Segment>

        <Form onSubmit={handleSubmit}>
        
            <Form.Input 
            placeholder="travler location"
            required
            name='caption'
            onChange={handleChange}
            />
            <Form.Input 
            type='file'
            placeholder='upload image'
            onChange={handleFileInput}
            />
            <Button type='submit'>Add photo</Button>

        </Form>
       </Segment>
    )
}