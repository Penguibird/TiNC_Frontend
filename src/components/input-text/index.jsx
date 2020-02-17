import css from './index.css'
import React, { Component, useState, useEffect } from 'react';
import pixelWidth from 'string-pixel-width';

export default function Input(props) {
    // constructor(props) {
    //     super(props);
    //     state = {
    //         style: {},
    //         long: false,
    //         rows: 1
    //     }
    //     myRef = React.createRef();
    // }

    const [style, setStyle] = useState();
    const [rows, setRows] = useState();
    const [long, setLong] = useState();
    let myRef = null;

    useEffect(() => {
        updateWidth(props.defaultValue);
    }, [setStyle]);

    const handleChange = (e) => {
        updateWidth(e.target.value);
        if (props.onChange) {
            props.onChange(e);
        }
    }

    useEffect(() => {
        myRef.focus();
    }, [long])

    const moveCursorToEnd = (e) => {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    const updateWidth = (value) => {
        let fontSize = parseInt(window.getComputedStyle(myRef).getPropertyValue("font-size"));
        let bold = (window.getComputedStyle(myRef).getPropertyValue("font-weight") == '700');
        let targetWidth = 140;
        let width = pixelWidth(value, { size: fontSize, bold: bold }) + 3;
        let long = (width >= targetWidth);

        setStyle({ width: long ? targetWidth : width });
        setLong(long);
        setRows(Math.ceil(width / (targetWidth -0.5)));

        // console.log('update Width was called');

    }
    //add focus to the textarea immediately afer rendering

    const onFocus = (e) => {
        moveCursorToEnd(e);
        if (props.onFocus) {
            props.onFocus(e)
        }
    }

    const onBlur = (e) => {
        if(props.onBlur) {
            props.onBlur(e)
        }
    }

    const propsI = {
        className: 'text-input ' + props.className,
        style: style,
        key: props.key,
        defaultValue: props.defaultValue,
        onChange: handleChange,
        onFocus: onFocus,
        onBlur: onBlur,
        ref: el => myRef = el,
    };

    return long ?
        <textarea
            {...propsI}
            wrap='hard'
            cols='40'
            rows={rows}
        /> :
        <input type='text'
            {...propsI}
        />


}