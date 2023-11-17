import React, { useState } from "react";
import api from "../../api/api";

const AddPage = () => {
    const [productName, setProductName] = useState("");
    const [value, setValue] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/products/create", {
                productName,
                value,
                code,
            });

            console.log(response.data);
        } catch (error) {
            console.error("Houve um erro:", error);
        }
    };

    return (
        <div className="AddPage">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="input-name">Nome</label>
                    <input
                        type="text"
                        id="input-name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="input-value">Valor: </label>
                    <input
                        type="number"
                        id="input-value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="input-code">Código: </label>
                    <input
                        type="number"
                        id="input-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <input type="submit" value="Adicionar" />
            </form>
        </div>
    );
};

export default AddPage;
