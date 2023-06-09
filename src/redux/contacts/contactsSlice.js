import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

const initialBook = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactsSlice = createSlice({
  name: 'book',
  initialState: initialBook,
  reducers: {
    addContact(state, action) {
      return [action.payload, ...state.contacts];
    },
    removeContact(state, action) {
      return state.contacts.filter(contact => contact.id !== action.payload);
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
