export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: string[] | any;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;