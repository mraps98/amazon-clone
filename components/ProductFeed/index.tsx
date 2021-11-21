import { FC } from 'react';
import { IProduct } from '../../interfaces';
import Product from './Product';

interface IProductFeedProps {
  products: Array<IProduct>;
}

const ProductFeed: FC<IProductFeedProps> = ({ products }) => {
  return (
    <div>
      {products?.map((product: IProduct) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductFeed;
