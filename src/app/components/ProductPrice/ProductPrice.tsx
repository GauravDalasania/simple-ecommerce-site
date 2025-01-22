import { Sale } from "@/app/types";
import { FC } from "react";

const ProductPrice: FC<Sale> = ({ regular_price, offer_price, currency }) => {
  return (
    <p className="font-medium text-gray-700 mb-4">
      {offer_price ? (
        <span className="font-semibold">
          {currency} {offer_price}{" "}
        </span>
      ) : (
        <></>
      )}
      <span className={`${offer_price ? "line-through" : ""}`}>
        {regular_price}
      </span>
    </p>
  );
};

export default ProductPrice;
