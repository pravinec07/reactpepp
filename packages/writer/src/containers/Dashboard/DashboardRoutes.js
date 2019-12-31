import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: 'completeProfile',
    component: lazy(() => import('../Profile/Profile')),
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
    path: 'my-assignments',
    component: lazy(() => import('../MyAssignments/Assignments')),
  },
  {
    path: 'my-profile',
    component: lazy(() => import('../Profile/UpdateProfile')),
  },
  {
    path: 'manage-password',
    component: lazy(() => import('../Profile/ManagePassword')),
  },
  {
    path: 'profileUser',
    component: lazy(() => import('../Profile/ProfileUser')),
  },
  {
    path: 'profileUserEdit',
    component: lazy(() => import('../Profile/ProfileUserEdit')),
  },
  {
    path: 'chat',
    component: lazy(() => import('@iso/containers/Chat/Chat')),
  },
  {
    path: 'invoice/:invoiceId',
    component: lazy(() => import('@iso/containers/Invoice/SingleInvoice')),
  },
  {
    path: 'invoice',
    component: lazy(() => import('@iso/containers/Invoice/Invoices')),
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
