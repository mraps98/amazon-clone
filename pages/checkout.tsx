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
import { useSession } from 'next-auth/client';

const Checkout = () => {
  const [session] = useSession();
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
        <div className="flex flex-col bg-white p-10 shadow-md lg:h-52">
          {numberOfItemsInCart > 0 && (
            <>
              <h2>
                Subtotal ({numberOfItemsInCart} items):{' '}
                <span className="font-bold">
                  <Currency quantity={cartTotalAmount} />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {session ? 'Proceed to checkout' : 'Sign in to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
export default Checkout;
