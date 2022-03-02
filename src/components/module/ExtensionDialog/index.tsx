import { Typography, Button, Box, Stack, alpha } from '@mui/material';
import { Warning } from '@/icons';
import { BaseDialog, BaseDialogProps } from '@/components/index';

export interface ExtensionDialogProps extends BaseDialogProps {}

export const ExtensionDialog: React.FC<ExtensionDialogProps> = (props) => (
  <BaseDialog {...props} titleProps={{ align: 'center' }} title="Ooops!">
    <Stack spacing={4}>
      <Box
        sx={{
          bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
          color: 'warning.main',
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: '50%',
        }}>
        <Warning />
      </Box>

      <Typography align="center" sx={{ px: 1 }}>
        {
          "Looks like you don't have the Metamask browser extension installed yet. Head over to the Chrome/Firefox Extension to quickly"
        }
        <br />
        {'install the extension.'}
      </Typography>

      <Button
        onClick={(e: any) => props?.onClose?.(e, 'backdropClick')}
        component="a"
        href="https://metamask.io/download"
        target="_blank"
        fullWidth>
        Install Extension
      </Button>
    </Stack>
  </BaseDialog>
);
