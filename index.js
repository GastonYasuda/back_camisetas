require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", (req, res) => {
    res.send("API funcionando");
});


app.get("/camisetas", async (req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT * FROM camisetas"
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al consultar la base"
        });
    }
});

app.get("/camisetas/:id_camiseta", (req, res) => {
    const id = req.params.id_camiseta;
    console.log('estoy andando');

    if (id !== '') {
        const camisetaEncontrada = camisetas.find((camiseta) => {
            camiseta.id_camiseta === id
        })
        if (camisetaEncontrada) {
            res.status(200), json(camisetaEncontrada)
        } else {
            res.status(404).json({ message: "Camiseta no encontrada" })
        }

    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});