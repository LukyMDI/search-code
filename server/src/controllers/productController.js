const product = require("../models/productSchema");

module.exports = {
    async create(req, res) {
        const { code, productName, value } = req.body;

        if (!code || !productName || !value) {
            return res.status(400).json({
                message:
                    "Certifique-se de preencher todos os campos obrigatórios!",
            });
        }

        try {
            const newProduct = new product({
                code,
                productName,
                value,
            });

            const productExist = await product.findOne({ code });

            if (productExist) {
                return res.status(400).json({
                    message: "Este produto já está cadastrado.",
                });
            }

            await newProduct.save();
            res.status(201).json({
                message: "Produto cadastrado com sucesso.",
            });
        } catch (error) {
            res.status(500).json({
                message: "Houve um erro interno ao cadastrar o produto!",
            });
        }
    },

    async read(req, res) {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Você precisa inserir algum parâmetro de busca.",
            });
        }

        let filter = {};

        const isNumeric = !isNaN(query);

        if (isNumeric) {
            filter = { code: parseInt(query) };
        } else {
            filter = { productName: { $regex: query, $options: "i" } };
        }

        try {
            const products = await product.find(filter);

            if (products.length > 0) {
                return res.json(products);
            } else {
                return res.status(400).json({
                    message:
                        "Não foi encontrado nenhum produto com o parâmetro fornecido.",
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Erro interno ao buscar os produtos." });
        }
    },

    async delete(req, res) {
        const { code } = req.body;

        try {
            const productDelete = await product.findOneAndDelete({
                code: code,
            });

            if (productDelete) {
                return res.json(productDelete);
            }

            res.status(400).json({
                message: "Não foi encontrato nenhum produto com este código!",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Houve um erro interno ao deletar o produto.",
            });
        }
    },
};
