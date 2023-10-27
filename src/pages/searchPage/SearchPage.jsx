import React, { useState } from "react";
import api from "../../api/api";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.get(`/api/products/view?query=${query}`);

            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            {products.length > 0 && (
                <div>
                    <h2>Resultados da Pesquisa:</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <p>Nome: {product.productName}</p>
                                <p>Valor: {product.value}</p>
                                <p>Código: {product.code}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
