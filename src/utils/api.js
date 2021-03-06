import {
     _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions
} from './_DATA'

export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
        ([users, questions]) => ({
            users,
            questions,
        })
    )
}

export function saveQuestionAnswer(authedUser, qid, answer) {
    return _saveQuestionAnswer({ authedUser, qid, answer })
}

export function saveQuestion(question) {
    return _saveQuestion(question)
}