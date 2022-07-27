// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'

export function moveClockwise(payload) {
  return ({ type: "MOVE_CLOCKWISE", payload: payload })
}

export function moveCounterClockwise(payload) {
  return ({ type: "MOVE_COUNTERCLOCKWISE", payload: payload })
}

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz(payload) {
  return ({ type: "SET_SELECTED_ANSWER", payload: payload })
}

export function inputChange(payload) {
  return ({ type: "INPUT_CHANGE", payload })
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({ type: "LOADING", payload: true })

    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        // console.log("SUCCESS: ", res)
        dispatch({
          type: "QUESTION",
          payload: {
            question: res.data.question,
            answer1: res.data.answers[0],
            answer2: res.data.answers[1],
            quiz_id: res.data.quiz_id,
            loading: false,
          }
        })
      })
      .catch(err => {
        console.log("ERROR: ", err)
        dispatch({ type: "LOADING", payload: true })
        dispatch({ type: "SET_INFO_MESSAGE", payload: err.response.data.message })
      })

  }
}
export function postAnswer(payload) {
  // console.log(payload)
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz

    axios.post("http://localhost:9000/api/quiz/answer", {
      "answer_id": payload[0].answer_id,
      "quiz_id": payload[1],
    })
      .then(res => {
        dispatch({ type: "SET_INFO_MESSAGE", payload: res.data.message })
        // console.log("SUCCESS", res)
      })
      .catch(err => {
        dispatch({ type: "SET_INFO_MESSAGE", payload: err.response.data.message })
      })

  }
}
export function postQuiz(payload) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    dispatch({ type: "SET_INFO_MESSAGE", payload: "" })
    axios.post("http://localhost:9000/api/quiz/new", payload)
      .then(res => {
        //console.log("SUCCESS: ", res)
        dispatch({ type: "RESET_FORM" })
        dispatch({ type: "SET_INFO_MESSAGE", payload: `Congrats: "${res.data.question}" is a great question!` })
      })
      .catch(err => {
        dispatch({ type: "SET_INFO_MESSAGE", payload: err.response.data.message })
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
