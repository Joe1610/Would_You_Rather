import {
    RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER 
} from '../actions/questions'

export default function questions(state = {}, action) {
    const { questionID, answer, authedUser } = action;
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case ADD_ANSWER:
            return {
                ...state,
                [questionID]: {
                    ...state[questionID],
                    [answer]: {
                        ...state[questionID][answer],
                        votes: state[questionID][answer].votes.concat([
                            authedUser,
                        ]),
                    },
                },
            }
        default:
            return state
    }
}