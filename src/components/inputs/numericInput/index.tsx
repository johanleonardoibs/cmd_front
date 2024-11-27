import { Control, Controller } from 'react-hook-form';
import { Box, SxProps, TextField, Typography } from '@mui/material';

export type InputProps = {
  control: Control<any>;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  suffix?: string;
  sx?: SxProps;
  width?: string;
};

export const NumericInput: React.FC<InputProps> = ({
  name,
  control,
  label,
  placeholder,
  suffix,
  sx,
  width,
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <Box
            sx={{
              width: width ?? '100%',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid lightgrey',
              borderRadius: '5px',
            }}
          >
            <TextField
              label={label}
              placeholder={placeholder}
              name={name}
              type="number"
              ref={field.ref}
              sx={sx}
              onChange={(e) => {
                field.value = e.target.value;
                field.onChange(e.target.value);
              }}
            />
            <Typography sx={{ paddingX: '20px' }}>{suffix}</Typography>
          </Box>
        );
      }}
      name={name}
      control={control}
    ></Controller>
  );
};
