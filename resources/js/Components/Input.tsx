import React, { useEffect, useRef } from 'react';

interface IInputProps {
    type: string;
    name: string;
    id?: string;
    value: string;
    className?: string;
    autoComplete?: string;
    required?: boolean;
    isFocused?: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    type = 'text',
    name,
    value,
    id,
    className,
    autoComplete,
    required = false,
    isFocused = false,
    handleChange,
}: IInputProps): JSX.Element {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && input.current) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
