import MeetChefs from "../components/HomePage/MeetChefs";
import Menu from "../components/HomePage/Menu";
import SEO from "../components/Layout/SEO";
import ProductList from "../components/ProductList/ProductList";

function Home() {
  return (
    <>
      <SEO title="kotiChefs | Home" />
      {/*<Menu />*/}
      <MeetChefs />
      <ProductList />
    </>
  );
}

export default Home;
