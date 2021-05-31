import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderboardItem from "./LeaderboardItem";
import Grid from '@material-ui/core/Grid'

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const usersRank = Object.values(users).sort(
      (a, b) =>
        Object.keys(b.answers).length +
        Object.keys(b.questions).length -
        (Object.keys(a.answers).length + Object.keys(a.questions).length)
    );
    return (
      <div>
        {usersRank.map((user) => (
          <Grid key={user.id}>
            <LeaderboardItem key={user.id} user={user} />
            <br />
          </Grid>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default connect(mapStateToProps)(Leaderboard);
