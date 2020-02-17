import css from './index.css'
import React, { useState, useEffect } from 'react';
import noteIcon from '../../assets/notes.svg';
import TextInput from '../input-text';
import Add from '../add-field';


export default function Notes(props) {
    const [notes, setNotes] = useState(props.notes);


    const onBlur = (e) => {
        let nextNotes = notes;
        nextNotes.push(e.target.value);
        setNotes([...nextNotes]);
    }

    return (
        <div className='edit-notes'>
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
                    return <div className='edit-note' key={i} style={{ order: i }} >
                        {note}
                    </div>
                })}
            </div>
        </div>
    )
}