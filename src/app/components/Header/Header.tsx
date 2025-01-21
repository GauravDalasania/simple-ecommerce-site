import React from "react";

interface HeaderProps {
    cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => (
    <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Listing</h1>
        <div className="bg-gray-100 p-2 rounded-md">
            <p className="font-medium">Cart: {cartItemCount} items</p>
        </div>
    </header>
);

export default Header;