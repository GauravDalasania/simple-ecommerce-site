export interface Product {
    id: string;
    title: string;
    inventory: Inventory;
    slug: string;
    categories: Category[];
    pre_order: boolean;
    type: string;
    images: Images;
    label: Label;
    ad: boolean;
    ad_id: string;
    rating: string;
    stock: Stock;
    sale: Sale;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Images {
    featured_image: string;
    featured_video: null;
    other_images: any[];
    gallery_images: GalleryImage[];
}

export interface GalleryImage {
    image: string;
    thumbnail: string;
    medium: string;
    full: string;
}

export interface Inventory {
    sku: string;
}

export interface Label {
    label_text: string;
    sub_label_text: null;
    icon_type: string;
    color_code: string;
}

export interface Sale {
    currency: string;
    regular_price: number;
    offer_price: number;
    offer_label: string;
    offer_type: string;
    member_price: number;
    subscription_price: number;
}

export interface Stock {
    max: number;
    delivery_icons: DeliveryIcon[];
}

export interface DeliveryIcon {
    until: string;
    icon: string;
    label: string;
}

export interface FetchProductsResponse {
    data: {
        products: Product[]
    }
}

export interface SearchParams {
    take?: number;
    page?: number;
    search?: string;
    sort?: string;
}

export interface ProductGallery {
    image: string;
    thumbnail: string;
    medium: string;
    full: string;
}