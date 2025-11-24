// src/pages/wishlist.tsx
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PrimaryLayout } from '@/layouts';
import { useShop } from '@/contexts/ShopContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import { numberWithCommas } from '@/utils';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Wishlist: NextPageWithLayout = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full bg-neutral-100 p-8">
            <FiHeart className="text-neutral-400" size="4rem" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-neutral-900">
            Your wishlist is empty
          </h2>
          <p className="mb-8 text-neutral-600">
            Save items you love for later!
          </p>
          <Link
            href="/"
            className="rounded-lg bg-violet-700 px-8 py-3 font-medium text-white transition hover:bg-violet-800"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">
          My Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map(item => (
          <div key={item.id} className="group rounded-2xl bg-white p-4 shadow-sm">
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <Link href={`/product/${item.id}/slug`}>
                <div className="relative h-64 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={item.imageBlur}
                  />
                </div>
              </Link>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50"
                aria-label="Remove from wishlist"
              >
                <FiX className="text-red-500" size="1.125rem" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="mb-1 line-clamp-2 text-base font-semibold text-neutral-900">
                  {item.name}
                </h3>
                <p className="text-xs capitalize text-neutral-400">
                  {item.collectionName}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-violet-700">
                  ${numberWithCommas(item.price.toFixed(2))}
                </span>
                <div className="flex items-center text-xs text-neutral-500">
                  <BsStarFill size="11px" className="mr-1 text-yellow-400" />
                  <span>{item.rate}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    imageBlur: item.imageBlur,
                  });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 font-medium text-white transition hover:bg-violet-800"
              >
                <FiShoppingCart size="1.125rem" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Wishlist.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{
        title: 'Wishlist',
        description: 'Your wishlist items',
        canonical: 'https://shopy-theta.vercel.app/wishlist',
      }}
    >
      {page}
    </PrimaryLayout>
  );
};

export default Wishlist;