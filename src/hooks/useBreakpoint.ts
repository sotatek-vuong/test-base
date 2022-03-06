import { useMediaQuery } from '@mui/material';
import { theme } from '@/utils';

type DeviceSlugs = 'mobile' | 'desktop';

export const QueryMapping = {
  desktop: theme.breakpoints.up('md'),
  mobile: theme.breakpoints.down('md'),
};

export const useBreakpoint = (device: DeviceSlugs) => {
  const isTheDevice = useMediaQuery(QueryMapping[device]);

  return isTheDevice;
};
