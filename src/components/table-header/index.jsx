import css from './index.css'
import React, { Component } from 'react';
import Item from '../table-header-item'
import Tickbox from '../tickbox'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    tickAll() {

    }

    render() {
        return (
            <div id='table-header'>
                <Tickbox callback={this.tickAll} />
                <Item name='Název' arrowDown='true' value='institution'/>
                <Item name='Mesto' arrowDown='true' value='city'/>
                <Item name='Zajem' arrowDown='true' value='interest'/>
                {/* <Item name='Poznamka' arrowDown='true' value='note'/> */}
            </div>
        )
    }
}