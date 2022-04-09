import React from 'react';

interface ILabelProps {
    forInput: string;
    value: string;
    className?: string;
    children?: React.ReactNode;
}

export default function Label({ forInput, value, className, children } : ILabelProps) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
