import Header from '../components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {
  ICartReducerCartItem,
  selectItems,
  selectNumberOfItems,
  selectTotal,
} from '../redux/reducers/cart';
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';

const Checkout = () => {
  const cartItems: Array<ICartReducerCartItem> = useSelector(selectItems);
  const numberOfItemsInCart = useSelector(selectNumberOfItems);
  const cartTotalAmount = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            alt="ad"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">Your Shopping Cart</h1>

            {cartItems?.length > 0
              ? cartItems?.map((item, index) => (
                  <CheckoutProduct key={item.product.id} item={item} />
                ))
              : 'Your Shopping Cart is empty'}
          </div>
        </div>

        {/* Right */}
        <div>
          Subtotal ({numberOfItemsInCart} items):{' '}
          <Currency quantity={cartTotalAmount} />
        </div>
      </main>
    </div>
  );
};
export default Checkout;
