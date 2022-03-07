import { Link } from '@/components';
import { Button, Container, Typography } from '@mui/material';
import { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <img src="/assets/404.svg" alt="404" />

      <Typography
        variant="h4"
        sx={{
          mt: 5,
          mb: 3,
        }}>
        Sorry! The page you’re looking for cannot be found.
      </Typography>

      <Button component={Link} href="/" sx={{ width: 360 }}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default Custom404;
