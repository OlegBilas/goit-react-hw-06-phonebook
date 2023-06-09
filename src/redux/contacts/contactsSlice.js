import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

const initialContacts = [
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
];

const contactsSlice = createSlice({
  name: 'book',
  initialState: { contacts: initialContacts },
  reducers: {
    addContact(state, action) {
      state.contacts = [action.payload, ...state.contacts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    removeContact(state, action) {
      state.contacts = state.contacts
        .filter(contact => contact.id !== action.payload)
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

// export const contactsReducer = contactsSlice.reducer;

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
