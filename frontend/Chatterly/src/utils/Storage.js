import React, { useState, useEffect } from "react";

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return getLocalStorage(key);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
  return getLocalStorage(key);
}

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key);
  });
  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);
  return [value, setValue];
}
