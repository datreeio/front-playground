import React from 'react'

const Cell = ({ isAlive }) => (
  <div className={'cell ' + (isAlive ? 'alive' : 'dead')}>
    <div />
  </div>
)
export default Cell
