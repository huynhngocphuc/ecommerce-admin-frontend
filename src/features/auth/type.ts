export type Role = 'ADMIN' | 'STAFF' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}
