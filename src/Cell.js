import React from 'react'

const Cell = ({ isAlive, i, j, updateCellState }) => (
  <div
    className={'cell ' + (isAlive ? 'alive' : 'dead')}
    onClick={_ => updateCellState(i, j)}
  />
)
export default Cell
