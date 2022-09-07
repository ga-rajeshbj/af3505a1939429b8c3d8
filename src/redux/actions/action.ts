import { ACTION } from "../types/actionTypes";

export const addSlots = (slots: number): ACTION => ({
  type: "ADD_SLOTS",
  payload: slots,
});
