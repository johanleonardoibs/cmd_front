import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { DynamicFormBuilder, TextInput } from '../../../components';
import { useForm } from 'react-hook-form';
import { NumericInput } from '../../../components/inputs/numericInput';

export const ProcedureForm: React.FC = () => {
  const methods = useForm();

  return (
    <Accordion>
      <AccordionSummary sx={{ background: '#f8f8f8' }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Crear procedimiento medico
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <TextInput
            label={'Nombre del procedimiento'}
            control={methods.control}
            name={'name'}
            sx={{
              width: '60%',
            }}
          ></TextInput>

          <TextInput
            label={'Código CUPS'}
            control={methods.control}
            name={'cups'}
            sx={{
              width: '35%',
            }}
          ></TextInput>

          <NumericInput
            label={'Duración estimada de la sesión'}
            control={methods.control}
            name={'session_duration'}
            suffix={'Mins'}
            sx={{
              flexGrow: '1',
            }}
            width={'25%'}
          />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <DynamicFormBuilder />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
