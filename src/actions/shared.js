import { addUserAnswer, receiveUsers } from './users'
import { addAnswer, receiveQuestions } from './questions'
import { getInitialData, saveQuestionAnswer } from '../utils/api'

export function handleInitialData() {
    return(dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}

export function  handleQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        return saveQuestionAnswer(authedUser, qid, answer)
        .then(() => {
            dispatch(addAnswer(authedUser, qid, answer))
            dispatch(addUserAnswer(authedUser, qid, answer))
        })
    }
}