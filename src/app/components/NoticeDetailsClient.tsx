"use client";
import { useNotice } from "@/hooks/useNoticeCrud";
import { notFound } from "next/navigation";

type Props = {
  id: string;
};

const NoticeDetailsClient = ({ id }: Props) => {
  const { data, isLoading, error } = useNotice(id);

  if (isLoading) return <p>লোড হচ্ছে...</p>;
  if (error || !data?.data) return notFound();

  const notice = data.data;

  const formattedDate = new Date(notice.date).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postedDate = new Date(notice.createdAt).toLocaleString("bn-BD");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{notice.title}</h1>
      <p className="text-sm text-gray-500">প্রকাশের তারিখ: {formattedDate}</p>
      <p className="text-sm text-gray-500">পোস্ট করেছেন: {notice.postedBy}</p>
      <div className="mt-4">{notice.description}</div>
      <p className="mt-6 text-xs text-gray-400">পোস্ট করা হয়: {postedDate}</p>
    </div>
  );
};

export default NoticeDetailsClient;
