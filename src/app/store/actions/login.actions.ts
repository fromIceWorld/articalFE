import { createAction, props } from '@ngrx/store';
export interface UserInfo {
  avatar: string;
  name: string;
  id: string;
  type: string;
  isLogin: boolean;
}

const login = createAction('[login]', props<{ user: UserInfo }>()),
  loginOut = createAction('[login Out]', props<{ user: UserInfo }>());
export { login, loginOut };
