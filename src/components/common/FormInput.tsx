import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
  darkMode?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type, placeholder, error, registration, darkMode = false }, ref) => {
    return (
      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-[#B5BAC1]' : 'text-gray-700'}`}>
          {label}
        </label>
        <input
          type={type}
          className={`
            w-full px-3 py-2 
            ${darkMode 
              ? 'bg-[#1E1F22] text-white border-none focus:ring-1 focus:ring-[#5865F2]' 
              : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900'
            }
            rounded-sm
            focus:outline-none focus:ring-1
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-red-500' : ''}
          `}
          placeholder={placeholder}
          {...registration}
        />
        {error && (
          <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput'; 