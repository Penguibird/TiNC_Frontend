import css from './index.css';
import React, { useState, useEffect } from 'react';
import Loading from '../loading';
import Contacts from '../edit-contacts';
import Notes from '../edit-notes';
import TextInput from '../input-text';
import gql from 'graphql-tag';
import Tickbox from '../tickbox';
import useDebounce from '../../assets/hooks/useDebounce';
import collapseArrow from '../../assets/collapseArrow.svg';
import deleteIcon from '../../assets/delete.svg';
import institution from '../../assets/institution.svg';
import city from '../../assets/place.svg';
import interest from '../../assets/heart.svg';


import { useQuery, useLazyQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
//${props.uuid.toString()}

export default function TableEntryEdit(props) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const GET_ENTRY = gql`
        query($id: String!) {
            entry(id: $id) {
                id
                institution
                city {
                    id
                    name
                }
                contacts {
                    name
                    position
                    phone 
                    email
                }
                notes
                interest {
                    id
                    name
                }
            }
        }
    `;
    const [getData, { apiCalled, apiLoading, apiData }] = useLazyQuery(GET_ENTRY, {
        variables: { id: props.uuid },
        onCompleted: (data) => {
            setData(data.entry);
            setLoading(false);
            console.log("Set the data");
        },
        onError: (e) => {
            setError(true);
            console.log(e);
        },
        fetchPolicy: "network-only",
        // notifyOnNetworkStatusChange: true,
    });

    // getData({});
    //If the result is the same, I dont need a lazy query in the hook above
    useEffect(() => {
        console.log("fetching Data");
        getData({});
    }, [setData])

    const SET_ENTRY = gql`
            mutation($id: String!, $input: EntryInput!) {
                updateEntry(id: $id, input: $input) 
            }
    `//
    let [mutate, { mutloading, muterror }] = useMutation(SET_ENTRY);

    const cleanInput = (object) => {
        return object
    }

    const debouncedData = useDebounce(cleanInput(data), 500);

    useEffect(() => {
        if (Object.entries(debouncedData).length !== 0) {
            console.log("Called mutation, Sending data to API");
            let input = debouncedData;
            mutate({ variables: { id: props.uuid, input: input } })
        }
    }, [debouncedData])


    useEffect(() => {
        return () => {
        }
    })

    const setContacts = (contacts) => {
        let object = Object.assign({}, data, { contacts: contacts });
        setData(cleanInput(object));
    }

    const setNotes = (notes) => {
        let newData = Object.assign({}, data, { notes: notes });
        setData(cleanInput(newData));
    }

    if (loading) return <Loading />;
    // if (apiError) return <p>API NOT CALLED</p>;
    if (!data) return <p>No DATA</p>;
    // setData(apiData);

    return <div className='table-entry-edit'>
        <div className='edit-wrapper-top'> {/*top row,  */}
            <Tickbox callback={props.setTicked} />
            <button className='collapse-button' onClick={function () {
                props.collapseFunction();
                props.updateParentData(data)
            }}>
                <img src={collapseArrow} className='icon collapseArrow' />
                <div className='button-text'>
                    Collapse
                </div>
            </button>
            <button className='collapse-button' onClick={function () {
                props.removeEntry(props.uuid);
                props.collapseFunction();
            }}>
                <img src={deleteIcon} className='icon collapseArrow' />
                <div className='button-text'>
                    Delete
                </div>
            </button>
        </div>
        <div className='edit-container'> {/*This one will be the flexbox set to row*/}
            <div className='edit-wrapper'>
                <div className='text-input-wrapper edit-institution'>
                    <img src={institution} className='icon institution' />
                    <TextInput
                        defaultValue={data.institution}
                        onChange={
                            function (e) {
                                let val = e.target.value;
                                setData(cleanInput(Object.assign({}, data, { institution: val })))
                            }
                        }
                    />
                </div>
                <div className='text-input-wrapper edit-city'>
                    <img src={city} className='icon city' />
                    <TextInput
                        defaultValue={data.city.name}
                        onChange={
                            function (e) {
                                let val = e.target.value;
                                setData(cleanInput(Object.assign({}, data, { city: { id: data.city.id, name: val } })))
                            }
                        }
                    />
                </div>
                <div className='text-input-wrapper edit-interest'>
                    <img src={interest} className='icon interest' />
                    <TextInput
                        defaultValue={data.interest.name}
                        onChange={
                            function (e) {
                                let val = e.target.value;
                                setData(cleanInput(Object.assign({}, data, { interest: { id: data.interest.id, name: val } })))
                            }
                        }
                    />
                </div>
            </div>
            <Contacts contacts={data.contacts} setContacts={setContacts} uuid={props.uuid} />
            <Notes notes={data.notes} setNotes={setNotes} uuid={props.uuid} />
        </div>
    </div>
}