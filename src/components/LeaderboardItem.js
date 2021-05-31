import { CardActionArea, CardContent, Card, Typography, makeStyles, Avatar} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles({
    root: {
        maxWidth: "50%",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
        marginLeft: "25%",
        
    },
})

const LeaderboardItem = props => {
    const classes = useStyles();
    const{ user } = props;
return (
    <Card className={classes.root}>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>
            <div style={{paddingLeft: "47.4%"}}>
                    <Avatar  alt={user.id} src={user.avatarURL} className={classes.large} />
                    </div>
            <Typography
              align="center"
              variant="subtitle1"
              color="textPrimary"
            >
              {"Total Score: " +
                (Object.keys(user.answers).length +
                  Object.keys(user.questions).length)}
            </Typography>
            <br />
            <Typography
              align="center"
              variant="subtitle1"
              color="textPrimary"
            >
              {"No. of Answered Questions: " + Object.keys(user.answers).length}
            </Typography>
            <br />
            <Typography
              align="center"
              variant="subtitle1"
              color="textPrimary"
            >
              {"No. of Created Questions: " + Object.keys(user.questions).length}
            </Typography>
            <br />
            </CardContent>
        </CardActionArea>
    </Card>
)
}
export default connect()(LeaderboardItem);