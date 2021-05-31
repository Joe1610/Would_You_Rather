import { saveQuestion } from "../utils/api"
import { addUserQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function addAnswer(authedUser, questionID, answer) {
    return {
        type: ADD_ANSWER,
        authedUser,
        questionID,
        answer,
    }
}

export function handleAddQuestion(authedUser, optionOne, optionTwo) {
    return (dispatch) => {
        return saveQuestion({
            author: authedUser,
            optionOneText: optionOne,
            optionTwoText: optionTwo,
        }).then((question) => {
            dispatch(addQuestion(question))
            dispatch(addUserQuestion(authedUser, question.id))
        })
    }
}