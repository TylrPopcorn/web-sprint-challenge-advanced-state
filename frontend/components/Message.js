import React from 'react'

import { connect } from 'react-redux'

function Message(props) {
  const { infoMessage } = props

  return <div id="message">{infoMessage
  } </div>
}

const MapToStateProps = (state) => {
  return state;
}

export default connect(MapToStateProps, {})(Message)
