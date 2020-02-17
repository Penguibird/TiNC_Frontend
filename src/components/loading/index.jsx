import css from './index.css'
import React, { Component } from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}