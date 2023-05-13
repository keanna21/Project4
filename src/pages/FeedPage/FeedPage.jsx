import PageHeader from "../../components/Header/Header"
import AddTravelForm from "../../components/AddTravelForm/AddTravelForm"
import PostDisplay from "../../components/PostDisplay/PostDisplay"
import Loader from "../../components/Loader/Loader"
import { useState, useEffect } from 'react';
import { Grid } from "semantic-ui-react"
import * as postsApi from '../../utils/postApi'

export default function FeedPage({loggedUser}){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    

    async function handleAddPost(post){
    try{
        setLoading(true);
        const responseData = await postsApi.create(post);
        console.log(responseData, 'response from the server')
        setPosts([responseData.data, ...posts])
        setLoading(false)
    }catch (err) {
        setLoading(false)
        console.log(err, 'error in addPost')
        setError("Error creating a post, please try again")
    }

   }

   async function getPosts() {
    try {
      const response = await postsApi.getAll();
      console.log(response, " data");
      setPosts(response.posts);
      setLoading(false)
    } catch (err) {
    
      console.log(err.message, " this is the error in getPosts");
      setLoading(false)
    }
  }

  useEffect(() => {
    

    getPosts();
  }, []); 

  if (error) {
    return (
      <>
        <PageHeader loggedUser={loggedUser} />
      </>
    );
  }

  

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader loggedUser={loggedUser}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                    <AddTravelForm handleAddPost={handleAddPost}  />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                <PostDisplay
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
          />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    );
}