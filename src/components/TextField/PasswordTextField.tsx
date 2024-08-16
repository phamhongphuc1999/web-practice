import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

export default function PasswordTextField(props: TextFieldProps) {
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
