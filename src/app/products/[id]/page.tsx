import { Product } from "@/app/page";
import Image from "next/image";
import DOMPurify from 'isomorphic-dompurify';
import AddToCartBtn from "@/app/components/AddToCartBtn/AddToCartBtn";
import ProductCarousel from "@/app/components/Carousel/Carousel";
import { ProductGallery } from "../types";

interface ProductDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

async function fetchProduct(id: string): Promise<{ data: any, success: boolean, message: string; }> {
    const res = await fetch(`https://prodapp.lifepharmacy.com/api/v1/product/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product details');
    const data = res.json();
    return data;
}

const getProductImages = (productGallery: ProductGallery[]) => {
    return productGallery.map((productGalleryItem: ProductGallery, index: number) => {
        return {
            id: index,
             ...productGalleryItem
        }
    })
}

export default async function ProductDetails(props: ProductDetailsProps) {
    const params = await props.params;
    const product = await fetchProduct(params.id);
    const { data } = product;
    const productImages = getProductImages(data.product_details.images.gallery_images);

    return (
        <div className="p-6 xl:w-[1024px] mx-auto">
            <h1 className="text-xl xl:text-2xl font-bold mb-6">Product Details</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full max-w-md h-96 mb-4 relative">
                    {/* <Image src={data.product_details.images.featured_image} alt={data.product_details.title} fill={true} className="w-full h-40 object-cover mb-4" /> */}
                    <ProductCarousel products={productImages}/>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">{data.product_details.title}</h2>
                    <p className="text-xl font-medium mb-6">Price: ${data.product_details.sale.regular_price}</p>
                    <AddToCartBtn />
                    {/* onClick={() => {
                         const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
                         cart.push(product);
                         localStorage.setItem('cart', JSON.stringify(cart));
                         alert('Added to cart!');
                     }} */}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">More details:</h2>
                <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.product_details.description) }}></p>
            </div>


        </div>
    );
}