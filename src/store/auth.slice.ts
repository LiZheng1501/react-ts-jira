import { createSlice } from '@reduxjs/toolkit';
import { User } from 'screens/project-list/search-panel';
import * as auth from 'auth-provider';
import { AuthForm, bootstrapUser } from 'context/auth-context';
import { AppDispatch, RootState } from './index';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;

// 一个thunk是两层函数
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
// 注册
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
// 登出
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
// 初始化user
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user: User) => dispatch(setUser(user)));
