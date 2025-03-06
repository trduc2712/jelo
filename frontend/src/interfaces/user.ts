export interface User {
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "MODERATOR" | "CUSTOMER";
  avatarUrl?: string;
  address?: string;
  phone?: string;
}
