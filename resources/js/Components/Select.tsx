import React, { useEffect, useRef } from 'react';

interface ISelectProps {
    name: string;
    id?: string;
    value: string | number;
    className?: string;
    required?: boolean;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    items: {
        value: string | number;
        label: string;
    }[];
}

export default function Select({
    name,
    value,
    id,
    className,
    required = false,
    handleChange,
    placeholder,
    items,
}: ISelectProps): JSX.Element {

    return (
        <select
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                className
            }
            required={required}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
        >
        {items.map(item => 
            <option value={item.value} key={item.value}>{item.label}</option>
        )}
        </select>
    );
}
