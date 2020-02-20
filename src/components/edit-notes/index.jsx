import css from './index.css'
import React, { useState, useEffect, createRef } from 'react';
import noteIcon from '../../assets/notes.svg';
import TextInput from '../input-text';
import Add from '../add-field';


export default function Notes(props) {
    const [notes, setNotes] = useState(props.notes);
    let myRef = createRef();

    useEffect(() => {
        props.setNotes(notes)
    }, [notes])

    const onBlur = (e) => {
        let nextNotes = notes;
        nextNotes.push(e.target.value);
        setNotes([...nextNotes]);
    }

    const changeNote = i => e => {
        let changeArr = (arr) => {
            arr[i] = (e.target.value);
            return arr
        }
        setNotes(prev => [...changeArr(prev)])
    }

    const filter = () => {
        setNotes(arr => [...arr.filter(note => (note !== "" || !/^\s*$/.test(note)))]);
    }

    const getWidth = () => {
        let wd = myRef.current.offsetWidth * 0.8;
        console.error(myRef, wd);
        return wd
    }

    return (
        <div className='edit-notes' ref={myRef}>
            <img src={noteIcon} className='icon' />
            <div className='edit-notes-flex'>
                <Add
                    uuid={props.uuid}
                    className='text-input'
                    onBlur={onBlur}
                    field='notes'
                    name='note'
                    style={{
                        backgroundColor: 'white',
                        width: '71px',
                        fontSize: '15px',
                        fontStyle: 'oblique',
                    }}
                />
                {notes.map((note, i) => {
                    return <TextInput className='edit-note' key={i} style={{ order: i }} defaultValue={note} onChange={changeNote(i)} onBlur={filter} targetWidth={getWidth} />
                })}
            </div>
        </div>
    )
}