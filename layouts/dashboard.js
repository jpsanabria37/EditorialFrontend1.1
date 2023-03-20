import Head from "next/head";
import Sidebar from "../components/layout/sidebar";
import Content from "../components/layout/content";

const Dashboard = ({ children }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Sidebar />
      <Content>{children}</Content>
    </>
  );
};

export default Dashboard;
