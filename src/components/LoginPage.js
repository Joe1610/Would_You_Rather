import {
  Avatar,
  CardActions,
  CardContent,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import React, { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: "50%",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    marginTop: "100px",
    marginLeft: "25%",
  },
});

function LoginPage(props) {
  const [user, setUser] = useState("");
  const classes = useStyles();
  const { users } = props;

  const handleChange = (e) => {
    e.preventDefault();
    const currentUser = e.target.value;
    setUser(currentUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user) alert("Please choose a user first!");
    props.dispatch(setAuthedUser(user));
    return <Redirect to="/" />;
  };

  return (
    <div className="login">
      <Card className={classes.root}>
        <CardContent style={{ justifyContent: "center" }}>
          <Typography variant="h5" component="h2" align="center">
            Would You Rather ?
          </Typography>
          <Typography variant="caption" align="center">
            Please login first to start the game
          </Typography>
          <div>
            <br />
            <span> Current Users </span>
          </div>
          <div style={{ paddingLeft: "42%" }}>
            <AvatarGroup max={3}>
              {Object.keys(users).map((user) => (
                <Avatar key={users[user].id} src={users[user].avatarURL} />
              ))}
            </AvatarGroup>
          </div>
          <CardActions style={{ justifyContent: "center" }}>
            <div>
              <select
                className="form-select"
                aria-label="Select"
                onChange={handleChange}
                defaultValue="Select"
              >
                <option value="Select"> Select a user</option>
                {Object.keys(users).map((user) => (
                  <option key={users[user].id} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={handleLogin} color="primary">
              Login
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(LoginPage);
