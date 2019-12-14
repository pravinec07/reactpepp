export default {
  siteName: 'Pepper',
  siteIcon: 'ion-flash',
  footerText: `Pepper @ ${new Date().getFullYear()} Created by RedQ, Inc`,
  enableAnimatedRoute: false,
  apiUrl: 'http://yoursite.com/api/',
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1',
  },
  dashboard: '/dashboard',
  writer: {
    siteName: 'Dashboard',
    siteIcon: 'ion-flash',
    footerText: `Pepper @ ${new Date().getFullYear()}, All rights reserved.`,
    enableAnimatedRoute: false,
    apiUrl: 'http://yoursite.com/api/',
    google: {
      analyticsKey: 'UA-xxxxxxxxx-1',
    },
    dashboard: '/dashboard',
  },
  panelType: {
    writer: 'writer',
    editor: 'editor',
    allotment: 'allotment',
    client: 'client',
  },
};
