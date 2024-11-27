import { Control, Controller } from 'react-hook-form';
import { MenuItem, Select, SxProps } from '@mui/material';

type SelectInputProps = {
  name: string;
  control: Control<any>;
  options: { label: string; value: string | number }[];
  label?: string;
  placeholder?: string;
  sx?: SxProps;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  control,
  name,
  options,
  label,
  placeholder,
  sx,
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <Select
            label={label}
            placeholder={placeholder}
            sx={{
              minWidth: '150px',
              ...sx,
            }}
            onChange={(event) => {
              field.value = event.target.value;
              field.onChange(event.target.value);
            }}
          >
            {options.map((option) => {
              return <MenuItem value={option.value}>{option.label}</MenuItem>;
            })}
          </Select>
        );
      }}
      name={name}
      control={control}
    />
  );
};
