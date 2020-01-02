import React from 'react';
import Button from '@iso/components/uielements/button';
import { PUBLIC_ROUTE } from '../../route.constants';

export function LoginButton(props) {
  return (
    <Button
      style={{
        border: '2px solid #096DD9',
        width: 200,
      }}
      onClick={() => props.navigationTo({ path: PUBLIC_ROUTE.SIGN_IN })}
    >
      <p
        style={{
          fontWeight: '600',
          fontSize: '22px',
          textAlign: 'center',
        }}
      >
        Login
      </p>
    </Button>
  );
}
