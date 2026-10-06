export type AdminAccount = {
  id: string
  name: string
  email: string
  roleId: string
  status: 'Active' | 'Inactive'
}
export type AdminRole = { id: string; name: string; permissionIds: string[] }
export type AdminPermission = {
  id: string
  label: string
  description: string
  required?: boolean
  requires?: string
}
export const teamPermissions: AdminPermission[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'View operational statistics.',
    required: true,
  },
  {
    id: 'users',
    label: 'Users',
    description: 'View profiles and lock or unlock accounts.',
  },
  {
    id: 'provider-verification',
    label: 'Provider Verification',
    description: 'Review, approve or reject provider profiles.',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    description: 'View basic booking information and status.',
  },
  {
    id: 'booking-details',
    label: 'Booking Details & History',
    description: 'View booking addresses, private notes, reasons and history.',
    requires: 'appointments',
  },
  {
    id: 'no-show',
    label: 'No-Show Cases',
    description: 'View case evidence and record a decision.',
  },
  {
    id: 'complaints',
    label: 'Complaints',
    description: 'Review complaints, add notes and close cases.',
  },
  {
    id: 'reports',
    label: 'Reports',
    description: 'View evidence and handle reported content or accounts.',
  },
  {
    id: 'chat-evidence',
    label: 'Chat Evidence',
    description: 'Read booking conversations and their evidence.',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    description: 'View and moderate customer reviews.',
  },
  {
    id: 'regions',
    label: 'Regions',
    description: 'Create, edit, reorder and deactivate regions.',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Compose, send, schedule and view notifications.',
  },
  {
    id: 'banners',
    label: 'Banners',
    description: 'Create, edit, hide and delete banners.',
  },
  {
    id: 'audit',
    label: 'Audit Log',
    description: 'Read activity history and event details.',
  },
  {
    id: 'app-config',
    label: 'App Update',
    description: 'Edit app update settings and release information.',
  },
  {
    id: 'deletion-requests',
    label: 'Deletion Requests',
    description: 'Review account deletion requests under the approved policy.',
  },
]
export function createTeamDemo(): {
  accounts: AdminAccount[]
  roles: AdminRole[]
} {
  return {
    accounts: [
      {
        id: 'admin-owner',
        name: 'Ava Morgan',
        email: 'admin@rocket.demo',
        roleId: 'owner',
        status: 'Active',
      },
    ],
    roles: [
      {
        id: 'owner',
        name: 'Owner',
        permissionIds: teamPermissions.map((p) => p.id),
      },
      {
        id: 'operator',
        name: 'Operator',
        permissionIds: [
          'dashboard',
          'users',
          'provider-verification',
          'appointments',
          'booking-details',
          'no-show',
          'complaints',
          'reports',
          'chat-evidence',
          'reviews',
          'regions',
          'notifications',
          'banners',
          'deletion-requests',
        ],
      },
      {
        id: 'viewer',
        name: 'Viewer',
        permissionIds: ['dashboard', 'appointments'],
      },
    ],
  }
}

export function normalizePermissions(ids: string[]) {
  return teamPermissions
    .filter(
      (p) =>
        (p.required || ids.includes(p.id)) &&
        (!p.requires || ids.includes(p.requires)),
    )
    .map((p) => p.id)
}
