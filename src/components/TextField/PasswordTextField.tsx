import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface Props {
  props?: TextFieldProps;
}

export default function PasswordTextField({ props }: Props) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <TextField
      {...props}
      type={isPassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setIsPassword(!isPassword)}>
            {isPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  );
}
