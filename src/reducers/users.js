import { 
    RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER
} from '../actions/users'

export default function users(state = {}, action) {
    const { authedUser, questionID, answer } = action;
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        case ADD_USER_QUESTION:
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat(questionID),
                },
            }
        case ADD_USER_ANSWER:
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [questionID]: answer,
                    },
                },
            }
        default:
             return state
    }
}