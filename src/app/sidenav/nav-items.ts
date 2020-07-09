export const navItemsList = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: '/dashboard',
      endOfSection: false
    },
    {
      displayName: 'View Users',
      iconName: 'supervisor_account',
      route: '/users',
      endOfSection: false,
      canView: ['Root', 'Admin', 'OPS']
    },
    {
      displayName: 'View Candidates',
      iconName: 'people_alt',
      route: '/candidates',
      endOfSection: false
    },
    {
      displayName: 'View Interviews',
      iconName: 'event_note',
      route: '/interviews',
      endOfSection: true
    },
    {
      displayName: 'Edit Profile',
      iconName: 'edit',
      route: '/profile/edit',
      endOfSection: false
    },
    {
      displayName: 'Change Password',
      iconName: 'vpn_key',
      route: '/change-password',
      endOfSection: true
    }
];