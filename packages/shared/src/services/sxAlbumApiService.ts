import { API_BASE_URL } from '@shared-src/lib/constants';

import type { IAlbum } from '@shared-src/lib/interfaces';

export interface ApiConfig {
  baseUrl?: string;
  getAuthHeaders?: () => Promise<Record<string, string>>;
}

export class AlbumApiService {
  private baseUrl: string;
  private getAuthHeaders?: () => Promise<Record<string, string>>;

  constructor(config: ApiConfig = {}) {
    this.baseUrl = config.baseUrl || API_BASE_URL;
    this.getAuthHeaders = config.getAuthHeaders;
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const baseHeaders = {
      'Content-Type': 'application/json',
    };

    if (this.getAuthHeaders) {
      try {
        const authHeaders = await this.getAuthHeaders();
        return { ...baseHeaders, ...authHeaders };
      } catch (error) {
        console.error('Failed to get auth headers:', error);
        return baseHeaders;
      }
    }

    return baseHeaders;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers = await this.getHeaders();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;

      try {
        const errorData: unknown = await response.json();
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'error' in errorData &&
          typeof (errorData as { error?: unknown }).error === 'string'
        ) {
          errorMessage = (errorData as { error: string }).error;
        }
      } catch {
        // Use default error message if response is not JSON
      }

      throw new Error(errorMessage);
    }

    // Handle empty responses (like DELETE operations)
    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  // Public endpoints (no auth required)
  async getPublicAlbums(): Promise<IAlbum[]> {
    return this.request<IAlbum[]>('/albums/public');
  }

  async getPublicAlbum(id: string): Promise<IAlbum> {
    return this.request<IAlbum>(`/albums/public/${id}`);
  }

  // Authenticated endpoints (auth required)
  async getUserAlbums(): Promise<IAlbum[]> {
    return this.request<IAlbum[]>('/albums');
  }

  async getAllAlbums(): Promise<IAlbum[]> {
    return this.request<IAlbum[]>('/albums/all');
  }

  async getAlbum(id: string): Promise<IAlbum> {
    return this.request<IAlbum>(`/albums/${id}`);
  }

  async createAlbum(albumData: Partial<IAlbum>): Promise<IAlbum> {
    return this.request<IAlbum>('/albums/create', {
      body: JSON.stringify(albumData),
      method: 'POST',
    });
  }

  async updateAlbum(id: string, albumData: Partial<IAlbum>): Promise<IAlbum> {
    return this.request<IAlbum>(`/albums/${id}`, {
      body: JSON.stringify(albumData),
      method: 'PUT',
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.request<void>(`/albums/${id}`, {
      method: 'DELETE',
    });
  }
}
