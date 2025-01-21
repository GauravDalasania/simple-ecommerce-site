interface ProductDetailsProps {
    params: {
        id: string;
    };
}
interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}

async function fetchProduct(id: string): Promise<Product> {
    const res = await fetch(`${process.env.API_BASE_URL}/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product details');
    return res.json();
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
    const product = await fetchProduct(params.id);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <img src={product.image} alt={product.name} className="w-full max-w-md mb-4" />
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-medium mb-6">Price: ${product.price}</p>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => {
                    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
                    cart.push(product);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert('Added to cart!');
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}