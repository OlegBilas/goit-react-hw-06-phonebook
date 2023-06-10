import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { Form, Label, Input } from './ContactForm.styled';
import { getContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsSlice';

export default function ContactForm() {
  const initialState = { name: '', number: '' };
  const [contact, setContact] = useState(initialState);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    setContact(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    if (contacts.find(({ name }) => name === contact.name)) {
      return alert(`${contact.name} is already in contacts`);
    }
    e.preventDefault();
    dispatch(
      addContact({ id: nanoid(), name: contact.name, number: contact.number })
    );
    setContact(initialState);
  };

  const idName = nanoid();
  const idNumber = nanoid();
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={idName}>Name</Label>
      <Input
        id={idName}
        type="text"
        name="name"
        value={contact.name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />

      <Label htmlFor={idNumber}>Number</Label>
      <Input
        id={idNumber}
        type="tel"
        name="number"
        value={contact.number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />

      <button type="submit" disabled={!contact.name || !contact.number}>
        Add contact
      </button>
    </Form>
  );
}
