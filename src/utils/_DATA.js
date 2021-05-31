let users = {
  mostafasaad: {
    id: 'mostafasaad',
    name: 'Mostafa Saad',
    avatarURL: 'https://avatars.githubusercontent.com/u/5536363?v=4',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  hazemkhairy: {
    id: 'hazemkhairy',
    name: 'Hazem Khairy',
    avatarURL: 'https://avatars.githubusercontent.com/u/29237448?v=4',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  yousefelsherif: {
    id: 'yousefelsherif',
    name: 'Youssef ElSherif',
    avatarURL: 'https://avatars.githubusercontent.com/u/62338451?v=4',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'mostafasaad',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['mostafasaad'],
      text: 'Have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'Have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'yousefelsherif',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'Become a superhero',
    },
    optionTwo: {
      votes: ['yousefelsherif', 'mostafasaad'],
      text: 'Become a supervillain'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'mostafasaad',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'Be telekinetic',
    },
    optionTwo: {
      votes: ['mostafasaad'],
      text: 'Be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'hazemkhairy',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'Be a front-end developer',
    },
    optionTwo: {
      votes: ['mostafasaad'],
      text: 'Be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'hazemkhairy',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['hazemkhairy'],
      text: 'Find $50 yourself',
    },
    optionTwo: {
      votes: ['yousefelsherif'],
      text: 'Have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'yousefelsherif',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['yousefelsherif'],
      text: 'Write JavaScript',
    },
    optionTwo: {
      votes: ['hazemkhairy'],
      text: 'Write Swift'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }
      
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
