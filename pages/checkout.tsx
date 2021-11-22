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
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { create } from 'domain';

const stripePromise = loadStripe(process.env.stripe_public_key!);

const Checkout = () => {
  const [session] = useSession();
  const cartItems: Array<ICartReducerCartItem> = useSelector(selectItems);
  const numberOfItemsInCart = useSelector(selectNumberOfItems);
  const cartTotalAmount = useSelector(selectTotal);

  const handleClickCheckout = () => {
    createCheckoutSession();
  };

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    if (!!stripe) {
      const checkoutSessionRequestBody = {
        cartItems,
        email: session?.user?.email,
      };
      const checkoutSession = await axios.post(
        '/api/create-checkout-session',
        checkoutSessionRequestBody
      );

      try {
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
      } catch (err: any) {
        alert(err?.reponse?.data?.error?.message || 'Error');
      }
    }
  };

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
              ? cartItems?.map((item) => (
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
                onClick={handleClickCheckout}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
                role="link"
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
