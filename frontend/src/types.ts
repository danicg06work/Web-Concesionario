export interface User {
  id: number;
  email: string;
  name: string | null;
}

export interface CarModel {
  id: number;
  name: string;
  category: string;
  powerLabel: string | null;
  powerHp: number | null;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
