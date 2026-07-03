export const PERMISSIONS = {
  PRODUCT_READ_ADMIN: 'product.read.admin',
  PRODUCT_CREATE: 'product.create',
  PRODUCT_UPDATE: 'product.update',
  PRODUCT_DELETE_SOFT: 'product.delete.soft',
  PRODUCT_DELETE_HARD: 'product.delete.hard',
  USER_READ: 'user.read',
  USER_ROLE_UPDATE: 'user.role.update',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
