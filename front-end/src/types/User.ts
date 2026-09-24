export type User = {
  id: string;
  email: string;
  name: string | null; // Facultatif selon doc API
  createdAt?: string;
  updatedAt?: string;
};
