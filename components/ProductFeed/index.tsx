import { FC } from 'react';
import { IProduct } from '../../interfaces';
import Product from './Product';

interface IProductFeedProps {
  products: Array<IProduct>;
}

const ProductFeed: FC<IProductFeedProps> = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products?.length > 0 ? (
        products
          ?.slice(0, 4)
          ?.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))
      ) : (
        <div className="bg-yellow-300 p-5 rounded-md">No Products found...</div>
      )}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt="Ad"
      />

      <div className="md:col-span-2">
        {products?.length > 4 &&
          products
            ?.slice(4, 5)
            ?.map((product: IProduct) => (
              <Product key={product.id} product={product} />
            ))}
      </div>

      {products?.length > 5 &&
        products
          ?.slice(5, products.length)
          ?.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))}
    </div>
  );
};
export default ProductFeed;
