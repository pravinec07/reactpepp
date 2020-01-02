import React from 'react';
import { useHistory } from 'react-router-dom';

export function Navigation(payload) {
  const history = useHistory();

  const navigate = {
    pathname: payload.path,
    search: payload.query,
    state: payload.params,
  };
  history.push(navigate);
}
