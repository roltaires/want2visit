import React, { useEffect, useRef } from 'react';

interface IInputProps {
    name: string;
    id?: string;
    value: string;
    className?: string;
    autoComplete?: string;
    required?: boolean;
    isFocused?: boolean;
    rows?: number;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Input({
    name,
    value,
    id,
    className,
    autoComplete,
    required = false,
    isFocused = false,
    rows = 3,
    handleChange,
}: IInputProps): JSX.Element {
    const input = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isFocused && input.current) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <textarea
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
                rows={rows}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
