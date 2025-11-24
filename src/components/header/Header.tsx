// src/components/header/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Transition } from '@headlessui/react';
import { IconType } from 'react-icons';
import { FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Search } from './Search';
import { TopBar } from './TopBar';
import { MegaMenu } from './MegaMenu';
import { Collections } from '@/types';
import { BottomNavigation } from '@/components';
import { useSession, signOut } from 'next-auth/react';
import { useShop } from '@/contexts/ShopContext';

export interface NavLink {
  name: 'men' | 'women' | 'kids' | 'sale' | 'blog' | 'contacts';
  href: string;
  collapsible?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'men', href: '/products/men', collapsible: true },
  { name: 'women', href: '/products/women', collapsible: true },
  { name: 'kids', href: '/products/kids' },
  { name: 'sale', href: '/sale' },
  { name: 'blog', href: '/blog' },
  { name: 'contacts', href: '/contacts' },
];

export const Header = ({ collections }: { collections: Collections }) => {
  const { t } = useTranslation('header');
  const { data: session } = useSession();
  const { getCartCount } = useShop();
  const cartCount = getCartCount();

  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  return (
    <header>
      <TopBar />
      <div className="relative h-14 bg-white shadow-md shadow-gray-200">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Link href="/">
              <Image
                priority
                src="/logo.png"
                alt="logo"
                width={50}
                height={15}
                quality={100}
              />
            </Link>
          </div>
          <ul className="ml-auto hidden h-full md:flex">
            {navLinks.map((item, index) => (
              <li
                className={`font-medium text-neutral-700 transition-colors ${
                  hoveredNavLink === item && 'bg-violet-100 text-violet-700'
                }`}
                key={index}
                onMouseEnter={() => handleShowMenu(item)}
                onMouseLeave={handleCloseMenu}
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center px-5"
                  onClick={handleCloseMenu}
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto items-center md:flex">
            <Search onSearch={value => console.log(value)} />
            
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="ml-5 hidden md:block">
              <FiHeart
                className="text-neutral-700 transition-colors hover:text-violet-700"
                size="20px"
              />
            </Link>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="ml-5 hidden md:block relative">
              <FiShoppingBag
                className="text-neutral-700 transition-colors hover:text-violet-700"
                size="20px"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-violet-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Icon */}
            <Link href="/signin" className="ml-5 hidden md:block">
              <FiUser
                className="text-neutral-700 transition-colors hover:text-violet-700"
                size="20px"
              />
            </Link>

            {session && (
              <button
                className="ml-5 hidden rounded-full border border-solid border-violet-700 p-[2px] md:block"
                onClick={() => signOut()}
              >
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="user profile image"
                    width={30}
                    height={30}
                    className="overflow-hidden rounded-full"
                    quality={100}
                  />
                )}
              </button>
            )}
          </ul>
        </div>
        <Transition show={Boolean(hoveredNavLink?.collapsible)}>
          {hoveredNavLink && (
            <MegaMenu
              type={hoveredNavLink.name === 'men' ? 'MEN' : 'WOMEN'}
              collections={collections}
              onShowMenu={() => handleShowMenu(hoveredNavLink)}
              onCloseMenu={handleCloseMenu}
            />
          )}
        </Transition>
      </div>
      <BottomNavigation navLinks={navLinks} collections={collections} />
    </header>
  );
};