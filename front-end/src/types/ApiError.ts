export type ApiError = {
  success: false;
  message: string;
  error: string;
  data?: {
    errors: {
      field: string;
      message: string;
    }[];
  };
};
