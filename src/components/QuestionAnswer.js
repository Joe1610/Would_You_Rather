import React, { Component } from "react";
import {
  CardActionArea,
  CardContent,
  Typography,
  Card,
  Button,
  Paper,
  LinearProgress,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { handleQuestionAnswer } from "../actions/shared";
class QuestionAnswer extends Component {
  state = {
    notAnswered: true,
    userAnswer: "",
  };

  componentDidMount() {
    this.checkQuestionAnswer();
  }
  checkQuestionAnswer = () => {
    const { users, id, authedUser } = this.props;
    const user = users[authedUser];
    const userAnswers = Object.keys(user.answers);
    const isAnswered = userAnswers.find((e) => e === id) ? true : false;
    this.setState({ notAnswered: !isAnswered });
  };

  handleUserAnswer = (choice) => {
    const { authedUser, id, questions, users } = this.props;
    console.log("option one answers", questions[id].optionOne.votes);
    console.log("option two answers", questions[id].optionTwo.votes);
    this.props
      .dispatch(handleQuestionAnswer(authedUser, id, choice))
      .then(() => this.setState({ notAnswered: false, userAnswer: choice }));
    console.log("user answers", users[authedUser].answers);
    console.log("option one answers", questions[id].optionOne.votes);
    console.log("option two answers", questions[id].optionTwo.votes);
  };
  render() {
    const { questions, id, users, authedUser } = this.props;
    const question = questions[id];
    if (!question) return <Redirect to="/errornotfound" />;
    const { userAnswer } = this.state;
    const totalVotes =
      question["optionOne"].votes.length + question["optionTwo"].votes.length;
    return (
      <div style={{ width: "70%", margin: "auto" }}>
        <Card>
          {this.state.notAnswered ? (
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {question.author} asks:
              </Typography>
              <div>
                <img alt={question.id} src={users[question.author].avatarURL} />
              </div>
              <Typography gutterBottom variant="h5">
                Would you rather...
              </Typography>
              <br />
              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => this.handleUserAnswer("optionOne")}
                >
                  {question.optionOne.text}
                </Button>
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  align="center"
                >
                  OR
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => this.handleUserAnswer("optionTwo")}
                >
                  {question.optionTwo.text}
                </Button>
              </div>
            </CardContent>
          ) : (
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {question.author} asks:
                </Typography>
                <div>
                  <img
                    alt={question.id}
                    src={users[question.author].avatarURL}
                  />
                </div>
                <Typography gutterBottom variant="h5">
                  Would you rather...
                </Typography>
                <br />
                <div>
                  <h6 style={{ color: "green" }}>
                    {" "}
                    Your answer was: {userAnswer}
                  </h6>
                  <Paper
                    style={{
                      width: "40%",
                      margin: "auto",
                      padding: 8,
                      backgroundColor: "whitesmoke",
                      color: "black",
                    }}
                    variant="outlined"
                    elevation={12}
                  >
                    <Typography variant="subtitle1" align="center">
                      {question.optionOne.text}
                    </Typography>
                    <br />
                    <div style={{ position: "relative" }}>
                      <span>
                        {(
                          (question["optionOne"].votes.length * 100) /
                          totalVotes
                        ).toFixed(2)}
                        %
                      </span>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (question["optionOne"].votes.length * 100) /
                          totalVotes
                        }
                      />
                    </div>
                    <br />
                    <Typography variant="subtitle1" align="center">
                      {question["optionOne"].votes.length}
                      {" out of "}
                      {totalVotes}
                      {" votes"}
                    </Typography>
                  </Paper>
                  <Paper
                    style={{
                      width: "40%",
                      margin: "auto",
                      padding: 8,
                      backgroundColor: "whitesmoke",
                      color: "black",
                    }}
                    variant="outlined"
                    elevation={12}
                  >
                    <Typography variant="subtitle1" align="center">
                      {question.optionTwo.text}
                    </Typography>
                    <br />
                    <div style={{ position: "relative" }}>
                      <span>
                        {(
                          (question["optionTwo"].votes.length * 100) /
                          totalVotes
                        ).toFixed(2)}
                        %
                      </span>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (question["optionTwo"].votes.length * 100) /
                          totalVotes
                        }
                      />
                    </div>
                    <br />
                    <Typography variant="subtitle1" align="center">
                      {question["optionTwo"].votes.length}
                      {" out of "}
                      {totalVotes}
                      {" votes"}
                    </Typography>
                  </Paper>
                </div>
              </CardContent>
            </CardActionArea>
          )}
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params;
  return {
    id,
    users,
    questions,
    authedUser,
  };
}
export default connect(mapStateToProps)(QuestionAnswer);
