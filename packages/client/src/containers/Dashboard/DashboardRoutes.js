import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: 'completeProfile',
    component: lazy(() => import('../Profile/CompleteProfile')),
    exact: true,
  },
  {
    path: 'profileVerify',
    component: lazy(() => import('../Profile/ProfileVerify')),
    exact: true,
  },
  {
    path: 'assignments',
    component: lazy(() => import('../Assignments/Assignments')),
  },
  {
    path: 'my-profile',
    component: lazy(() => import('../Profile/Profile')),
  },
  {
    path: 'profileUserEdit',
    component: lazy(() => import('../Profile/ProfileUserEdit')),
  },
  {
    path: 'manage-password',
    component: lazy(() => import('../Profile/ManagePassword')),
  },
  {
    path: 'chat',
    component: lazy(() => import('@iso/containers/Chat/Chat')),
  },
  {
    path: 'project',
    component: lazy(() => import('../Project/Project')),
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
