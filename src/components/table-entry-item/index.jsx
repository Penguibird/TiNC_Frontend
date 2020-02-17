import css from './index.css'
import React, { Component } from 'react';
import wss from '../../assets/widthStyleSheet'

export default class TableEntryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'table-entry-item ' + this.props.myKey} style={{ flexGrow: wss[this.props.myKey]}}>
                {this.props.name}
            </div>
        )
    }
}