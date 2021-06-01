import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
    root: {
        maxWidth: "50%",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
        marginLeft: "25%",
        
    },
    actions: {
        justifyContent: "center", 
    },
    btn: {
        paddingBottom: "10px",
    }
})
const Question = props => {
    const classes = useStyles();
    const { questions , users, id } = props;
    const question = questions[id];
    const user = users[question.author];
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name} asks:
                    </Typography>
                    <div style={{paddingLeft: "47.4%"}}>
                    <Avatar  alt={user.id} src={user.avatarURL} className={classes.large} />
                    </div>
                    <Typography gutterBottom variant="h6" >
                        Would you rather
                    </Typography>     
                      <br/>
                    <Typography variant="subtitle1" color="textPrimary" align="center">
                        {question.optionOne.text}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="center">
                        OR
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="center">
                        {question.optionTwo.text}
                    </Typography>     
                </CardContent>
            </CardActionArea>
                <div className= {classes.btn}>
                <Link to={`/questions/${question.id}`}>
                    <Button  variant="contained" size="large" color="primary">
                        View Poll
                    </Button>
                </Link>
                </div>
        </Card>
    )
}

function mapStateToProps({ users, questions }) {
    return {
        users,
        questions,
    }
}

export default connect(mapStateToProps)(Question);