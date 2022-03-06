import React, { useCallback } from 'react';
import type { FormLabelProps, InputBaseProps } from '@mui/material';
import {
  FormControl,
  InputBase,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
} from '@mui/material';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { QueryMapping } from '@/hooks';

export interface AppInputProps extends InputBaseProps {
  label?: React.ReactNode;
  FormLabelProps?: FormLabelProps;
  required?: boolean;
  helperText?: any;
  helperTextProps?: FormHelperTextProps;
  pattern?: RegExp;
}

export const AppInput: React.FC<AppInputProps> = (props) => {
  const {
    label,
    required,
    children,
    name,
    helperText,
    helperTextProps,
    onChange,
    pattern,
    FormLabelProps,
    fullWidth = true,
    error,
    ...rest
  } = props;

  const _onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (!onChange) return undefined;

      if (!pattern) {
        return onChange(e);
      }

      const ok = pattern.test(e.target.value);
      if (ok) {
        return onChange(e);
      }
      return;
    },
    [onChange, pattern],
  );

  const input = (
    <InputBase
      {...rest}
      onChange={_onChange}
      sx={{
        bgcolor: '#F5F5F5',
        color: 'grey.900',
        p: 1.5,
        borderRadius: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        '&:hover, &:focus-within': {
          borderColor: 'secondary.main',
        },
        '& input::placeholder': {
          color: '#BDBDBD',
          opacity: 0.6,
        },
        ...rest.sx,
      }}
    />
  );

  return (
    <FormControl fullWidth={fullWidth} error={error} required={required}>
      {label && (
        <FormLabel
          color="secondary"
          sx={{
            mb: 1,
            fontSize: 18,
            [QueryMapping.mobile]: {
              mb: 0.25,
            },
            ...FormLabelProps?.sx,
          }}
          {...FormLabelProps}>
          {label}
        </FormLabel>
      )}
      {input}
      {helperText && (
        <FormHelperText
          component="div"
          {...helperTextProps}
          sx={{ color: 'grey.700', fontSize: 16, ml: 0, mt: 1.5, ...helperTextProps?.sx }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export interface RHFAppInputProps extends AppInputProps {
  controller: UseControllerProps<Record<string, any> | any>;
}

export const RHFAppInput: React.FC<RHFAppInputProps> = ({ controller, helperText, ...props }) => {
  const { rules, ...withoutRules } = controller;

  const {
    field: { name, onChange, value, ref, onBlur },
    fieldState: { invalid, error },
  } = useController(props?.disabled ? withoutRules : controller);

  const inputProps = {
    helperText: error?.message ?? helperText,
    name,
    onChange,
    value,
    inputRef: ref,
    onBlur,
    sx: invalid
      ? { borderColor: (theme: any) => `${theme.palette.error.main} !important` }
      : undefined,
    error: invalid,
  };

  return <AppInput {...props} {...inputProps} />;
};
