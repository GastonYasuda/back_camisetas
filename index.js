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
            "SELECT * FROM public.camisetas"
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al consultar la base"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});