export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "MODERATOR" | "CUSTOMER";
  avatarUrl?: string;
  address?: string;
  phone?: string;
  status?: "ACTIVE" | "BANNED";
}

export interface UserForm extends Omit<User, "avatarUrl"> {
  avatar?: File;
}
