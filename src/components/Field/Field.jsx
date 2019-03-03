import React, {Component} from 'react'
import './Field.css'

export default class Field extends Component {

    renderRow = (field, x) => {
        return (
            <div className='row' key={x}>
                {field.map((cell, y) => this.renderCell(cell, x, y))}
            </div>
        )
    };

    renderCell = (cell, x, y) => {
        if (this.props.snake.some(snake => snake.posX === x && snake.posY === y)) {
            return (
                <div className='cell enemy' key={y}>
                </div>
            )
        }
        if (this.props.apple.some(apple => apple.posX === x && apple.posY === y)) {
            return (
                <div className='cell apple' key={y}>
                </div>
            )
        }
        return (
            <div className='cell' key={y}>
            </div>
        )
    };

    render() {
        return (
            <div className='field'>
                {this.props.field.map((field, index) => this.renderRow(field, index))}
            </div>
        )
    }
}