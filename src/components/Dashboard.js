import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Grid } from "@material-ui/core";

class Dashboard extends Component {
  state = {
    unAnsweredQuestionsTab: true,
  };

  handleChangeOpenedTab = (value) => {
    const unAnsweredQuestionsTab = value;
    this.setState({ unAnsweredQuestionsTab });
  };
  render() {
    const { unAnsweredQuestionsTab } = this.state;
    const { authedUser, questions, users } = this.props;
    const showedQuestions = () => {
      let answeredQuestions = [],
        unAnsweredQuestions = [],
        userAnswers = Object.keys(users[authedUser].answers);
      if (!authedUser || !users[authedUser] || !users[authedUser].answers) {
        return {
          answeredQuestions,
          unAnsweredQuestions,
        };
      }
      answeredQuestions = Object.values(questions)
        .filter((question) => userAnswers.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

      unAnsweredQuestions = Object.values(questions)
        .filter((question) => !userAnswers.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);

      return unAnsweredQuestionsTab ? unAnsweredQuestions : answeredQuestions;
    };
    const questionsToDisplay = showedQuestions();
    return (
      <div>
        <Grid>
          <div>
            <button className="btn btn-secondary"
              color="primary"
              onClick={() => this.handleChangeOpenedTab(true)}
              autoFocus={this.state.unAnsweredQuestionsTab ? true : false}
            >
              Unanswered questions
            </button>
            <button className="btn btn-secondary"
             color="primary"
              onClick={() => this.handleChangeOpenedTab(false)}
              autoFocus={!this.state.unAnsweredQuestionsTab ? true : false}
            >
              Answered questions
            </button>
          </div>
          <br />
          {Object.keys(questionsToDisplay).map((question) => (
            <Grid key={questionsToDisplay[question].id}>
              <Question id={questionsToDisplay[question].id} />
              <br />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}
export default connect(mapStateToProps)(Dashboard);
