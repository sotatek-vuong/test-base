import { Box } from '@mui/material';
import React from 'react';

export const IndexLayout: React.FC = (props) => {
  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
      }}>
      {props.children}
    </Box>
  );
};

export const getIndexLayout = (page: any) => <IndexLayout>{page}</IndexLayout>;
