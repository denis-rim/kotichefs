import Layout from "../components/Layout/Layout";
import MeetChefs from "../components/HomePage/MeetChefs";
import Menu from "../components/HomePage/Menu";
import ProductList from "../components/ProductList/ProductList";

const Home = () => {
  return (
    <Layout title="kotiChefs | Homepage">
      <Menu />
      <MeetChefs />
      <ProductList />
    </Layout>
  );
};

export default Home;
