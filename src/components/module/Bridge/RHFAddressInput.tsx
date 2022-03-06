import { AppInput } from '@/components';
import { RHFAppInputProps } from '@/components/core/AppInput';
import { useAppWeb3 } from '@/hooks';
import { shortenAddress } from '@/utils';
import { InputAdornment } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

export const RHFAddressInput: React.FC<RHFAppInputProps> = ({ controller }) => {
  const { account } = useAppWeb3();

  const [focused, setFocused] = useState(false);
  const onFocus = useCallback(() => setFocused(true), []);

  const {
    field: { name, onChange, value, ref, onBlur },
    fieldState: { invalid, error },
  } = useController(controller);

  const [shorten, setShorten] = useState('');

  const s = Boolean(value);
  useEffect(() => {
    if (s) {
      setShorten(shortenAddress(value, 8, 8));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s]);

  const _onChange = useCallback((e: any) => {
    const address = e.target.value;
    const shorten = shortenAddress(address, 8, 8);

    setShorten(shorten);
    onChange(address);
  }, []);

  const inputProps = {
    helperText: error?.message,
    name,
    onChange: _onChange,
    value: focused ? value : shorten,
    inputRef: ref,
    onFocus,
    onBlur: () => {
      setFocused(false);
      onBlur();
    },
    sx: invalid
      ? { borderColor: (theme: any) => `${theme.palette.error.main} !important` }
      : undefined,
  };

  if (!account) return null;

  return (
    <AppInput
      {...inputProps}
      label="Destination"
      helperText="This is the arrival network address"
      startAdornment={
        <InputAdornment position="start">
          <img src="/assets/metamask.svg" alt="metamask" />
        </InputAdornment>
      }
    />
  );
};
