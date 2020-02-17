import css from './index.css'
import React, { Component } from 'react';
import Header from '../table-header';
import Body from '../table-body';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='content-table' className='content-table'>
                <Header />
                <Body client={this.props.client}/>
            </div>
        )
    }
}