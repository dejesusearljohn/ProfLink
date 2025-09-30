import React from 'react';
import { useCounter } from '../context/CounterContext';

const CounterDisplay = () => {
    // Get counter value directly from context - no props needed!
    const { count } = useCounter();

    return (
        <div className="counter-display">
            <div className="card p-6 text-center max-w-sm mx-auto">
                <h2 className="text-xl font-semibold mb-6 text-primary">
                    Counter Display
                </h2>
                <div className="text-5xl font-bold text-primary mb-6 py-4">
                    {count}
                </div>
                <p className="text-sm text-muted-foreground">
                    Value from Context API
                </p>
            </div>
        </div>
    );
};

export default CounterDisplay;