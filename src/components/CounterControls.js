import React from 'react';
import { useCounter } from '../context/CounterContext';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const CounterControls = () => {
    // Get counter functions directly from context
    const { increment, decrement, reset } = useCounter();

    return (
        <div className="counter-controls">
            <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">
                    Counter Controls
                </h3>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={decrement}
                        className="btn btn-secondary flex items-center gap-2"
                        title="Decrement"
                    >
                        <Minus className="h-4 w-4" />
                        Decrease
                    </button>
                    
                    <button
                        onClick={reset}
                        className="btn btn-ghost flex items-center gap-2"
                        title="Reset"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>
                    
                    <button
                        onClick={increment}
                        className="btn btn-primary flex items-center gap-2"
                        title="Increment"
                    >
                        <Plus className="h-4 w-4" />
                        Increase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CounterControls;