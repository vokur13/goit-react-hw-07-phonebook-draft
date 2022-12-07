import { createSlice } from '@reduxjs/toolkit';
// import { initailContacts } from 'utils/initialContacts';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    add(state, action) {
      state.contacts.push(action.payload);
    },
    remove(state, action) {
      const index = state.contacts.findIndex(
        item => item.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
    findContact(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { add, remove, findContact } = contactsSlice.actions;
