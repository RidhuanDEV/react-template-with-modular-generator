import { useQuery } from '@tanstack/react-query';
import type { ApiError, ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';
import { {{camelCase}}Service } from '../services/{{kebabCase}}.service';
import type { {{pascalCase}} } from '../types/{{kebabCase}}.types';

const {{camelCase}}QueryKey = ['{{kebabCase}}s'] as const;

export const use{{pascalCase}}s = (params: PaginationParams) => {
  return useQuery<PaginatedResponse<{{pascalCase}}>, ApiError>({
    queryKey: [...{{camelCase}}QueryKey, params],
    queryFn: () => {{camelCase}}Service.list(params),
  });
};

export const use{{pascalCase}} = (id: string) => {
  return useQuery<ApiResponse<{{pascalCase}}>, ApiError>({
    queryKey: [...{{camelCase}}QueryKey, id],
    queryFn: () => {{camelCase}}Service.getById(id),
    enabled: !!id,
  });
};
