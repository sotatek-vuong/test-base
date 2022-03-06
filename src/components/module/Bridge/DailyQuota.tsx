import { QueryMapping, useAppWeb3 } from '@/hooks';
import { Typography } from '@mui/material';

export interface DailyQuotaProps {}

export const DailyQuota: React.FC<DailyQuotaProps> = (props) => {
  const { isActive } = useAppWeb3();

  if (!isActive) return null;

  return (
    <Typography
      variant="h4"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
        [QueryMapping.mobile]: {
          flexDirection: 'column',
          mt: 3,
        },
      }}>
      <span>{`Daily quota 65,746.21 USDT per address `}</span>
      <span>{`(0.00 USDT / 65,746.21 USDT)`}</span>
    </Typography>
  );
};
