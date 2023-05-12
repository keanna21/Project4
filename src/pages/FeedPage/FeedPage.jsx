import PageHeader from "../../components/Header/Header"
import AddTravelForm from "../../components/AddTravelForm/AddTravelForm"
import PostDisplay from "../../components/PostDisplay/PostDisplay"
import { useState } from 'react';
import { Grid } from "semantic-ui-react"
import * as postsApi from '../../utils/postApi'

export default function FeedPage(){

    const [posts, setPosts] = useState([]);
    

    async function handleAddPost(post){
    try{
        const responseData = await postsApi.create(post);
        console.log(responseData, 'response from the server')
        setPosts([responseData, ...posts])
    }catch (err) {
        console.log(err, 'error in addPost')
    }

   }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                    <AddTravelForm handleAddPost={handleAddPost}  />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                    <PostDisplay /> 
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    );
}