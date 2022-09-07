import { combineReducers } from "redux";
import { slotsReducer } from "./reducer/reducer";

export const rootReducer = combineReducers({ slotsReducer });

export type RootState = ReturnType<typeof rootReducer>;
