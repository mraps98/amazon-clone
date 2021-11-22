import { FC, useState } from 'react';
import { IProduct } from '../../../interfaces';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart';

interface IProductProps {
  product: IProduct;
}

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product: FC<IProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const handleClickAddToCart = () => {
    dispatch(addToCart({ ...product, rating, hasPrime }));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        src={product.image}
        height={200}
        width={200}
        objectFit="contain"
        alt={product.title}
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, index) => (
            <StarIcon key={index} className="h-4 text-yellow-500" />
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
          <Image
            height={48}
            width={48}
            objectFit="contain"
            src="https://links.papareact.com/fdw"
            alt="prime"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={handleClickAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
