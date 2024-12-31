import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField, FormHelperText } from '@mui/material';

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
      <div>
        <TextField
          {...registration}
          type={type}
          label={label}
          placeholder={placeholder}
          error={!!error}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: darkMode ? '#1E1F22' : 'background.paper',
              '& fieldset': {
                borderColor: darkMode ? 'transparent' : 'inherit',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#5865F2' : 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#5865F2' : 'primary.main',
              },
            },
            '& .MuiInputLabel-root': {
              color: darkMode ? '#B5BAC1' : 'text.primary',
            },
            '& .MuiOutlinedInput-input': {
              color: darkMode ? 'white' : 'text.primary',
            },
          }}
        />
        {error && (
          <FormHelperText error sx={{ color: darkMode ? '#ef5350' : 'error.main' }}>
            {error}
          </FormHelperText>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput'; 