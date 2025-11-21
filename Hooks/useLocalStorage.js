import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  //rs: State to store our value
  //rs: Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      //rs: Get from local storage by key
      const item = window.localStorage.getItem(key);
      //rs: Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      //rs: If error also return initialValue
      return initialValue;
    }
  });

  //rs: Return a wrapped version of useState's setter function that ...
  //rs: ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      //rs: Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      //rs: Save state
      setStoredValue(valueToStore);
      //rs: Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      //rs: A more advanced implementation would handle the error case
      // console.log(error);
    }
  };

  return [storedValue, setValue];
}
