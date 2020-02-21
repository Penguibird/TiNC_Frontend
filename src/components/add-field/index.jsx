import css from './index.css'
import React, { useState, useEffect } from 'react';
import TextInput from '../input-text'
import gql from 'graphql-tag';
import { useMutation, useQuery } from "@apollo/react-hooks";

export default function Add(props) {
    const [adding, setAdding] = useState(false);
    const [defaultValue, setDefaultValue] = useState('');

    const ADD_STH = gql`
        mutation($id: String!, $field: String!, $input: String!) {
            addSomething(id: $id, field: $field, input: $input)
        }
    `//
    let [mutate, { loading, error }] = useMutation(ADD_STH);

    const REM_STH = gql`
        mutation($id: String!, $field: String!, $input: String!) {
            removeSomething(id: $id, field: $field, input: $input)
        }
    `//
    let [remove, { load, err }] = useMutation(REM_STH);

    const onBlur = (e) => {
        let val = e.target.value;
        mutate({
            variables: {
                id: props.uuid,
                field: props.field,
                input: val,
            }
        });
        setAdding(false);
        props.onBlur(e);
    }

    return adding ?
        <TextInput
            // {...props}
            targetWidth={props.targetWidth}
            className={'add ' + props.className}
            defaultValue={defaultValue}
            onChange={e => {
                setDefaultValue(e.target.value);
            }}
            onBlur={onBlur}
        /> : <button
            className={'add-button ' + props.className}
            style={props.style}
            onClick={function () {
                setAdding(true);
                console.log('clicked')
            }}
        >
            Add {props.name}
        </button>


}