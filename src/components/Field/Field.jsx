import React, {Component} from 'react'

export default class Field extends Component {
    renderRow = (field, index) => {
        return (
            <div className='row' key={index}>
                {field.map((cell, index) => this.renderCell(cell, index))}
            </div>
        )
    };

    renderCell = (cell, index) => {
        return (
            <div className='cell' key={index}>
                {cell}
            </div>
        )
    };


    render() {
        return (
            this.props.field.map((field, index) => this.renderRow(field, index))
        )
    }
}