import React from 'react'

import SetNumber from './SetNumber'

const SetTempo = ({tempoPercent, tempoTarget}) => {
  return (
    <div>
      <SetNumber value={tempoPercent} units="%"/>
      <h1>of</h1>
      <SetNumber value={tempoTarget} units="bpm"/>
    </div>
  )
}

export default SetTempo;