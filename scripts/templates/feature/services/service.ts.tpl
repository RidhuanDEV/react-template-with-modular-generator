import { apiClient } from '@/lib/apiClient';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';
import type { {{pascalCase}} } from '../types/{{kebabCase}}.types';
import { buildPaginationQueryString } from '@/utils/pagination';

export const {{camelCase}}Service = {
  list: async (params: PaginationParams): Promise<PaginatedResponse<{{pascalCase}}>> => {
    const qs = buildPaginationQueryString(params);
    const response = await apiClient.get<PaginatedResponse<{{pascalCase}}>>(`/{{kebabCase}}s?${qs}`);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<{{pascalCase}}>> => {
    const response = await apiClient.get<ApiResponse<{{pascalCase}}>>(`/{{kebabCase}}s/${encodeURIComponent(id)}`);
    return response.data;
  },
};
