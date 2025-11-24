// src/pages/cart.tsx
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PrimaryLayout } from '@/layouts';
import { useShop } from '@/contexts/ShopContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { numberWithCommas } from '@/utils';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Cart: NextPageWithLayout = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useShop();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-neutral-100 p-8">
            <FiShoppingBag className="text-neutral-400" size="4rem" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-neutral-900">
            Your cart is empty
          </h2>
          <p className="mb-8 text-neutral-600">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            href="/"
            className="rounded-lg bg-violet-700 px-8 py-3 font-medium text-white transition hover:bg-violet-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="font-medium text-red-600 transition hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={item.imageBlur}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-violet-700">
                      ${numberWithCommas(item.price.toFixed(2))}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8 rounded-lg text-red-600 transition hover:bg-red-50"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="mx-auto" />
                  </button>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 transition hover:bg-neutral-50"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size="0.875rem" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 transition hover:bg-neutral-50"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size="0.875rem" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="text-lg font-bold text-neutral-900">
                  ${numberWithCommas((item.price * item.quantity).toFixed(2))}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-neutral-900">
              Order Summary
            </h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-medium">
                  ${numberWithCommas(getCartTotal().toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="border-t border-neutral-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-violet-700">
                    ${numberWithCommas(getCartTotal().toFixed(2))}
                  </span>
                </div>
              </div>
            </div>

            <button className="mb-3 w-full rounded-lg bg-violet-700 px-6 py-3 font-medium text-white transition hover:bg-violet-800">
              Proceed to Checkout
            </button>
            <Link
              href="/"
              className="block w-full rounded-lg border border-neutral-300 px-6 py-3 text-center font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{
        title: 'Shopping Cart',
        description: 'Your shopping cart',
        canonical: 'https://shopy-theta.vercel.app/cart',
      }}
    >
      {page}
    </PrimaryLayout>
  );
};

export default Cart;