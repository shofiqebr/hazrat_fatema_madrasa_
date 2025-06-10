import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';


export const useNotice = (id: string) => {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/notice/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
