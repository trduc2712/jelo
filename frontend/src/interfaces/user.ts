export type Role = 'ADMIN' | 'MODERATOR' | 'CUSTOMER';

export type Gender = 'MALE' | 'FEMALE';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';

export interface User {
  readonly id: number;
  email: string;
  name: string;
  password: string;
  gender: Gender;
  role: Role;
  avatarUrl?: string;
  address?: string;
  phone?: string;
  dateOfBirth?: Date;
  status: UserStatus;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserForm extends Omit<User, 'avatarUrl'> {
  avatar?: File | null;
}
