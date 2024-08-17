export interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  email: string;
  name: string;
  avatar: string;
  role: ROLE_ENUM;
}

export enum ROLE_ENUM {
  ADMIN = "ADMIN",
  USER = "USER",
}
