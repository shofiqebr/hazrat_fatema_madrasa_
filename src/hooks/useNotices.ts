import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';


export interface Notice {
  _id: string;
  title: string;
  description: string;
  date: string;
  audience: string;
  postedBy: string;
  isPublished: boolean;
}

type NoticeResponse = {
  success: boolean;
  message: string;
  data: Notice[];
};

const fetchNotices = async (): Promise<Notice[]> => {
  const res = await axiosInstance.get<NoticeResponse>('/notice');
  return res.data.data; // 👈 Return the array directly
};

export const useNotices = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  });
};
