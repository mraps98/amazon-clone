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
    <div>
      <p>{product.category}</p>
      <Image src={product.image} height={200} width={200} objectFit="contain" />
      <h4>{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <StarIcon className="h-4" />
          ))}
      </div>

      <p>{product.description}</p>

      <div>
        <Currency quantity={product.price} />
      </div>

      {hasPrime && (
        <div>
          <img src="https://links.papareact.com/fdw" alt="prime" />
          <p>FREE Next-day Delivery</p>
        </div>
      )}
    </div>
  );
};

export default Product;
