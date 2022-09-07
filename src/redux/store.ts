import { createStore } from "redux";
import { rootReducer, RootState } from "./rootReducer";
import { ACTION } from "./types/actionTypes";

export const store = createStore<RootState, ACTION, {}, {}>(rootReducer);
