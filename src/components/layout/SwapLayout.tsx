import { QueryMapping } from '@/hooks';
import { Container, Paper, Link, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export const IndexLayout: React.FC = (props) => {
  return (
    <Container maxWidth="md" sx={{ my: 5, [QueryMapping.mobile]: { my: 3 } }}>
      <Head>
        <title>Plastiks Bridge</title>
      </Head>

      {props.children}

      <Paper sx={{ my: 2, p: 2, textAlign: 'center', fontWeight: 'bold' }}>
        <Link href="/poa">View Proof Of Assets</Link>
        <br />
        <Link href="/help">User Guide</Link>
      </Paper>

      <Typography variant="body2" color="grey.700" align="center">
        The safe, fast and most secure way to bring cross-chain assets to Plastik chains
      </Typography>
    </Container>
  );
};

export const getIndexLayout = (page: any) => <IndexLayout>{page}</IndexLayout>;
