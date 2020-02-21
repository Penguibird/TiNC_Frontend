import css from './index.css'
import React, { Component, useState, useEffect } from 'react';
import pixelWidth from 'string-pixel-width';

let targetWidth;


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
    const [long, setLong] = useState(-1);
    const [first, setFirst] = useState(true)
    let value = props.defaultValue;
    let myRef = null;
    // const [targetWidth, setTargetWidth] = useState(140);

    useEffect(() => {

        updateWidth(props.defaultValue);
        value = props.defaultValue;

    }, [setStyle]);


    useEffect(() => {
        console.log(first);

        if (first) {
            setFirst(false);
        } else {
            myRef.focus()
        }
    }, [long])

    const updateWidth = (value) => {
        if (props.targetWidth) {
            // setTargetWidth(props.targetWidth());
            targetWidth = props.targetWidth();
        } else {
            targetWidth = 140;
        }
        let fontSize = parseInt(window.getComputedStyle(myRef).getPropertyValue("font-size"));
        let bold = (window.getComputedStyle(myRef).getPropertyValue("font-weight") == '700');
        let width = pixelWidth(value, { size: fontSize, bold: bold }) + 15;
        let long = (width >= targetWidth);

        setStyle({ width: long ? targetWidth : width });
        if (!first) setLong(long);
        setRows(Math.ceil(width / (targetWidth - 0.5)));
        // console.log('update rows', Math.ceil(width / (targetWidth - 0.5)), { targetWidth });
    }

    const moveCursorToEnd = (e) => {
        //add focus to the textarea immediately afer rendering
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    const handleChange = (e) => {
        updateWidth(e.target.value);
        value = e.target.value
        if (props.onChange) props.onChange(e);
    }

    const onFocus = (e) => {
        moveCursorToEnd(e);
        if (props.onFocus) props.onFocus(e);
    }

    const onBlur = (e) => {
        if (props.onBlur) props.onBlur(e)
    }

    const propsI = {
        className: 'text-input ' + props.className,
        style: style,
        defaultValue: value,
        onChange: handleChange,
        onFocus: onFocus,
        onBlur: onBlur,
        ref: el => myRef = el,
    };

    return long ?
        <textarea
            {...propsI}
            wrap='hard'
            cols='1000'
            rows={rows}
        /> :
        <input type='text'
            {...propsI}
        />


}