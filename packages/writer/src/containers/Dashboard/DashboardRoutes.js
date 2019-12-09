import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: '',
    component: lazy(() =>
      import('@iso/containers/Pages/Pepper/Writer/Assignments/Assignments')
    ),
    exact: true,
  },
  {
    path: 'assignments',
    component: lazy(() =>
      import('@iso/containers/Pages/Pepper/Writer/Assignments/Assignments')
    ),
  },
  {
    path: 'my-profile',
    component: lazy(() =>
      import('@iso/containers/Pages/Pepper/Writer/Profile/Profile')
    ),
  },
  {
    path: 'chat',
    component: lazy(() => import('@iso/containers/Chat/Chat')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
