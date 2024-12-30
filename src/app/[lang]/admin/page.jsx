import DashComponent from "@/components/admin/dashboard/DashComponent";
import { getDashboard } from "../_actions";

const AdminDashboardPage = async ({ params }) => {
  const lang = params.lang;
  const data = await getDashboard(lang);

  return (
    <>
      <DashComponent data={data} lang={lang} />
    </>
  );
};

export default AdminDashboardPage;
