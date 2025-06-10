'use client';

import Heading from '@/app/components/Heading';
import { useNotices } from '@/hooks/useNotices';
import Link from 'next/link';


const AllNotices = () => {
  const { data: notices, isLoading } = useNotices();

  return (
    <div className="container mx-auto p-4">
      <Heading title="সকল নোটিশ" />

      {isLoading ? (
        <p>লোড হচ্ছে...</p>
      ) : (
        <div className="space-y-4">
          {notices?.map(notice => (
            <div key={notice._id} className="p-4 border rounded-md shadow bg-white">
              <p className="text-sm text-gray-500">
                তারিখ: {new Date(notice.date).toLocaleDateString('bn-BD')}
              </p>
              <h2 className="text-xl font-bold text-[#FF0000]">{notice.title}</h2>
              <p className="text-gray-700">{notice.description.slice(0, 100)}...</p>
              <Link href={`/notices/${notice._id}`} className="text-blue-600 underline">
                বিস্তারিত দেখুন
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNotices;
