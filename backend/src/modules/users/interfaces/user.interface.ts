export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  birthDate?: Date;
  gender: string;
  role: string;
  isActive: boolean;
}
