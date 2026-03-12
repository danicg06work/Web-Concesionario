import type { AuthResponse, CarModel } from './types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'DELETE';
  token?: string;
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let message = `Error ${response.status}`;

    try {
      const errorData = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(errorData.message)) {
        message = errorData.message.join(', ');
      } else if (typeof errorData.message === 'string') {
        message = errorData.message;
      }
    } catch {
      // Ignore parsing errors and keep fallback message.
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function register(payload: { email: string; password: string; name?: string }) {
  return request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export function login(payload: { email: string; password: string }) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export function getCarModels() {
  return request<CarModel[]>('/car-models');
}

export function getFavorites(token: string) {
  return request<CarModel[]>('/favorites', { token });
}

export function addFavorite(token: string, carModelId: number) {
  return request<CarModel[]>(`/favorites/${carModelId}`, {
    method: 'POST',
    token,
  });
}

export function removeFavorite(token: string, carModelId: number) {
  return request<CarModel[]>(`/favorites/${carModelId}`, {
    method: 'DELETE',
    token,
  });
}
