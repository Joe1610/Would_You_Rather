import "./App.css";
import { handleInitialData } from "./actions/shared";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import QuestionAnswer from "./components/QuestionAnswer";
import Leaderboard from "./components/Leaderboard";
import AddQuestions from "./components/AddQuestions";
import ErrorNotfound from './components/ErrorNotfound'
class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <div className="App">
        {authedUser ? (
          <BrowserRouter>
          <div>
            <NavBar authedUser={authedUser}/>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/questions/:id" exact component={QuestionAnswer} />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route path="/add" exact component={AddQuestions} />
              <Route path="/errornotfound" exact component={ErrorNotfound}/>
              <Route render={() => (<Redirect to="/errornotfound" />)}/>
              </Switch>
          </div>
          </BrowserRouter>
        ) : (
          <LoginPage />
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps, { handleInitialData })(App);
