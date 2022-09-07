import { ACTION } from "../types/actionTypes";

interface State {
  slots: number;
}

const initialState: State = {
  slots: 0,
};

export const slotsReducer = (state = initialState, action: ACTION) => {
  switch (action.type) {
    case "ADD_SLOTS":
      return {
        slots: action.payload,
      };

    default:
      return state;
  }
};
