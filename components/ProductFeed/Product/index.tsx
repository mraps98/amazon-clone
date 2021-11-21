import { FC, useState } from 'react';
import { IProduct } from '../../../interfaces';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';

interface IProductProps {
  product: IProduct;
}

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product: FC<IProductProps> = ({ product }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image src={product.image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <StarIcon className="h-4 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs mt-2 mb-2 my-2 line-clamp-2">
        {product.description}
      </p>
      <div className="mb-5">
        <Currency quantity={product.price} />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="prime"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Cart</button>
    </div>
  );
};

export default Product;
