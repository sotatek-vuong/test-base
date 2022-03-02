import { AppInput, RHFAppInputProps } from '@/components/core/AppInput';
import { shortenAddress } from '@/utils/helpers';
import { useCallback, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

export const RHFAddressInput: React.FC<RHFAppInputProps> = ({
  controller,
  helperText,
  ...props
}) => {
  const { rules, ...withoutRules } = controller;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);

  const {
    field: { name, onChange, value, ref, onBlur },
    fieldState: { invalid, error },
  } = useController(props?.disabled ? withoutRules : controller);

  const [shorten, setShorten] = useState('');

  const s = Boolean(value);
  useEffect(() => {
    if (s) {
      setShorten(shortenAddress(value, 8, 8));
    }
  }, [s]);

  const _onChange = useCallback((e: any) => {
    const address = e.target.value;
    const shorten = shortenAddress(address, 8, 8);

    setShorten(shorten);
    onChange(address);
  }, []);

  const inputProps = {
    helperText: error?.message ?? helperText,
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

  return <AppInput {...props} {...inputProps} />;
};
