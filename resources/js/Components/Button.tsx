import React from 'react';

interface Props {
    type?: "button" | "submit" | "reset" | undefined; 
    className?: string; 
    processing?: boolean; 
    children: any;
}

const Button: React.FC<Props> = ({ type = "button", className = '', processing = false, children }) => {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}

export default Button;
