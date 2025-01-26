// utils/syncLocalStorage.js

export const loadState = () => {
  if (typeof window === "undefined") {
    return undefined; // or your initial state if needed
  }
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // or your initial state if needed
    }
    // decrypt
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("err: ", err);
    return undefined; // or your initial state if needed
  }
};

export const saveState = (state) => {
  try {
    if (typeof window === "undefined") {
      return;
    }
    const serializedState = JSON.stringify(state);
    // encrypt here
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log("err: ", err);
    // Handle write errors or ignore
  }
};
