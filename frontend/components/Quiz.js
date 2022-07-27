import React, { useEffect } from 'react'

import { fetchQuiz, setQuiz, postAnswer, setMessage } from "../state/action-creators"

import { connect } from 'react-redux'

let selected = 0
function Quiz(props) {
  console.log("QUIZ PROPS: ", props)

  useEffect(() => {
    props.fetchQuiz()
  }, [])

  const handleSubmit = () => {
    props.postAnswer([
      props.quiz[("answer" + selected)],
      props.quiz.quiz_id
    ])
    props.fetchQuiz()
  }

  const handleClick = (evt) => {
    //  console.log(evt)

    if (evt.target.id == 1 || evt.target.id == "button1") {
      props.setQuiz(props.quiz.answer1.text)

      selected = 1
      const div = document.getElementById(2)
      div.classList.remove("selected")

      const button = document.getElementById("button2")
      button.textContent = "Select"

      const div2 = document.getElementById(1)
      div2.classList.add("selected")

      const button2 = document.getElementById("button1")
      button2.textContent = "SELECTED"

    } else if (evt.target.id == 2 || evt.target.id == "button2") {
      props.setQuiz(props.quiz.answer2.text)

      selected = 2
      const div = document.getElementById(1)
      div.classList.remove("selected")

      const div2 = document.getElementById(2)
      div2.classList.add("selected")

      const button = document.getElementById("button1")
      button.textContent = "Select"

      const button2 = document.getElementById("button2")
      button2.textContent = "SELECTED"
    }

  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz.loading === true
          ? (
            "Loading next quiz..."
          ) : <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {[1, 2].map(val => {
                return (
                  <div quiz_id={props.quiz.quiz_id} id={val} onClick={handleClick} key={val} className="answer">
                    {props.quiz[("answer" + val.toString())].text}
                    <button id={`button${val}`}>
                      Select
                    </button>
                  </div>
                )
              })}

            </div>

            <button onClick={handleSubmit} id="submitAnswerBtn" disabled={props.quiz.disabled}>Submit answer</button>
          </>
      }
    </div >
  )
}

const MapStateToProps = (state) => {
  return state;
}

export default connect(MapStateToProps, { fetchQuiz, setQuiz, postAnswer, setMessage })(Quiz)