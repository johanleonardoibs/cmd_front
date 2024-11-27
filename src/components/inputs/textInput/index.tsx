import { Control, Controller } from 'react-hook-form';
import { SxProps, TextField } from '@mui/material';

export type InputProps = {
  control: Control<any>;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  sx?: SxProps;
  value?: any;
};

export const TextInput: React.FC<InputProps> = ({
  name,
  control,
  type,
  label,
  placeholder,
  sx,
  value,
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <TextField
            label={label}
            placeholder={placeholder}
            name={name}
            type={type}
            ref={field.ref}
            sx={sx}
            value={value}
            onChange={(e) => {
              field.value = e.target.value;
              field.onChange(e.target.value);
            }}
          />
        );
      }}
      name={name}
      control={control}
    ></Controller>
  );
};
