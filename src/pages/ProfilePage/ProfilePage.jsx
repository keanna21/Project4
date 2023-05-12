import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import { Grid } from 'semantic-ui-react'

import ProfileBio from "../../components/ProfileBio/ProfileBio"
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay"
import  PageHeader from '../../components/Header/Header'
import userService from "../../utils/userService"

export default function ProfilePage(){

    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')



    const { username } = useParams()

    useEffect(()=> {
        async function getProfile(){
            try {
              const data = await userService.getProfile(username)

              setLoading(false)
              setPosts(data.posts)
              setProfileUser(data.user)
            } catch(err){
                console.log('error from get profile ->', err)
                setError('Profile does not exist')
            }
        }
        getProfile()
    }, [])

    if(error){
        return(
            <>
            <PageHeader />
            <h1>{error}</h1>
            
            </>
        )
    }

    if(loading){
        return (
            <>
             <PageHeader />
             <h1>Loading...</h1>

            </>
        )
    }
    
    return (
        <Grid>
        <Grid.Row>
            <Grid.Column>
            <PageHeader />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <ProfileBio user={profileUser} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column style={{ maxWidth: 750 }}>
                <ProfilePostDisplay />
            </Grid.Column>
        </Grid.Row>
    </Grid>     
    )
        
    
}