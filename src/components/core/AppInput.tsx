import React, { useCallback } from 'react';
import type { InputBaseProps } from '@mui/material';
import {
  FormControl,
  InputBase,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
} from '@mui/material';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

export interface AppInputProps extends InputBaseProps {
  label?: React.ReactNode;
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
        onChange(e);
      }
    },
    [onChange, pattern],
  );

  const input = (
    <InputBase
      fullWidth
      id={name}
      {...rest}
      onChange={_onChange}
      sx={{
        bgcolor: '#F5F5F5',
        color: 'grey.900',
        p: 1.5,
        borderRadius: '8px',
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
    <FormControl required={required} fullWidth>
      {label && (
        <FormLabel
          focused={false}
          sx={{ mb: 1, fontSize: 18 }}
          color="secondary"
          required={required}
          htmlFor={name}>
          {label}
        </FormLabel>
      )}
      {input}
      {helperText && (
        <FormHelperText
          {...helperTextProps}
          sx={{ color: 'grey.700', fontSize: 16, ml: 0, mt: 1.5, ...helperTextProps?.sx }}
          id={name}>
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

    helperTextProps: {
      error: invalid,
    },
  };

  return <AppInput {...props} {...inputProps} />;
};
