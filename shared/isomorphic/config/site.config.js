export default {
  siteName: 'Pepper',
  siteIcon: 'ion-flash',
  footerText: `writer @ ${new Date().getFullYear()} Created by RedQ, Inc`,
  enableAnimatedRoute: false,
  apiUrl: 'http://yoursite.com/api/',
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1',
  },
  dashboard: '/dashboard',
  writer: {
    siteName: 'Dashboard',
    siteIcon: 'ion-flash',
    footerText: `writer @ ${new Date().getFullYear()} Created by RedQ, Inc`,
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
