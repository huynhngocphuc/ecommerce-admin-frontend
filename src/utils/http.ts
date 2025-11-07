import { ApiResponse } from "@/types/api.types";

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const http = {
  get: async (url: string): Promise<ApiResponse> => {
    const response = await fetch(`${BASE_URL}${url}`, { credentials: 'include' });
    return response.json();
  },
  post: async (url: string, data: any): Promise<ApiResponse> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async (url: string, data: any): Promise<ApiResponse> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (url: string): Promise<ApiResponse> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};