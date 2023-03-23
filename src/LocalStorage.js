import { useState } from "react";

const LocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        // Get stored value if available in the browser
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });
    // Set the new value in localStorage when it changes
    window.localStorage.setItem(key, JSON.stringify(value));

    return [value, setValue];
};

export default LocalStorage;
