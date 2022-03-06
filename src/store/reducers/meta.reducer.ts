import { Coin, TokenPair } from '@/utils';
import { createReducer } from '@reduxjs/toolkit';
import { getTokenPairs, getCoins } from '../actions';

interface MetaState {
  coins: {
    loading: boolean;
    data: Coin[];
  };
  tokenPairs: {
    loading: boolean;
    data: TokenPair[];
  };
}

const initialState: MetaState = {
  coins: { loading: false, data: [] },
  tokenPairs: { loading: false, data: [] },
};

const metaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getTokenPairs.pending, (s) => {
      s.tokenPairs.loading = true;
    })
    .addCase(getTokenPairs.fulfilled, (s, { payload }) => {
      s.tokenPairs.loading = false;
      s.tokenPairs.data = payload;
    })
    .addCase(getCoins.pending, (s) => {
      s.coins.loading = true;
    })
    .addCase(getCoins.fulfilled, (s, { payload }) => {
      s.coins.loading = false;
      s.coins.data = payload;
    });
});

export default metaReducer;
