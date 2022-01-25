import Layout from "../components/Layout/Layout";
import MeetChefs from "../components/HomePage/MeetChefs";
import Menu from "../components/HomePage/Menu";

const Home = () => {
  return (
    <Layout title="kotiChefs | Homepage">
      <Menu />
      <MeetChefs />
    </Layout>
  );
};

export default Home;
