export function Navigation(payload, history) {
  const navigate = {
    pathname: payload.path,
    search: payload.query,
    state: payload.params,
  };
  history.push(navigate);
}
