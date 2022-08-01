import React from 'react'

import { moveClockwise, moveCounterClockwise } from "../state/action-creators"
import { connect } from 'react-redux'

const Wheel = (props) => {
  // console.log("WHEEL PROPS: ", props)


  const handleClick = (option) => {
    switch (option) {
      case "counterClockwiseBtn":
        props.moveCounterClockwise(props.wheel)
        break;
      case "clockwiseBtn":
        props.moveClockwise(props.wheel)
        break;
      default: return
    }
  }


  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [0, 1, 2, 3, 4, 5].map(val => (
            <div key={val} className={`cog ${props.wheel === val ? "active" : ""}`} style={{ "--i": val }}>
              {props.wheel === val ? "B" : ""}
            </div>
          ))
        }
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={() => handleClick("counterClockwiseBtn")} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={() => handleClick("clockwiseBtn")} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapstateToProps = (statefromStore) => {
  //console.log(statefromStore, " TEST")
  return statefromStore
}

export default connect(mapstateToProps, { moveClockwise, moveCounterClockwise })(Wheel)