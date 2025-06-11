// app/notices/[id]/page.tsx

import NoticeDetailsClient from "@/app/components/NoticeDetailsClient";


type Props = {
  params: { id: string };
};

const NoticeDetailsPage = ({ params }: Props) => {
  return <NoticeDetailsClient id={params.id} />;
};

export default NoticeDetailsPage;
