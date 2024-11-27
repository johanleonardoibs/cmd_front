import { Layout } from '../../layout';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { useInterceptor } from '../../hooks';
import { Procedure } from '../../types';
import { RemoveRedEye } from '@mui/icons-material';
import { ProcedureForm } from './procedureForm';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Procedimiento',
    flex: 1,
  },
  {
    field: 'cups',
    headerName: 'Código CUPS',
    flex: 1,
  },
  {
    field: 'id',
    headerName: '',
    flex: 0.05,
    renderCell: (params) => {
      console.log(params.value);
      return (
        <IconButton size="small">
          <RemoveRedEye />
        </IconButton>
      );
    },
  },
];

export const Procedures: React.FC = () => {
  const { interceptor } = useInterceptor();
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  const fetchProcedures = useCallback(async () => {
    const { data } = await interceptor<Procedure[]>('GET', '/procedure');
    if (data) {
      setProcedures(data);
    }
  }, [interceptor]);

  useEffect(() => {
    void fetchProcedures();
  }, [fetchProcedures]);

  return (
    <Layout>
      <Box
        sx={{
          width: { xs: '95%', md: '90%', lg: '80%', xl: '75%' },
          marginTop: '3rem',
        }}
      >
        <Box sx={{ marginY: '2rem' }}>
          <ProcedureForm />
        </Box>
        <DataGrid
          disableColumnSorting
          disableColumnResize
          disableColumnMenu
          columns={columns}
          rows={procedures}
          hideFooter
          sx={{
            maxHeight: '450px',
          }}
        />
      </Box>
    </Layout>
  );
};
