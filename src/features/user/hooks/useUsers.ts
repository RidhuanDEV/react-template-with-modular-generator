import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";
import type {
  ApiError,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api.types";
import { userService } from "../services/user.service";
import type { User } from "../types/user.types";
import type { CreateUserRequest, UpdateUserRequest } from "../types/user.types";

export const useUsers = (params: PaginationParams) => {
  return useQuery<PaginatedResponse<User>, ApiError>({
    queryKey: [...QUERY_KEYS.USERS.LIST, params],
    queryFn: () => userService.list(params),
  });
};

export const useUser = (id: string) => {
  return useQuery<ApiResponse<User>, ApiError>({
    queryKey: QUERY_KEYS.USERS.DETAIL(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<User>, ApiError, CreateUserRequest>({
    mutationFn: (data: CreateUserRequest) => userService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<User>,
    ApiError,
    { id: string; data: UpdateUserRequest }
  >({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userService.update(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
    },
  });
};
