import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import { loadState, saveState } from "./syncLocalStorage";

export const makeStore = () => {
  // Load the persisted state from localStorage
  const preloadedState = loadState();

  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState, // Initialize the store with the persisted state
  });

  // Set up the store subscription
  store.subscribe(() => {
    // Only save the part of the state you need
    saveState({
      auth: store.getState().auth,
    });
  });

  return store;
};
