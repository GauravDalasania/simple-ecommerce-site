"use client";

import Link from "next/link";
import { useEffect } from "react";

const ErrorComp = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="text-2xl text-red-500 mb-4">
        Error fetching product data...
      </div>
      <Link
        href="/"
        className="bg-blue-500 text-white py-2 px-4 rounded-md block text-center"
      >
        Go to HomePage
      </Link>
    </div>
  );
};

export default ErrorComp;
