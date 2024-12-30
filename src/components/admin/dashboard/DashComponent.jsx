"use client";
import Image from "next/image";
import Link from "next/link";
import { MdAttachMoney } from "react-icons/md";
import { IoArrowRedoSharp } from "react-icons/io5";
import { HiArrowNarrowUp } from "react-icons/hi";
import FormattedPrice from "@/backend/helpers/FormattedPrice";
import { FaTags } from "react-icons/fa6";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { SiXcode } from "react-icons/si";

const DashComponent = ({ data, lang }) => {
  const weeklyData = JSON.parse(data?.weeklyData);
  const sortedData = weeklyData
    .map((item, index) => ({ index, item }))
    .sort((a, b) => new Date(a.item.date) - new Date(b.item.date))
    .map(({ index }) => weeklyData[index]);
  weeklyData.sort((a, b, c) => new Date(c) - new Date(c));
  const chartLabels = sortedData.map((data) => data.date);
  const chartData = sortedData.map((data) => data.Total);
  // Visitors
  const weeklyVisitorData = JSON.parse(data?.weeklyVisitorData);
  const sortedVisitorData = weeklyVisitorData
    .map((item, index) => ({ index, item }))
    .sort((a, b) => new Date(a.item.date) - new Date(b.item.date))
    .map(({ index }) => weeklyVisitorData[index]);
  weeklyVisitorData.sort((a, b, c) => new Date(c) - new Date(c));
  const chartVisitorsLabels = sortedVisitorData.map((data) => data.date);
  const chartVisitorsData = sortedVisitorData.map((data) => data.Total);
  // Pie Charts

  const deviceUsageData = JSON.parse(data?.deviceUsageData);
  const sortedViewportPieData = deviceUsageData
    .map((item, index) => ({ index, item }))
    .sort((a, b) => new Date(a.item.date) - new Date(b.item.date))
    .map(({ index }) => deviceUsageData[index]);
  deviceUsageData.sort((a, b, c) => new Date(c) - new Date(c));
  const chartViewportLabels = sortedViewportPieData.map((data) => data.label);
  const chartViewportData = sortedViewportPieData.map((data) => data.Total);
  // Prepare the labels and data for the chart

  const clients = JSON.parse(data?.clients);
  const products = JSON.parse(data?.products);
  const affiliates = JSON.parse(data?.affiliates);
  const orders = JSON.parse(data?.orders);
  const posts = JSON.parse(data?.posts);
  const visitors = JSON.parse(data?.visitors);
  const analytics = JSON.parse(data?.analytics);
  const totalPostCount = data?.totalPostCount;
  const orderCountPreviousMonth = data?.orderCountPreviousMonth;
  const affiliateCountPreviousMonth = data?.affiliateCountPreviousMonth;
  const postCountPreviousMonth = data?.postCountPreviousMonth;
  const clientCountPreviousMonth = data?.clientCountPreviousMonth;
  const totalOrderCount = data?.totalOrderCount;
  const totalAffiliateCount = data?.totalAffiliateCount;
  const totalProductCount = data?.totalProductCount;
  const productsCountPreviousMonth = data?.productsCountPreviousMonth;
  const totalCustomerCount = data?.totalCustomerCount;
  const totalPaymentsThisWeek = data?.totalPaymentsThisWeek;
  const dailyPaymentsTotals = data?.dailyPaymentsTotals;
  const yesterdaysOrdersTotals = data?.yesterdaysOrdersTotals;
  const monthlyOrdersTotals = data?.monthlyOrdersTotals;
  const yearlyOrdersTotals = data?.yearlyOrdersTotals;
  const lastWeeksPaymentsTotals = data?.lastWeeksPaymentsTotals;
  const lastMonthsPaymentsTotals = data?.lastMonthsPaymentsTotals;
  // Assuming `weeklyData` is your fetched dataset

  const weeklyDataWithColors = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total de dia",
        data: chartData,
        backgroundColor: [
          "rgba(239, 87, 51, 0.7)",
          "rgba(120, 203, 213, 0.7)",
          "rgba(240, 170, 68, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(131, 201, 139, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
        borderColor: [
          "rgba(239, 87, 51, 1)",
          "rgba(120, 203, 213, 1)",
          "rgba(240, 170, 68, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(131, 201, 139, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const weeklyVisitorsDataWithColors = {
    labels: chartVisitorsLabels,
    datasets: [
      {
        label: "Visitas del dia",
        data: chartVisitorsData,
        backgroundColor: [
          "rgba(239, 87, 51, 0.7)",
          "rgba(120, 203, 213, 0.7)",
          "rgba(240, 170, 68, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(131, 201, 139, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
        borderColor: [
          "rgba(239, 87, 51, 1)",
          "rgba(120, 203, 213, 1)",
          "rgba(240, 170, 68, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(131, 201, 139, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const viewportDataWithColors = {
    labels: chartViewportLabels,
    datasets: [
      {
        label: "Total de mes",
        data: chartViewportData,
        backgroundColor: [
          "rgba(239, 87, 51, 0.7)",
          "rgba(120, 203, 213, 0.7)",
          "rgba(240, 170, 68, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(131, 201, 139, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
        borderColor: [
          "rgba(239, 87, 51, 1)",
          "rgba(120, 203, 213, 1)",
          "rgba(240, 170, 68, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(131, 201, 139, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="p-3 md:mx-auto  ">
      <div className="flex-row maxsm:flex-col flex gap-4 justify-start w-full">
        <div className="w-full flex flex-row maxsm:flex-col gap-4 justify-start items-start">
          <div className="flex-row maxsm:flex-col flex gap-4 justify-start w-full">
            <div className="w-full flex flex-row maxmd:flex-col gap-4 justify-start items-start">
              <div className="flex flex-col p-3 gap-4 w-full rounded-md shadow-lg bg-slate-300 dark:bg-slate-700">
                <div className="flex justify-between">
                  <div className="">
                    <h3 className="text-gray-500 text-md font-primary">
                      Pedidos
                    </h3>
                    <p className="text-2xl ">{totalOrderCount}</p>
                  </div>
                  <FaTags className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-700 flex items-center">
                    <HiArrowNarrowUp />
                    {orderCountPreviousMonth}
                  </span>
                  <div className="text-gray-500 font-secondary text-xs">
                    Mes Anterior
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-3 gap-4 w-full rounded-md shadow-lg bg-slate-300 dark:bg-slate-700">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-gray-500 text-md font-primary">
                    Servicios
                  </h3>
                  <p className="text-2xl ">{totalProductCount}</p>
                </div>
                <SiXcode className="bg-secondary text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex  gap-2 text-sm">
                <span className="text-green-700 flex items-center">
                  <HiArrowNarrowUp />
                  {productsCountPreviousMonth}
                </span>
                <div className="text-gray-500 font-secondary text-xs">
                  Mes Anterior
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3 bg-slate-300 dark:bg-slate-700 shadow-lg gap-4 w-full rounded-md ">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500  font-primary">Ingresos</h3>
                <p className="text-2xl  ">
                  <FormattedPrice amount={yearlyOrdersTotals || 0} />
                </p>
              </div>
              <MdAttachMoney className=" bg-accent text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
            <div className="flex  gap-2 text-sm">
              <span className="text-green-700 flex items-center">
                <HiArrowNarrowUp />
                <FormattedPrice amount={monthlyOrdersTotals || 0} />
              </span>
              <div className="text-gray-500">Mes Actual</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex maxmd:flex-col justify-start items-start gap-x-3">
        {/* Chart to display daily visits for the last 7 days */}
        <div className="w-2/3 maxmd:w-full min-h-full bg-slate-300 dark:bg-slate-700 p-5 rounded-md mt-4 dark:text-white">
          <div className="chart-container  ">
            <h2 className="font-primary">
              Totales Visitas en los últimos 7 días
            </h2>
            <Bar data={weeklyVisitorsDataWithColors} options={options} />
          </div>
        </div>
        {/* PieChart to display daily visits for the last 7 days */}
        <div className="w-1/3 maxmd:w-full min-h-full bg-slate-300 dark:bg-slate-700 p-5 rounded-md mt-4 dark:text-white">
          <div className="chart-container">
            <h2 className="font-primary mb-5">Visitas en Dispositivos </h2>
            <Pie data={viewportDataWithColors} options={pieOptions} />
          </div>
        </div>
      </div>
      {/* Chart to display daily sales totals for the last 7 days */}
      <div className="w-full min-h-[400px] maxsm:h-[250px] bg-slate-300 dark:bg-slate-700 p-5  mt-4">
        <div className="chart-container h-[350px] maxsm:h-[200px]">
          <h2 className="font-primary">
            Totales diarios de los últimos 7 días
          </h2>
          <Bar data={weeklyDataWithColors} options={options} />
        </div>
      </div>

      <div className="flex flex-row maxsm:flex-col gap-4 py-3 mx-auto justify-start">
        <div className="w-full flex flex-row maxmd:flex-col gap-4 justify-start items-start">
          <div className="flex flex-col w-full shadow-md px-5 rounded-md bg-slate-300 dark:bg-slate-700">
            <div className="flex justify-between py-3 ">
              <h1 className="font-primary text-xs">Pedidos recientes</h1>
              <Link
                className="font-secondary text-[12px]"
                href={`/${lang}/admin/pedidos`}
              >
                Ver todos
              </Link>
            </div>
            <table>
              <thead>
                <tr className="flex justify-between mb-4 font-primary text-xs text-gray-500">
                  <th>No.</th>
                  <th>Status</th>
                  <th>...</th>
                </tr>
              </thead>
              {orders &&
                orders.map((order) => (
                  <tbody
                    key={order._id}
                    className="divide-y font-secondary text-xs"
                  >
                    <tr className=" flex justify-between dark:border-gray-700 dark:bg-slate-700 mb-4">
                      <td>{order.orderId}</td>
                      <td>{order.orderStatus}</td>
                      <td>
                        <Link href={`/admin/pedido/${order._id}`}>
                          <IoArrowRedoSharp className=" text-teal-600 " />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>

        <div className="w-full flex flex-row maxmd:flex-col gap-4 justify-start items-start">
          <div className="flex flex-col w-full shadow-md px-5 rounded-md bg-slate-300 dark:bg-slate-700">
            <div className="flex justify-between py-3 text-xs">
              <h1 className="font-primary text-xs">Servicios Recientes</h1>
              <Link
                className=" font-secondary text-[12px]"
                href={`/${lang}/admin/productos`}
              >
                Ver Todos
              </Link>
            </div>
            <table>
              <thead>
                <tr className="flex justify-between mb-4 font-primary text-xs text-gray-500">
                  <th>Img.</th>
                  <th>Nombre</th>
                  <th>...</th>
                </tr>
              </thead>
              {products &&
                products.map((product) => (
                  <tbody
                    key={product._id}
                    className="divide-y  font-secondary text-xs"
                  >
                    <tr className=" flex justify-between dark:border-gray-700 dark:bg-slate-700 mb-2">
                      <td>
                        <Image
                          src={
                            product?.images[0].url ||
                            "/images/avatar_placeholder.jpg"
                          }
                          alt="producto"
                          width={400}
                          height={400}
                          className="w-10 h-10 rounded-full bg-gray-500"
                        />
                      </td>
                      <td>
                        <p className="line-clamp-2 capitalize">
                          {product.title[`${lang}`].substring(0, 12)}...
                        </p>
                      </td>
                      <td>
                        <Link href={`/admin/productos/editar/${product.slug}`}>
                          <IoArrowRedoSharp className=" text-indigo-500 " />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
          <div className="flex flex-col w-full shadow-md px-5 rounded-md bg-slate-300 dark:bg-slate-700">
            <div className="flex justify-between py-3 text-xs">
              <h2 className="font-primary">Publicaciones recientes</h2>
              <button>
                <Link
                  className=" font-secondary text-[12px]"
                  href={`/${lang}/admin/blog`}
                >
                  Ver todas
                </Link>
              </button>
            </div>
            <table>
              <thead>
                <tr className="flex justify-between mb-4 font-primary text-xs text-gray-500">
                  <th>Img.</th>
                  <th>Titulo</th>
                  <th>...</th>
                </tr>
              </thead>
              {posts &&
                posts?.map((post) => (
                  <tbody
                    key={post?._id}
                    className="divide-y font-secondary text-xs"
                  >
                    <tr className=" flex justify-between  dark:bg-slate-700 mb-2">
                      <td className="flex gap-2 items-start">
                        <Image
                          src={post?.mainImage || "/next.svg"}
                          alt="user"
                          width={400}
                          height={400}
                          className="w-10 h-10 rounded-md bg-gray-500"
                        />
                        <span className="text-[12px] leading-none tracking-tighter">
                          {post.mainTitle[`${lang}`].substring(0, 20)}...
                        </span>
                      </td>

                      <td>
                        <Link href={`/${lang}/admin/blog/editar/${post.slug}`}>
                          <IoArrowRedoSharp className=" text-orange-500 " />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashComponent;
