"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const pathname = usePathname();
  const cart = useAppSelector((state: any) => state.cart);
  const activePathClasses = "font-bold border-b-2";
  const inActivePathClasses = "text-blue-500";

  return (
    <header className="flex justify-between items-center flex-initial bg-slate-900 text-white">
      <nav className="p-4 flex gap-4">
        <Link
          href="/"
          className={`mr-4  ${
            pathname === "/" ? activePathClasses : inActivePathClasses
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`mr-4  ${
            pathname === "/products" ? activePathClasses : inActivePathClasses
          }`}
        >
          Products
        </Link>
      </nav>
      <div className="p-2 rounded-md">
        <p className="font-medium font-semibold flex gap-2 items-center relative">
          <FontAwesomeIcon icon={faCartShopping} />
           {cart.length || 0} items
        </p>
      </div>
    </header>
  );
};

export default Header;
