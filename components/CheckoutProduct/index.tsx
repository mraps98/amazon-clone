import { FC } from 'react';
import { IProduct } from '../../interfaces';
import Currency from 'react-currency-formatter';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cart';

interface ICheckoutProductProps {
  item: { product: IProduct; count: number };
}

const CheckoutProduct: FC<ICheckoutProductProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleClickAddToCart = () => {
    dispatch(addToCart(item.product));
  };

  const handleClickRemoveFromCart = () => {
    dispatch(removeFromCart(item.product));
  };

  return (
    <div className="grid grid-cols-5">
      {/* Left */}
      <Image
        src={item.product.image}
        height={200}
        width={200}
        objectFit="contain"
        alt={item.product.title}
      />

      {/* Mid */}
      <div className="col-span-3 mx-5">
        <p>{item.product.title}</p>
        <div className="flex">
          {Array(item.product.rating)
            .fill(0)
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{item.product.description}</p>
        <Currency quantity={item.product.price} />

        {item.product.hasPrime && (
          <div className="flex items-center space-x-2">
            <Image
              src="https://links.papareact.com/fdw"
              height={48}
              width={48}
              objectFit="contain"
              alt="prime"
            />
            <p className="text-xs text-gray-500 h-5">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex space-x-2 my-auto items-center justify-center">
        <button className="button" onClick={handleClickRemoveFromCart}>
          -
        </button>
        <p>{item.count}</p>
        <button className="button" onClick={handleClickAddToCart}>
          +
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
