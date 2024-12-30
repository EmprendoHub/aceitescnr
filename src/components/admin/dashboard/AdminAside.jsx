"use client";
import AdminSidebar, { SideBarItem } from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";
import { TbDeviceIpadDollar } from "react-icons/tb";
import { PiUserListLight } from "react-icons/pi";
import { CiGrid31 } from "react-icons/ci";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlinePostAdd } from "react-icons/md";
import { TbAffiliate, TbLayoutGridAdd } from "react-icons/tb";

import { AiFillProfile } from "react-icons/ai";

const AdminAside = ({ lang, admin }) => {
  const pathname = usePathname();
  return (
    <AdminSidebar>
      <SideBarItem
        icon={<TfiDashboard size={20} />}
        text={admin?.sidebar?.dashboard}
        active={pathname === `/${lang}/admin` ? "true" : "false"}
        url={`/${lang}/admin`}
      />
      <SideBarItem
        icon={<TbDeviceIpadDollar size={20} />}
        text={admin?.sidebar?.orders}
        active={pathname === `/${lang}/admin/pedidos` ? "true" : "false"}
        url={`/${lang}/admin/pedidos`}
      />
      <SideBarItem
        icon={<CiGrid31 size={20} />}
        text={admin?.sidebar?.posts}
        active={pathname === `/${lang}/admin/blog` ? "true" : "false"}
        url={`/${lang}/admin/blog`}
      />
      <SideBarItem
        icon={<MdOutlinePostAdd size={20} />}
        text={admin?.sidebar?.newPost}
        active={pathname === `/${lang}/admin/blog/editor` ? "true" : "false"}
        url={`/${lang}/admin/blog/editor`}
      />
      <SideBarItem
        icon={<AiFillProfile size={20} />}
        text={admin?.sidebar?.products}
        active={pathname === `/${lang}/admin/productos`}
        url={`/${lang}/admin/productos`}
      />
      <SideBarItem
        icon={<TbLayoutGridAdd size={20} />}
        text={admin?.sidebar?.newService}
        active={pathname === `/${lang}/admin/productos/nuevo`}
        url={`/${lang}/admin/productos/nuevo`}
      />
      <SideBarItem
        icon={<PiUserListLight size={20} />}
        text={admin?.sidebar?.clients}
        active={pathname === `/${lang}/admin/clientes` ? "true" : "false"}
        url={`/${lang}/admin/clientes`}
      />
      <SideBarItem
        icon={<TbAffiliate size={20} />}
        text={admin?.sidebar?.affiliates}
        active={pathname === `/${lang}/admin/asociados` ? "true" : "false"}
        url={`/${lang}/admin/asociados`}
      />
    </AdminSidebar>
  );
};

export default AdminAside;
