import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import useAPI  from '../hooks/useAPI';
// import { products } from '../data';
const productListApi = import.meta.env.VITE_PRODUCT_LIST;

export const Home = () => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const {data: products, loading} = useAPI("/products")

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(productListApi)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setLoading(false);
  //     });
  // }, []);
  // if(loading) return ()
  return (
    <div>
      <Hero />
      {/* ======================= solve 1 ======================= */}
      {/* {loading? <div>Loading....</div> :  <ProductList data={products} />} */}

      {/* ======================= solve 2  ======================= */}
      {loading && <div>Loading....</div>}
      {!loading && products && <ProductList data={products} />}
    </div>
  );
};

export default Home;
