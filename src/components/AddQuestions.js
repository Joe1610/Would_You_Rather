import { CardContent, TextField, Card, Typography, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions';
import { withRouter } from 'react-router'
class AddQuestion extends Component {
    state = { 
        firstOption: "",
        secondOption: "",
     }

     handleSubmit = (e) => {
         e.preventDefault();
         const { history, dispatch, authedUser } = this.props;
         const { firstOption, secondOption } = this.state;
         if(!firstOption || !secondOption) {
             return alert("Please enter the two options before submitting")
         }
         dispatch(handleAddQuestion(authedUser, firstOption, secondOption))
         alert("Question added successfully")
         return history.push("/")
     }

     handleFirstOption = (e) => {
         this.setState({firstOption: e.target.value})
     }

     handleSecondOption = (e) => {
         this.setState({secondOption: e.target.value})
     }
    render() { 
        return (

                <Card style={{maxWidth: "50%",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                marginLeft: "25%",}}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Add a new question
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        Would you rather...
                    </Typography>
                    <br/>
                    <div>
                    <TextField name="firstOption" value={this.state.firstOption}
                    label="Type the first option" onChange={(e) => this.handleFirstOption(e)}/>
                    <br/>
                    <br/>
                    <Typography variant="subtitle1" color="textPrimary" align="center">
                        OR
                    </Typography>
                    <TextField name="secondOption" value={this.state.secondOption}
                    label="Type the second option" onChange={(e) => this.handleSecondOption(e)}/>
                    </div>
                    <br/>
                    <Button  variant="contained" size="large" color="primary" onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </Button>
                    </CardContent>
                </Card>
          );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
} 
export default withRouter(connect(mapStateToProps)(AddQuestion));