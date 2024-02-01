export interface UserState {
    data: User | null;
    isLoggedIn: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confPassword: string;
}

export interface UserResponse {
  data: User;
  token: string;
}
