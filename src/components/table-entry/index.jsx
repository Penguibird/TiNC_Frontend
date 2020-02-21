import css from './index.css'
import React, { Component, setState } from 'react';
// import { Link, Route } from 'react-router-dom'
import TableEntryItem from '../table-entry-item';
import TableEntryEdit from '../table-entry-edit';
import Tickbox from '../tickbox';

export default class TableEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticked: false,
            data: props.data
        };
        this.setExpandedParent = this.props.setCurrentlyExpanded;
        this.expand = this.expand.bind(this)
    }

    setTicked = (value) => {
        this.setState({ ticked: value })
    }

    collapse = () => {
        this.setState({ expanded: false, data: this.props.data });
        this.setExpandedParent('')
    }


    updateData = (data) => {
        let newState = this.state
        newState.expanded = false;
        Object.keys(this.state.data).forEach((v, i) => {
            if (data[v]) {
                if (typeof data[v] === 'object' && !Array.isArray(data[v])) {
                    newState.data[v] = data[v].name;
                    this.setState(newState);
                } else {
                    newState.data[v] = data[v];
                    this.setState(newState);
                }
            }
        })
    }

    expand = () => {
        this.setState({ expanded: true });
        this.setExpandedParent(this.props.uuid)
    }

    render() {
        return !this.props.expanded ?
            <button className='table-entry-wrapper' onClick={this.expand}>
                <div className='table-entry'>
                    <Tickbox callback={this.setTicked} />
                    {
                        Object.values(this.props.data).map((v, i) =>
                            <TableEntryItem key={i} myKey={Object.keys(this.props.data)[i].toString()} name={v.toString()} />
                        )
                    }
                </div>
            </button>
            :
            <TableEntryEdit
                uuid={this.props.uuid}
                client={this.props.client}
                data={this.props.data}
                setTicked={this.setTicked}
                collapseFunction={this.collapse}
                updateParentData={this.updateData}
                removeEntry={this.props.removeEntry}
            />



    }
}