import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoinImages, fetchTokenPairs } from '@/api';

export const getCoins = createAsyncThunk('getCoins', async () => {
  try {
    return await fetchCoinImages();
  } catch (err) {
    return [];
  }
});

export const getTokenPairs = createAsyncThunk('getTokenPairs', async () => {
  try {
    return await fetchTokenPairs();
  } catch (err) {
    return [];
  }
});
