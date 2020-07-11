import { USER_PERMISSION, CANDIDATE_PERMISSION } from '../services/guards/permissions';

export const navItemsList = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: '/dashboard',
      startOfSection: false
    },
    {
      displayName: 'View Users',
      iconName: 'supervisor_account',
      route: '/users',
      startOfSection: false,
      canView: USER_PERMISSION.read
    },
    {
      displayName: 'View Candidates',
      iconName: 'people_alt',
      route: '/candidates',
      startOfSection: false,
      canView: CANDIDATE_PERMISSION.read
    },
    {
      displayName: 'Edit Profile',
      iconName: 'edit',
      route: '/profile/edit',
      startOfSection: true
    },
    {
      displayName: 'Change Password',
      iconName: 'vpn_key',
      route: '/change-password',
      startOfSection: false
    }
];