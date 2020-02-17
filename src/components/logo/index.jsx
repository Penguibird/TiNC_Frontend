import css from './index.css'
import React, { Component } from 'react';
import logo from '../../assets/logo.svg'

export default class Logo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img id = 'logo-main' src={logo} height = '61' width = '113'/>
        )
    }
}