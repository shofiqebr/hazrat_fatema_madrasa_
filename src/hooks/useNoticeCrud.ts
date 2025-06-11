// hooks/useNoticeCrud.ts
import {
  useCrudList,
  useCrudSingle,
  useCrudCreate,
  useCrudUpdate,
  useCrudDelete,
} from './useCrud';

export interface Notice {
  _id: string;
  title: string;
  description: string;
  date: string;
  audience: string;
  postedBy: string;
  isPublished: boolean;
}

// type NoticeResponse = {
//   success: boolean;
//   message: string;
//   data: Notice[];
// };
// import type { Notice } from '@/types/notice';

const ENDPOINT = '/notice';
const QUERY_KEY = ['notices'];

export const useNotices = () => useCrudList<Notice>(ENDPOINT, QUERY_KEY);

export const useNotice = (id: string) => useCrudSingle<Notice>(ENDPOINT, id, 'notice');

export const useCreateNotice = () => useCrudCreate<Partial<Notice>>(ENDPOINT, QUERY_KEY);

export const useUpdateNotice = () =>
  useCrudUpdate<Partial<Notice>>(ENDPOINT, QUERY_KEY);

export const useDeleteNotice = () => useCrudDelete(ENDPOINT, QUERY_KEY);
