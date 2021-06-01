import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetAuthedUser } from '../actions/authedUser';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "18px",
  },
  menuButton: {
    marginRight: theme.spacing(-15),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const { authedUser, users, dispatch } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
          >
            <Avatar alt={authedUser.id} src={users[authedUser].avatarURL} />
          </IconButton>
          <Typography variant="subtitle2" className={classes.title}>
            {"Hi " + authedUser}
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <Link to="/" className="nav-link" >
            Home
          </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <Link to="/add" className="nav-link">
            Add Question
          </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
          </Typography>
          <Button color="inherit" size="large" onClick={() => dispatch(resetAuthedUser())}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps({ users }) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(NavBar);
