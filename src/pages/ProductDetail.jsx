import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import BaseContainer from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';

import { numberWithCommas } from '../utils';
// import { products } from '../data';
import { useEffect, useState, useCallback, useMemo } from 'react';
import useAPI from '../hooks/useAPI';
import useCart from '../hooks/useCart';

const productDetailApi = import.meta.env.VITE_PRODUCT_DETAIL;

const Container = styled(BaseContainer)`
  padding-top: 78px;
  padding-bottom: 78px;
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 96px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  line-height: 60px;
  font-weight: 600;
  margin-bottom: 72px;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  line-height: 48px;
  font-weight: 400;
  color: #000000;
`;

const Description = styled.p`
  font-size: 24px;
  line-height: 36px;
  font-weight: 300;

  color: #000000;
  margin-top: 0;
  margin-bottom: 72px;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const data = products[0];

/**
 * Below is the main ProductDetail component.
 */
export const ProductDetail = () => {
  const { productId } = useParams();
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState({
  //   imageUrl: '',
  //   name: '',
  //   category: '',
  //   price: '',
  //   description: '',
  // });
  const [quantity, setQuantity] = useState('1');
  const { data, loading } = useAPI('/products/' + productId);
  const { cartItems, addCartItem, removeCartItemv } = useCart();

  const handleQuatityChange = useMemo(() => {
    console.log('test-re-render');
    return (e) => {
      
      setQuantity(e.target.value);
    };
  }, [setQuantity]);

  const handleClick = useCallback(() => {
    addCartItem(data, parseInt(quantity));
    alert('เพิ่มสินค้าลงตะกร้าสำเร็จ!');
  }, [data, addCartItem, quantity]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(productDetailApi + productId)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      {loading && <Loading>Loading....</Loading>}
      {!loading && data && (
        <Container>
          <ProductImage src={data.imageUrl} alt={`${data.name}`} />
          <ProductInfo>
            <Subtitle>
              <span>{data.category}</span>
              <span>฿{numberWithCommas(data.price)}</span>
            </Subtitle>
            <Title>{data.name}</Title>
            <Description>{data.description}</Description>
            <Input
              value={quantity}
              onChange={handleQuatityChange}
              style={{ marginBottom: '40px' }}
              type={'number'}
              label={'Quantity'}
            />
            <Button disabled={!(quantity % 1 === 0 && quantity > 0)} onClick={handleClick}>
              Add to Cart
            </Button>
          </ProductInfo>
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
