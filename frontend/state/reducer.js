// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, INPUT_CHANGE, } from "./action-types"

let initialWheelState = 0
function wheel(state = initialWheelState, action) {

  switch (action.type) {
    case MOVE_CLOCKWISE:
      return (
        (action.payload === 5 ? action.payload = 0 : action.payload = action.payload + 1)
      )
    case MOVE_COUNTERCLOCKWISE:
      return (
        (action.payload === 0 ? action.payload = 5 : action.payload = action.payload - 1)
      )

    default:
      return state
  }

}

const initialQuizState = {
  loading: true,
  question: "",
  answer1: "",
  answer2: "",
  disabled: true,
  quiz_id: 0,
}
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case "LOADING":
      return ({
        ...state,
        loading: action.payload
      })
    case "QUESTION":
      return ({
        ...state,
        question: action.payload.question,
        answer1: action.payload.answer1,
        answer2: action.payload.answer2,
        quiz_id: action.payload.quiz_id,
        loading: action.payload.loading,
      })
    case "SET_SELECTED_ANSWER":
      return ({
        ...state,
        disabled: false
      })
    default:
      return state
  }
}

let initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case "SET_SELECTED_ANSWER":
      initialSelectedAnswerState = action.payload
      return (initialSelectedAnswerState = action.payload)
    default:
      return state
  }
}

let initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case "SET_INFO_MESSAGE":
      initialMessageState = action.payload
      return initialMessageState
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE: {
      //console.log(action.payload)

      if (action.payload.target.id == "newQuestion") {
        return ({
          ...state,
          newQuestion: action.payload.target.value
        })
      } else if (action.payload.target.id == "newTrueAnswer") {
        return ({
          ...state,
          newTrueAnswer: action.payload.target.value
        })
      } else if (action.payload.target.id == "newFalseAnswer") {
        return ({
          ...state,
          newFalseAnswer: action.payload.target.value
        })
      }
    }
    case "RESET_FORM":
      return initialFormState
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
