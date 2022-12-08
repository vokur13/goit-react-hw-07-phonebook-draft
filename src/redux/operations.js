import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } from './contacts/contactsSlice';

axios.defaults.baseURL = 'https://6391cf11ac688bbe4c533d42.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, phone });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (itemId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${itemId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchContacts = () => async dispatch => {
//   try {
//     // Индикатор загрузки
//     dispatch(fetchingInProgress());
//     // HTTP-запрос
//     const response = await axios.get('/contacts');
//     // Обработка данных
//     dispatch(fetchingSuccess(response.data));
//   } catch (error) {
//     // Обработка ошибки
//     dispatch(fetchingError(error.message));
//   }
// };
