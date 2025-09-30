import React from 'react';
import { CounterProvider } from '../context/CounterContext';
import CounterDisplay from './CounterDisplay';
import CounterControls from './CounterControls';

const Counter = () => {
    return (
        <CounterProvider>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                        Context API Counter Demo
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        This demonstrates using React Context API to eliminate prop drilling. 
                        The CounterDisplay component gets its value directly from context, 
                        not through props.
                    </p>
                </div>

                {/* Counter Display - Gets value from Context, not props */}
                <div className="flex justify-center">
                    <CounterDisplay />
                </div>

                {/* Counter Controls - Also uses Context */}
                <div className="flex justify-center">
                    <CounterControls />
                </div>
            </div>
        </CounterProvider>
    );
};

export default Counter;