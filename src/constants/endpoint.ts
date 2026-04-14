export const ENDPOINTS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    VERIFY_AUTH: '/api/auth/verify',
    LOGOUT: '/api/auth/logout',
    ADMIN_PRODUCTS: '/api/admin/products',
    ADMIN_PRODUCT_BY_ID: (id: string) => `/api/admin/products/${id}`,
    // Add more endpoints as needed
};
