import React, { createContext, useContext, useState } from 'react';

// Create the Counter Context
const CounterContext = createContext();

// Custom hook to use the Counter Context
export const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error('useCounter must be used within a CounterProvider');
    }
    return context;
};

// Counter Provider Component
export const CounterProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    const reset = () => {
        setCount(0);
    };

    const value = {
        count,
        increment,
        decrement,
        reset
    };

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;