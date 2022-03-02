import { Close } from '@/icons';
import {
  Dialog,
  DialogProps,
  Typography,
  IconButton,
  IconButtonProps,
  TypographyProps,
} from '@mui/material';

export interface BaseDialogProps extends DialogProps {
  showCloseIcon?: boolean;
  closeIconProps?: IconButtonProps;
  title?: string;
  titleProps?: TypographyProps;
}

export const BaseDialog: React.FC<BaseDialogProps> = ({
  showCloseIcon = true,
  closeIconProps,
  children,
  PaperProps,
  title,
  titleProps,
  ...props
}) => {
  return (
    <Dialog
      scroll="body"
      maxWidth="sm"
      fullWidth
      {...props}
      PaperProps={{
        ...PaperProps,
        sx: {
          py: 3.75,
          px: 3,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          ...PaperProps?.sx,
        },
      }}>
      {showCloseIcon && (
        <IconButton
          color="primary"
          {...closeIconProps}
          sx={{
            ...closeIconProps?.sx,
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'grey.700',
          }}
          onClick={(e) => {
            props.onClose?.(e, 'escapeKeyDown');
            closeIconProps?.onClick?.(e);
          }}>
          <Close />
        </IconButton>
      )}
      {title && (
        <Typography
          variant="h4"
          color="primary"
          {...titleProps}
          sx={{ px: 4, pb: 4, ...titleProps?.sx }}>
          {title}
        </Typography>
      )}
      {children}
    </Dialog>
  );
};
