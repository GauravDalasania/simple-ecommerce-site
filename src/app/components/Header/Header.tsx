'use client';
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  cartItemCount: number;
}

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center flex-initial bg-slate-900 text-white">
      <nav className="p-4 flex gap-4">
        <Link href='/' className={`mr-4  ${pathname === '/' ? ' font-bold border-b-2' : 'text-blue-500'}`}>
          Home
        </Link>
        <Link href='/products' className={`mr-4  ${pathname === '/products' ? ' font-bold border-b-2' : ' text-blue-500'}`}>
          Products
        </Link>

      </nav>
      {/* <div className="bg-gray-100 p-2 rounded-md">
            <p className="font-medium">Cart: {cartItemCount} items</p>
        </div> */}
    </header>
  )
};

export default Header;