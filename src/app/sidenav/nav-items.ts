import { USER_PERMISSION, CANDIDATE_PERMISSION } from '../services/guards/permissions';

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
      canView: USER_PERMISSION.read
    },
    {
      displayName: 'View Candidates',
      iconName: 'people_alt',
      route: '/candidates',
      endOfSection: false,
      canView: CANDIDATE_PERMISSION.read
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