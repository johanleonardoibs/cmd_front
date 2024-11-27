import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { SelectInput } from '../inputs/selectInput';
import { useForm } from 'react-hook-form';
import { TextInput } from '../inputs';
import { useState } from 'react';
import { Close } from '@mui/icons-material';

const fieldTypes = [
  {
    label: 'Texto',
    value: 'text',
  },
  {
    label: 'Numérico',
    value: 'number',
  },
  {
    label: 'Archivo',
    value: 'file',
  },
  {
    label: 'Fecha',
    value: 'date',
  },
];

export type DynamicField = { description: string; name: string; type: string };

export const DynamicFormBuilder = () => {
  const methods = useForm<DynamicField>();

  const [fields, setFields] = useState<DynamicField[]>([]);

  const submit = (data: DynamicField) => {
    setFields((current) => {
      return [...current, data];
    });
    methods.reset();
  };

  const onItemDelete = (field: DynamicField) => {
    setFields((current) =>
      current.filter(
        (currentItem) =>
          currentItem.name !== field.name &&
          currentItem.description !== field.description &&
          currentItem.type !== field.type
      )
    );
  };

  return (
    <Box>
      <Paper sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, width: '60%' }}>
            <TextInput
              label={'Nombre del campo'}
              control={methods.control}
              name={'name'}
              sx={{
                width: '40%',
              }}
            ></TextInput>

            <TextInput
              label={'Descripción'}
              control={methods.control}
              name={'description'}
              sx={{
                width: '60%',
              }}
            ></TextInput>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, width: '35%' }}>
            <SelectInput
              control={methods.control}
              name={'type'}
              options={fieldTypes}
              sx={{
                flexGrow: 1,
              }}
            />
            <Button variant="contained" onClick={methods.handleSubmit(submit)}>
              Añadir campo
            </Button>
          </Box>
        </Box>
      </Paper>
      {fields.length > 0 && (
        <Box sx={{ padding: '1rem 3rem' }}>
          <Box
            sx={{
              display: 'flex',
              gap: 6,
              'p.MuiTypography-root.MuiTypography-body1': {
                width: '150px',
                fontWeight: 'bold',
              },
            }}
          >
            <Typography>Nombre</Typography>
            <Typography>Descripción</Typography>
            <Typography>Tipo</Typography>
          </Box>
          <Box
            sx={{
              maxHeight: '100px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: '1rem',
            }}
          >
            {fields.map((field) => (
              <Paper sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    'p.MuiTypography-root.MuiTypography-body1': {
                      width: '150px',
                      marginLeft: '3px',
                    },
                  }}
                >
                  <Typography>{field.name}</Typography>
                  <Typography>{field.description}</Typography>
                  <Typography>{field.type}</Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => onItemDelete(field)}>
                    <Close sx={{ color: 'orangered' }} />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
