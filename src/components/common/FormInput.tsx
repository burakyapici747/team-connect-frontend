import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, registration, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          {...registration}
          {...props}
          ref={ref}
          className={`
            w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-200
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
); 