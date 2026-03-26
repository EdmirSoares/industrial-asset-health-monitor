const BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'https://api.teste.com/v1').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API ${res.status}: ${path}`);
  }

  return res.json() as Promise<T>;
}
