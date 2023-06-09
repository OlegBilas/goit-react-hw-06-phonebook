import React from 'react';
// import PropTypes from 'prop-types';
import { List, Item, Name, Number } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contacts/contactsSlice';
import { getContacts } from 'redux/contacts/selectors';

const ContactList = () => {
  const filter = useSelector(state => {
    console.log(state);
    return state.filter;
  });
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const filteredContacts = () => {
    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      return contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      //return contacts.sort((a, b) => a.name.localeCompare(b.name));
      return contacts;
    }
  };

  return (
    <List>
      {filteredContacts().map(({ id, name, number }) => (
        <Item key={id}>
          <Name>{name}:</Name>
          <Number>{number}</Number>
          <button onClick={() => dispatch(removeContact(id))}>Delete</button>
        </Item>
      ))}
    </List>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.exact({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
//   onRemove: PropTypes.func.isRequired,
// };

export default ContactList;
