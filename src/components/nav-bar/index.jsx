import css from './index.css'
import React, { Component } from 'react';
import Logo from '../logo';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id = 'nav-bar'><Logo/></div>
      )
    }
}   