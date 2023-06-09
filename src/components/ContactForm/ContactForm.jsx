import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { Form, Label, Input } from './ContactForm.styled';
import { getContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsSlice';

export default function ContactForm() {
  const [nameForm, setNameForm] = useState('');
  const [numberForm, setNumberForm] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'nameForm') {
      setNameForm(value);
    }
    if (name === 'numberForm') {
      setNumberForm(value);
    }
  };

  const handleSubmit = e => {
    if (contacts.find(({ name }) => name === nameForm)) {
      return alert(`${nameForm} is already in contacts`);
    }
    e.preventDefault();
    dispatch(addContact({ id: nanoid(), name: nameForm, number: numberForm }));
    setNameForm('');
    setNumberForm('');
  };

  const idName = nanoid();
  const idNumber = nanoid();
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={idName}>Name</Label>
      <Input
        id={idName}
        type="text"
        name="nameForm"
        value={nameForm}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />

      <Label htmlFor={idNumber}>Number</Label>
      <Input
        id={idNumber}
        type="tel"
        name="numberForm"
        value={numberForm}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />

      <button type="submit" disabled={!nameForm || !numberForm}>
        Add contact
      </button>
    </Form>
  );
}
