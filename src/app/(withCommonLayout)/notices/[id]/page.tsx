// app/notices/[id]/page.tsx

import { notFound } from 'next/navigation';
import axiosInstance from '../../../../../lib/axios';


interface Notice {
  _id: string;
  title: string;
  description: string;
  date: string;
  audience: string;
  postedBy: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  params: { id: string };
};

const NoticeDetailsPage = async ({ params }: Props) => {
  try {
    const res = await axiosInstance.get(`/notice/${params.id}`);
    const notice: Notice = res.data.data; // 👈 this is the key part

    const formattedDate = new Date(notice.date).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const postedDate = new Date(notice.createdAt).toLocaleString('bn-BD');

    return (
      <main className="max-w-3xl mx-auto p-6 bg-white shadow mt-6 rounded min-h-[600px]">
        <h1 className="text-2xl font-bold text-center text-gray-800">আল হেলাল ইসলামিক একাডেমি</h1>
        <p className="text-center text-sm text-gray-600 mb-4">বনানী, ঢাকা</p>

        <p className="text-right text-sm text-gray-600">তারিখঃ {formattedDate}</p>

        <h2 className="text-xl font-semibold text-[#FF0000] mt-4 mb-2">বিষয়ঃ {notice.title}</h2>

        <p className="text-gray-700 text-justify leading-relaxed">{notice.description}</p>

        <div className="mt-6 text-sm text-gray-500">
          <p>লক্ষ্য শ্রোতা: {notice.audience === 'All' ? 'সকল' : notice.audience}</p>
          <p>প্রকাশিতঃ {postedDate}</p>
        </div>
      </main>
    );
  } catch (err) {
    return notFound();
  }
};

export default NoticeDetailsPage;
