import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../../environments/environment";
import { loginReducer, userState } from "./login.reducer";

// 项目中全部的状态
export interface State {
  user: userState;
}

// 全部的reducer函数
export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
