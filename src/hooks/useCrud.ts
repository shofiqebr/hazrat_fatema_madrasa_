// hooks/useCrud.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';


export function useCrudList<T>(endpoint: string, queryKey: string[]) {
  return useQuery<T[]>({
    queryKey,
    queryFn: async () => {
      const res = await axiosInstance.get(endpoint);
      return res.data.data; // assumes { data: [...] }
    },
  });
}

export function useCrudSingle<T>(endpoint: string, id: string, queryKeyPrefix: string) {
  return useQuery<T>({
    queryKey: [queryKeyPrefix, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`${endpoint}/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCrudCreate<TInput, TOutput = any>(endpoint: string, queryKey: string[]) {
  const queryClient = useQueryClient();
  return useMutation<TOutput, unknown, TInput>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(endpoint, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useCrudUpdate<TInput, TOutput = any>(endpoint: string, queryKey: string[]) {
  const queryClient = useQueryClient();
  return useMutation<TOutput, unknown, { id: string; data: TInput }>({
    mutationFn: async ({ id, data }) => {
      const res = await axiosInstance.patch(`${endpoint}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useCrudDelete(endpoint: string, queryKey: string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`${endpoint}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
