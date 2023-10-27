const product = require("../models/productSchema");

module.exports = {
    async create(req, res) {
        const { code, productName, value } = req.body;

        try {
            const newProduct = new product({
                code,
                productName,
                value,
            });

            const productExist = await product.findOne({ code });

            if (productExist) {
                res.status(400).json({
                    message: "Este produto já está cadastrado.",
                });
            }

            await newProduct.save();
            res.status(201).json({
                message: "Usuário registrado com sucesso.",
            });
        } catch (error) {
            res.status(500).json({ message: "Erro ao registrar o usuário." });
        }
    },

    async read(req, res) {
        const { query } = req.query;

        let filter = {};

        const isNumeric = !isNaN(query);

        if (isNumeric) {
            filter = { code: parseInt(query) };
        } else {
            filter = { productName: { $regex: query, $options: "i" } };
        }

        console.log("Valor de query:", query);
        console.log("Filtro de pesquisa:", JSON.stringify(filter));

        try {
            const products = await product.find(filter);

            if (products.length > 0) {
                return res.json(products);
            } else {
                return res.status(401).json({
                    message:
                        "Não foi encontrado nenhum produto com o parâmetro fornecido.",
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Erro ao buscar produtos." });
        }
    },
};
