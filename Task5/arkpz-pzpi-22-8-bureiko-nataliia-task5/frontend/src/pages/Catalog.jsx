import { getProducts } from "../api";
import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";

export function Catalog() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadAllProducts() {
            const data = await getProducts();
            setProducts(data);
        }

        loadAllProducts();
    }, []);

    return (
        <div>
            {products.map((product) => (
                <ProductCard product={product} />
            ))}
        </div>
    );
}
