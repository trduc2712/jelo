export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "MODERATOR" | "CUSTOMER";
  avatarUrl?: string;
  address?: string;
  phone?: string;
}
