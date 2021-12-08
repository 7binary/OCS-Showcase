import {
  createSlice,
  createSelector,
  PayloadAction,
  Reducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { User } from 'src/types';
import { authHttp, AuthResponse, Http, GetProfileResponse } from 'src/network';

// INTERFACE
export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

// ASYNC THUNK
const loadUser = createAsyncThunk('auth/getProfile', async (): Promise<GetProfileResponse> => {
  return await authHttp.getProfile();
});
const setAuthAsync = createAsyncThunk('auth/set-async-auth',
  async (authResponse: AuthResponse) => authResponse,
);
const unsetAuthAsync = createAsyncThunk('auth/unset-async-auth',
  async () => null,
);

// HTTP RETRY
let httpRetryRegistered = false;
const registerHttpRetry = createAsyncThunk('auth/registry-http-retry', async (_, { dispatch }) => {
  if (httpRetryRegistered) {
    return;
  }
  Http.setOnError((axiosInstance: AxiosInstance) => async (error: any) => {
    if (error.config && error.response?.status === 401 && !error.config.__isRetry) {
      error.config.__isRetry = true;
      try {
        const authResponse = await authHttp.refresh();
        dispatch(setAuthAsync(authResponse));
        error.config.headers.Authorization = `Bearer ${authResponse.accessToken}`;
        return axiosInstance.request(error.config);
      } catch (refreshError: any) {
        if (refreshError.response?.status === 401) {
          dispatch(unsetAuthAsync());
        } else {
          console.error(refreshError);
        }
      }
    }
    throw error;
  });
  httpRetryRegistered = true;
});

// SLICE
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: () => {
      Http.unsetToken();
      return initialState;
    },
    setAuthResponse: (state, action: PayloadAction<AuthResponse>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      Http.setToken(accessToken);
    },
  },
  extraReducers: {
    [loadUser.fulfilled.type]: (state, action: PayloadAction<GetProfileResponse>) => {
      const { user } = action.payload;
      state.user = user;
    },
    [setAuthAsync.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      Http.setToken(accessToken);
    },
    [unsetAuthAsync.fulfilled.type]: (state) => {
      state.user = null;
      state.token = null;
      Http.unsetToken();
    },
  },
});

// EXPORTS REDUCER
export const authReducer = slice.reducer as Reducer<typeof initialState>;

// EXPORTS ACTIONS
const { setAuthResponse, resetAuth } = slice.actions;
export const authActions = { setAuthResponse, registerHttpRetry, resetAuth, loadUser };

// EXPORT SELECTORS
const selectSelf = (rootState: {auth: AuthState}) => rootState.auth;
export const selectUser = createSelector(selectSelf, state => state.user);
export const selectToken = createSelector(selectSelf, state => state.token);
