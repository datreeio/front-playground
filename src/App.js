import React, { Component } from 'react'
import './App.css'

import Cell from './Cell'

const b_LENGTH = 60
const b_WIDTH = 100
const DURATION = 100

class App extends Component {
  constructor() {
    super()
    this.state = { boardState: this.initBoard() }
  }
  initBoard = () => {
    const a = Array.from(Array(b_LENGTH).keys())
    const b = Array.from(Array(b_WIDTH).keys())
    return a.map(() => b.map(() => Math.round(Math.random())))
  }
  componentDidMount() {
    setInterval(this.tick, DURATION)
  }
  tick = () => {
    console.log('tick')
    let newBoardState = []
    for (let i = 0; i < b_LENGTH; i++) {
      newBoardState.push([])
      for (let j = 0; j < b_WIDTH; j++) {
        const fromX = Math.max(0, i - 1)
        const toX = Math.min(b_LENGTH, i + 2)

        const fromY = Math.max(0, j - 1)
        const toY = Math.min(b_WIDTH, j + 2)

        let neighboursCount = 0
        for (let l = fromX; l < toX; l++) {
          for (let m = fromY; m < toY; m++) {
            if (!(i === l && j === m)) {
              neighboursCount += this.state.boardState[l][m]
            }
          }
        }
        let newCellState = 1
        if (this.state.boardState[i][j] === 1) {
          if (neighboursCount < 2 || neighboursCount > 3) {
            newCellState = 0
          }
        } else if (neighboursCount !== 3) {
          newCellState = 0
        }
        newBoardState[i].push(newCellState)
      }
    }

    this.setState({ boardState: newBoardState })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to game of life</h1>
        </header>
        <div className="App-intro">
          <div className="board">
            {this.state.boardState.map((row, i) => (
              <div className="row" key={i}>
                {row.map((cell, j) => <Cell key={j} isAlive={cell} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
