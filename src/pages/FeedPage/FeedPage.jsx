import PageHeader from "../../components/Header/Header"
import AddTravelForm from "../../components/AddTravelForm/AddTravelForm"
import PostDisplay from "../../components/PostDisplay/PostDisplay"

import { Grid } from "Semantic-ui-react"

export default function FeedPage(){
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                    <AddTravelForm />
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