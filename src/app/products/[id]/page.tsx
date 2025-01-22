import AddToCartBtn from "@/app/components/AddToCartBtn/AddToCartBtn";
import ProductCarousel from "@/app/components/Carousel/Carousel";
import DOMPurify from "isomorphic-dompurify";
import { ProductGallery, ProductImages } from "../types";
import ProductPrice from "@/app/components/ProductPrice/ProductPrice";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchProduct(
  id: string
): Promise<{ data: any; success: boolean; message: string }> {
  const res = await fetch(
    `${process.env.API_HOST}/product/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch product details");
  const data = res.json();
  return data;
}

const getProductImages = (images: ProductImages) => {
  const { gallery_images, featured_image } = images;
  if (gallery_images.length === 0) {
    return [
      {
        id: 0,
        image: featured_image,
        thumbnail: featured_image,
        medium: featured_image,
        full: featured_image,
      },
    ];
  }
  return gallery_images.map(
    (productGalleryItem: ProductGallery, index: number) => {
      return {
        id: index,
        ...productGalleryItem,
      };
    }
  );
};

export default async function ProductDetails(
  props: Readonly<ProductDetailsProps>
) {
  const params = await props.params;
  const product = await fetchProduct(params.id);
  const { data } = product;
  const productImages = getProductImages(data.product_details.images);

  return (
    <div className="p-6 xl:w-[1024px] mx-auto">
      <h1 className="text-xl xl:text-2xl font-bold mb-6">Product Details</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full max-w-md h-96 mb-4 relative">
          <ProductCarousel products={productImages} />
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-500">{data.product_details.brand.name}</h3>
          <h2 className="text-xl font-bold mb-4">
            {data.product_details.title}
          </h2>
          <p className="text-xl font-medium mb-6">
            <div className="flex gap-2">Price: <ProductPrice {...data.product_details.sale} /></div>
          </p>
          <p className="text-md font-medium mb-6">
            Rating: <span className="text-xl">{data.ratings.rating}</span>
          </p>
          <AddToCartBtn product={data.product_details} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">More details:</h2>
        <p
          className="text-lg mb-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.product_details.description),
          }}
        ></p>
      </div>
    </div>
  );
}
