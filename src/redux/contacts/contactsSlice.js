import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from '../operations';
// import { initailContacts } from 'utils/initialContacts';

const initialState = {
  // contacts: initailContacts,
  // filter: '',
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
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        item => item.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  // reducers: {
  //   // Выполнится в момент старта HTTP-запроса
  //   fetchingInProgress(state) {
  //     state.isLoading = true;
  //   },
  //   // Выполнится если HTTP-запрос завершился успешно
  //   fetchingSuccess(state, action) {
  // state.isLoading = false;
  // state.error = null;
  // state.items = action.payload;
  //   },
  //   // Выполнится если HTTP-запрос завершился с ошибкой
  //   fetchingError(state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
  // reducers: {
  //   add(state, action) {
  //     state.contacts.push(action.payload);
  //   },
  //   remove(state, action) {
  //     const index = state.contacts.findIndex(
  //       item => item.id === action.payload
  //     );
  //     state.contacts.splice(index, 1);
  //   },
  // findContact(state, action) {
  //   state.filter = action.payload;
  // },
  // },
});

export const contactsReducer = contactsSlice.reducer;
// export const { findContact } = contactsSlice.actions;

// export const { fetchingInProgress, fetchingSuccess, fetchingError } =
//   contactsSlice.actions;
