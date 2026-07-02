import { ENDPOINTS } from '../../../constants/endpoint';
export const login = async (username: string, password: string) => {
    // Call API to log in
    const response = await fetch(`${import.meta.env.VITE_API_URL}${ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
        },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
};