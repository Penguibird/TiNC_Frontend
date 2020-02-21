import css from './index.css'
import React, { useState, useEffect, Fragment } from 'react';
import TableEntry from '../table-entry';
import Loading from '../loading';
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import uuid from 'uuid/v4'


export default function Body(props) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [currentlyExpanded, setCurrentlyExpanded] = useState('emptyuuid')

    const setExpanded = (id) => {
        setCurrentlyExpanded(id)
    }


    const GET_ENTRIES = gql`
    query {
        entries {
            id
            institution
            city {
                name
            }
            interest {
                name
            }
            notes
        }
    }`
    const [getData, { apiCalled, apiLoading, apiData }] = useLazyQuery(GET_ENTRIES, {
        onCompleted: (d) => {
            setData(d);
            console.log(d)
            setLoading(false);
        },
        onError: (e) => {
            setError(true)
            console.log(e)
        },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        console.log('getting data')
        getData()
    }, [setData])


    const CREATE_ENTRY = gql`
    mutation($input: EntryInput!) {
        createEntry(input: $input) 
    }`
    const [create, { mutLoading, mutError }] = useMutation(CREATE_ENTRY);

    const addEntry = () => {
        let id = uuid()
        let input = {
            id: id,
            institution: '',
            city: {
                id: uuid(), //wrong and just temporary
                name: ''
            },
            contacts: [],
            notes: [],
            interest: {
                id: uuid(), //wrong and just temporary
                name: ''
            }
        }
        let newData = data;
        newData.entries.push(input);
        setData(newData);
        setCurrentlyExpanded(id)
        create({
            variables: {
                input: input,

            }
        })
    }


    const REMOVE_ENTRY = gql`
    mutation($id: String!) {
        removeEntry(id: $id)
    }`
    const [remove, { remLoading, remError }] = useMutation(REMOVE_ENTRY);

    const removeEntry = (removingID) => {
        let tbRemoved
        let newData = {};
        newData.entries = [...data.entries]
        newData.entries.forEach((v, i, arr) => {
            if (v.id === removingID) {
                console.log(v);
                tbRemoved = i;
                // arr.splice(v, 1);
            }
        });
        newData.entries.splice(tbRemoved, 1);
        console.log(newData);
        remove({
            variables: {
                id: removingID,
            }
        });
        setData(newData);
    }


    if (loading) return <Loading />;
    if (error) {
        return <p>ERROR</p>
    };
    if (!data) return <p>No DATA</p>;

    return <div className='table-body'>
        <button onClick={addEntry}>Vytvořit Nový</button>
        {console.log(data.entries)}
        {data.entries.map((entry, index) =>
            <Fragment>
                <TableEntry uuid={entry.id} key={entry.id} data={{
                    institution: entry.institution,
                    city: entry.city.name,
                    interest: entry.interest.name,
                    // notes: entry.notes ? entry.notes[0] : '',
                }}
                    client={props.client}
                    removeEntry={removeEntry}
                    setCurrentlyExpanded={setExpanded}
                    expanded={currentlyExpanded === entry.id}
                />
                {(index == data.entries.length - 1) ? null : <div className='table-entry-line'></div>}
            </Fragment>
        )}
    </div>
}