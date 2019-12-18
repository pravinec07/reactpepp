const options = [
  {
    key: 'my-profile',
    label: 'sidebar.profile',
    leftIcon: 'ion-person',
  },
  {
    key: 'assignments',
    label: 'Assignments',
    leftIcon: 'ion-person',
  },
  {
    key: 'project',
    label: 'Project',
    leftIcon: 'ion-android-checkbox-outline',
  },
  {
    key: 'payment',
    label: 'Payment',
    leftIcon: 'ion-clipboard',
  },
  {
    key: 'feedback',
    label: 'sidebar.feedback',
    leftIcon: 'ion-thumbsup',
    children: [
      {
        key: 'alert',
        label: 'sidebar.alert',
      },
      {
        key: 'modal',
        label: 'sidebar.modal',
      },
      {
        key: 'message',
        label: 'sidebar.message',
      },
      {
        key: 'notification',
        label: 'sidebar.notification',
      },
      {
        key: 'popConfirm',
        label: 'sidebar.popConfirm',
      },
      {
        key: 'spin',
        label: 'sidebar.spin',
      },
    ],
  },
  {
    key: 'youtubeSearch',
    label: 'Chat',
    leftIcon: 'ion-social-youtube',
  },
];
export default options;
