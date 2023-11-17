import React, { useState } from "react";
import api from "../../api/api";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        borderRadius: "10px",
        // marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);

    const [productName, setProductName] = useState("");
    const [value, setValue] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setProducts([]);

        try {
            const response = await api.get(`/api/products/view?query=${query}`);

            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // MODAL

    const handleSubmitModalCreate = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/products/create", {
                productName,
                value,
                code,
            });

            console.log("Produto criado com sucesso!");
            setProductName("");
            setValue("");
            setCode("");
        } catch (error) {
            console.error("Houve um erro:", error);
        }
    };

    const handleSubmitModalDelete = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/products/delete", {
                code,
            });

            console.log("Produto deletado com sucesso!");
        } catch (error) {
            console.error("Houve um erro ao deletar o produto!");
        }
    };

    // let subtitle;
    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

    const openModalCreate = () => {
        setModalCreateIsOpen(true);
    };

    const openModalDelete = () => {
        setModalDeleteIsOpen(true);
    };

    // const afterOpenModal = () => {
    //     subtitle.style.color = "#f00";
    // };

    const closeModalCreate = () => {
        setModalCreateIsOpen(false);
    };

    const closeModalDelete = () => {
        setModalDeleteIsOpen(false);
    };

    return (
        <div id="SearchPage">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
            {products.length > 0 && (
                <div>
                    <h2>Resultados da Pesquisa:</h2>
                    <ul>
                        {products.map((product) => (
                            <li
                                key={product._id}
                                style={{
                                    border: "1px solid white",
                                    width: "20%",
                                    padding: "20px",
                                    borderRadius: "5px",
                                    color: "white",
                                    marginTop: "20px",
                                }}
                            >
                                <p>Nome: {product.productName}</p>
                                <p>Valor: R${product.value}</p>
                                <p>Código: {product.code}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <button onClick={openModalCreate}>Create</button>
                <Modal
                    isOpen={modalCreateIsOpen}
                    onRequestClose={closeModalCreate}
                    style={customStyles}
                    contentLabel="Example Modal"
                    appElement={document.getElementById("App")}
                >
                    <div className="modal-style">
                        <h2>Adicionar Produtos</h2>
                        <form onSubmit={handleSubmitModalCreate}>
                            <div className="input-modal">
                                <input
                                    type="text"
                                    id="input-name"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    placeholder="Nome"
                                />
                                <input
                                    type="number"
                                    id="input-value"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Valor"
                                />
                                <input
                                    type="number"
                                    id="input-code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Código"
                                />
                            </div>
                            <div className="button-model">
                                <button type="submit" id="button-create">
                                    Adicionar
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModalCreate}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
            <div>
                <button onClick={openModalDelete}>Delete</button>
                <Modal
                    isOpen={modalDeleteIsOpen}
                    onRequestClose={closeModalDelete}
                    style={customStyles}
                    contentLabel="Example Modal"
                    appElement={document.getElementById("App")}
                >
                    <div className="modal-style">
                        <h2>Remover Produtos</h2>
                        <form onSubmit={handleSubmitModalDelete}>
                            <div className="input-modal">
                                <input
                                    type="number"
                                    id="input-code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Código"
                                />
                            </div>
                            <div className="button-model">
                                <button id="button-delete" type="submit">
                                    Deletar
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModalDelete}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default SearchPage;
