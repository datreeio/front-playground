import React, { Component } from 'react'
import './App.css'

import Cell from './Cell'

const b_LENGTH = 10
const b_WIDTH = 10
const DURATION = 100

class App extends Component {
  constructor() {
    super()
    this.state = {
      boardState: this.initBoard(b_LENGTH, b_WIDTH),
      isPaused: false,
      length: b_LENGTH,
      width: b_WIDTH,
      duration: DURATION
    }
  }
  pauseToggle = () => {
    this.setState({ isPaused: !this.state.isPaused })
  }
  restart = () => {
    this.setState({
      boardState: this.initBoard(
        parseInt(this.lengthInput.value, 10),
        parseInt(this.widthInput.value, 10)
      ),
      length: this.lengthInput.value,
      width: this.widthInput.value
    })
  }
  initBoard = (length, width) => {
    const a = Array.from(Array(length).keys())
    const b = Array.from(Array(width).keys())
    return a.map(() => b.map(() => Math.round(Math.random())))
  }
  updateDuration = () => {
    this.setState({ duration: parseInt(this.durationInput.value, 10) })
    clearInterval(this.interval)
    this.interval = setInterval(this.tick, this.durationInput.value)
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, this.state.duration)
  }
  updateCellState = (i, j) => {
    /*
    super cool bug
    const newBoardState = [
      ...this.state.boardState.slice(0, i),
      [
        ...this.state.boardState.slice(0, j),
        !this.state.boardState[i][j],
        ...this.state.boardState.slice(j)
      ],
      ...this.state.boardState.slice(i)
    ]
    this.setState({ boardState: newBoardState }) */

    const newBoardState = [
      ...this.state.boardState.slice(0, i),
      [
        ...this.state.boardState[i].slice(0, j),
        this.state.boardState[i][j] === 0 ? 1 : 0,
        ...this.state.boardState[i].slice(j + 1)
      ],
      ...this.state.boardState.slice(i + 1)
    ]
    this.setState({ boardState: newBoardState })
  }
  tick = () => {
    if (this.state.isPaused) {
      return
    }
    let newBoardState = []
    for (let i = 0; i < this.state.length; i++) {
      newBoardState.push([])
      for (let j = 0; j < this.state.width; j++) {
        const fromX = Math.max(0, i - 1)
        const toX = Math.min(this.state.length, i + 2)

        const fromY = Math.max(0, j - 1)
        const toY = Math.min(this.state.width, j + 2)

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
                {row.map((cell, j) => (
                  <Cell
                    key={j}
                    isAlive={cell}
                    i={i}
                    j={j}
                    updateCellState={this.updateCellState}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="controls">
            <div className="toggle-button" onClick={this.pauseToggle}>
              toggle pause
            </div>
            <div className="toggle-button" onClick={this.restart}>
              restart
            </div>
            <br />
            length
            <input
              className="default-input"
              type="text"
              name="length"
              ref={input => {
                this.lengthInput = input
              }}
            />
            width
            <input
              className="default-input"
              type="text"
              name="width"
              ref={input => {
                this.widthInput = input
              }}
            />
            step duration
            <input
              className="default-input"
              type="text"
              name="duration"
              ref={input => {
                this.durationInput = input
              }}
              value={this.state.duration}
              onChange={this.updateDuration}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
