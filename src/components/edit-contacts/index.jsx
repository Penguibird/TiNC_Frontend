import css from './index.css';
import React, { Component } from 'react';
import email from '../../assets/email.svg';
import phone from '../../assets/phone.svg';
import plus from '../../assets/Plus.svg';
import TextInput from '../input-text';
import Add from '../add-field';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: this.props.contacts
        }
    }

    handleChange = (i, key, ii = -1) => {
        if (ii !== -1) {
            return (e) => {
                let val = e.target.value;
                if (val === null || /^\s*$/.test(val)) {
                    let newState = this.state;
                    newState.contacts[i][key].splice(ii, 1);
                    this.setState(newState)
                } else {
                    let newState = this.state;
                    newState.contacts[i][key][ii] = val;
                    this.setState(newState);
                }
                this.props.setContacts(this.state.contacts);
            }
        } else {
            return (e) => {
                let val = e.target.value;
                if (val === null || /^\s*$/.test(val)) {
                    this.setState(state => {
                        state.contacts[i][key] = '';
                    })
                } else {
                    this.setState(state => {
                        state.contacts[i][key] = val;
                    })
                }
                this.props.setContacts(this.state.contacts);
            }
        }
    }

    addNewContact = () => {
        let newState = this.state;
        newState.contacts.push({
            name: '',
            position: '',
            phone: [],
            email: [],
        })
        this.setState(newState);
    }

    removeContact = (i) => {
        let newState = this.state;
        newState.contacts.splice(i, 1);
        console.log(this.state.contacts, newState.contacts);
        this.setState(newState);
    }

    render() {
        return (
            <div className='edit-contacts'>
                {this.state.contacts.map((contact, i) => {
                    return <div className='contact-wrapper' key={i}>
                        <button onClick={() => { this.removeContact(i) }}>Odebrat Kontakt</button>
                        <div className='text-input-wrapper edit-flexbox'>
                            <TextInput className='contact-name' defaultValue={contact.name} onChange={this.handleChange(i, 'name')} />
                            <TextInput className='contact-position' defaultValue={contact.position} onChange={this.handleChange(i, 'position')} />
                        </div>
                        <div className='contact-phone-wrapper'>
                            <img src={phone} className='icon' />
                            <div className='edit-flexbox'>
                                {contact.phone.map((phone, ii) => {
                                    return <TextInput className='contact-phone' key={ii} defaultValue={phone}
                                        onBlur={this.handleChange(i, 'phone', ii)} />
                                })}
                                <button className=''
                                    onClick={() => {
                                        let newState = this.state;
                                        this.state.contacts[i]['phone'].push('');
                                        this.setState(newState);
                                    }}>
                                    <div>Přidat Telephon</div>
                                </button>
                            </div>
                        </div>
                        <div className='contact-email-wrapper'>
                            <img src={email} className='icon' />
                            <div className='edit-flexbox'>
                                {contact.email.map((email, ii) => {
                                    return <TextInput className='contact-email' key={ii} defaultValue={email} onBlur={this.handleChange(i, 'email', ii)} />
                                })}
                                <button className=''
                                    onClick={() => {
                                        let newState = this.state;
                                        this.state.contacts[i]['email'].push('');
                                        this.setState(newState);
                                    }} >
                                    <div>Přidat Email</div>
                                </button>
                            </div>
                        </div>
                    </div>
                })}
                <button className='add-new-contact add-new-button' onClick={this.addNewContact}>
                    <div>
                        <img src={plus} className='icon' />
                    </div>
                </button>
            </div>
        )
    }
}