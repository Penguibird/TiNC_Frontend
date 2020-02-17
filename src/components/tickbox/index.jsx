import css from './index.css'
import React, { Component } from 'react';
import ControlledInput from '../controlledInput/index.jsx'

export default class Tickbox extends Component {
    constructor(props) {
        super(props);

    }

    onComponentDidMount() {
    }

    render() {

        return (
            <div className ='tickbox' style={this.props.style}>
                {/* <input
                    type='checkbox'
                    onChange={({ target: { value } }) => setValue(value)}
                /> */}
                <ControlledInput text='' type='checkbox' callback={this.props.callback} />
            </div>
        )
    }
}