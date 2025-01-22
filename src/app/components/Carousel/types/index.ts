import { ProductGallery } from "@/app/products/types";

export interface Product extends ProductGallery {
  id: number;
}

export interface ProductCarouselProps {
  products: Product[];
}