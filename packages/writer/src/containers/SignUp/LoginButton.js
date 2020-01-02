import React from 'react';
import Button from '@iso/components/uielements/button';
import { PUBLIC_ROUTE } from '../../route.constants';

export function LoginButton(props) {
  return (
    <Button onClick={() => props.navigationTo({ path: PUBLIC_ROUTE.SIGN_IN })}>
      <p
        style={{
          fontWeight: '600',
          fontSize: '22px',
          textAlign: 'center',
          margin: '20px 50px ',
          border: '2px solid #096DD9',
          padding: '8px 11px',
        }}
      >
        Login
      </p>
    </Button>
  );
}
