import { ICartReducerCartItem } from '../../redux/reducers/cart';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkoutSessionHandler = async (req: any, res: any) => {
  const { cartItems, email } = req.body;

  const formattedItemsForStrip = cartItems.map(
    (item: ICartReducerCartItem) => ({
      description: item.product.description,
      quantity: item.count,
      price_data: {
        currency: 'usd',
        unit_amount: item.product.price * 100,
        product_data: {
          name: item.product.title,
          images: [item.product.image],
        },
      },
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1JySG6GpP0jUudiP1qxwdoUS'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB'],
    },
    line_items: formattedItemsForStrip,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(
        cartItems.map((item: ICartReducerCartItem) => item.product.image)
      ),
    },
  });

  res.status(200).json({ id: session.id });
};

export default checkoutSessionHandler;
