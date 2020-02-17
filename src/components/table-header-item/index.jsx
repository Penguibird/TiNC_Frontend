import css from './index.css'
import React, { Component } from 'react';
import DownArrow from '../down-arrow';
import wss from '../../assets/widthStyleSheet'

export default class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={'table-header-' + this.props.value} className='table-header-item' style={{ flexGrow: wss[this.props.value]}}>
                {this.props.name}
                <DownArrow down={this.props.arrowDown} />
            </div>
        )
    }
}

//name is the Czech display term
//value is the proper query and etc term