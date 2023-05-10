import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import { useState } from 'react'
import userService from '../../utils/userService';


export default function Signup (){

    const [state, setState] = useState({
     userame:'',
     email:'',
     password:'',
     passwordConf:'',
     bio:'',

    });

    const [selectedFile, setSelectedFile] = useState('');

    const [error, setError] = useState('');

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput(e){
        console.log(e.target.files)
        setSelectedFile(e.target.files[0]);
    }

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', selectedFile)

        for (let fieldName in state){
            console.log(fieldName, state[fieldName])
            formData.append(fieldName, state[fieldName])
        }


    }

    
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as="h2" color="black" textAlign="center">
          <Image src="https://i.imgur.com/vlWHu2w.jpg" /> Sign Up
        </Header>
      <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              value={state.bio}
              placeholder="Tell us more about your dogs..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
    </Grid.Column>
  </Grid>

    )  
}
