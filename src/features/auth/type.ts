export type Role = 'user' | 'admin' | 'superadmin';

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
