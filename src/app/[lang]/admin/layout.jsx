import AdminAside from "@/components/admin/dashboard/AdminAside";
import { getDictionary } from "@/lib/dictionary";

export default async function UserLayout({ children, params }) {
  const lang = params.lang;
  const { admin } = await getDictionary(lang);
  return (
    <div className="max-w-full pr-2">
      <div className="flex items-start w-full ">
        <AdminAside lang={lang} admin={admin} />
        <div className="relative w-full mb-5 ">{children}</div>
      </div>
    </div>
  );
}
