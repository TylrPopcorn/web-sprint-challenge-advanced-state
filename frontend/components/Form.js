import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { inputChange, resetForm, postQuiz } from "../state/action-creators"

import axios from 'axios'

let disabled = true
export function Form(props) {
  //console.log("FORM PROPS: ", props)


  useEffect(() => {
    // console.log(props.form.newQuestion.length)
    if (props.form.newFalseAnswer.trim().length >= 1 && props.form.newQuestion.trim().length >= 1 && props.form.newTrueAnswer.trim().length >= 1) {
      disabled = false

    } else {
      disabled = true
    }

    const button = document.getElementById("submitNewQuizBtn")
    button.disabled = disabled

  }, [props.form.newQuestion, props.form.newFalseAnswer, props.form.newTrueAnswer])

  const onChange = evt => {
    //console.log(evt)
    props.inputChange(evt)
  }

  //console.log(props)

  const onSubmit = evt => {
    evt.preventDefault()
    //console.log(evt)


    props.postQuiz(props.form)

    /*
    props.postQuiz({
      question_text: evt.target[0].value,
      true_answer_text: evt.target[1].value,
      false_answer_text: evt.target[2].value,
    })
    */
    //props.resetForm()


  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input className="question" maxLength={50} onChange={onChange} value={props.form.newQuestion} id="newQuestion" placeholder="Enter question" />
      <input className="question" maxLength={50} onChange={onChange} value={props.form.newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.form.newFalseAnswer} className="question" maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={disabled}>Submit new quiz</button>
    </form>
  )
}

const mapStateToPorps = (state) => {
  return state
}

export default connect(mapStateToPorps, { inputChange, resetForm, postQuiz })(Form)
