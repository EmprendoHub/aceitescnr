import CustomerSidebar from "@/components/admin/CustomerSidebar";

export default function UserLayout({ children, params }) {
  const lang = params.lang;
  return (
    <div className="max-w-full pr-2">
      <div className="flex items-start w-full ">
        <CustomerSidebar lang={lang} />

        <div className="relative w-full mb-5 ">{children}</div>
      </div>
    </div>
  );
}
