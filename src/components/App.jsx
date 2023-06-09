import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';

export function App() {
  return (
    <Wrapper>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm />

      <TitleContacts>Contacts</TitleContacts>
      <Filter />
      <ContactList />
    </Wrapper>
  );
}
