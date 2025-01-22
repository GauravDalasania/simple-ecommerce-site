import Link from "next/link";
import ProductCard from "./../components/ProductCard/ProductCard";
import { FetchProductsResponse, SearchParams } from "./types";

async function fetchProducts({
  take = 12,
  page = 1,
}: SearchParams): Promise<FetchProductsResponse> {
  const skip = (page - 1) * take;
  const res = await fetch(
    `${process.env.API_HOST}/products?take=${take}&skip=${skip}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsListing(
  props: Readonly<{ searchParams: Promise<SearchParams> }>
) {
  const searchParams = await props.searchParams;
  const data = await fetchProducts({
    take: searchParams?.take,
    page: searchParams?.page,
  });
  let products = data.data.products;
  const page = searchParams.page ?? 1;

  return (
    <div className="p-6 xl:w-[1024px] mx-auto">
      <h1 className="text-xl xl:text-2xl font-bold mb-6">Product Listing</h1>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:max-w-full">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <footer className="flex justify-center mt-6 gap-2">
        <Link
          href={`/products/?page=${page > 1 ? page - 1 : 1}`}
          className={`py-2 px-4 rounded-md ${
            page == 1 ? "bg-gray-200" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </Link>
        <Link
          href={`/products/?page=${
            products.length < (searchParams?.take || 12)
              ? page
              : Number(page) + 1
          }`}
          className={`py-2 px-4 rounded-md ${
            products.length < (searchParams?.take || 12)
              ? "bg-gray-200"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </Link>
      </footer>
    </div>
  );
}
