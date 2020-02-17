import css from './index.css'
import React, { Component } from 'react';
import arrow from '../../assets/downArrow.svg'

export default class DownArrow extends Component {
    constructor(props) {
        super(props);
        this.arrowDown = true
    }

    render() {
        return (
            <img className='downArrow' src={arrow} height='7px' width='14px' style={this.props.arrowDown ? { transform: 'rotate(180deg)' } : null} />
        )
    }
}