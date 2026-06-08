require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});


app.get("/", (req, res) => {
    res.status(200).send({ message: "API funcionando" });
});

//GET todas las camisetas
app.get("/camisetas", async (req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT * FROM camisetas"
        );

        res.json(resultado.rows);

    } catch (error) {
        console.error("ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
});

//GET una camiseta
app.get("/camisetas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT * FROM camisetas WHERE id_camiseta = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: "Camiseta no encontrada"
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});
