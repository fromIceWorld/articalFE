import { Action, createReducer, on } from '@ngrx/store';
import { UserInfo } from './../actions';
import { login, loginOut } from './../actions/login.actions';

// 定义初始化值的类型
export interface userState {
  userInfo: UserInfo;
}

const cache = JSON.parse(localStorage.getItem('user'));

export const initState: userState = {
  userInfo: Object.assign(
    {
      name: '',
      id: '',
      type: '',
      isLogin: false,
    },
    cache
  ),
};

const reducer = createReducer(
  initState,
  on(login, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { userInfo: { ...state.userInfo, ...user } };
  }),
  on(loginOut, (state, { user }) => {
    return { userInfo: { ...state.userInfo, ...user } };
  })
);

export function loginReducer(state: userState, action: Action) {
  return reducer(state, action);
}
