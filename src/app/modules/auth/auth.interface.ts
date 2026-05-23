export type TUserRole = "contributor" | "maintainer";

export interface ISignupUser {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  created_at: Date;
  updated_at: Date;
}

export interface ILoginResponse {
  token: string;
  user: IUserResponse;
}