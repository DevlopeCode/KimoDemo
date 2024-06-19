// dataThunks.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchDataStart, fetchDataSuccess, fetchDataFailure} from './slice';

export const fetchData = createAsyncThunk(
  'apidata/fetchData',
  async apiEndpoint => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error('Error fetching data');
    }
  },
);
