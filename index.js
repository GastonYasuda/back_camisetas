require("dotenv").config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

console.log(process.env.DATABASE_URL);



const express = require("express");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});


app.get("/debug", (req, res) => {
    res.json({
        databaseUrl: process.env.DATABASE_URL
    });
});


app.get("/", (req, res) => {
    res.status(200).send({ message: "API funcionando" });
});


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

// app.get("/camisetas/:id_camiseta", (req, res) => {
//     const id = req.params.id_camiseta;
//     console.log('estoy andando');

//     if (id !== '') {
//         const camisetaEncontrada = camisetas.find(
//             (camiseta) => camiseta.id_camiseta === id
//         )
//         if (camisetaEncontrada) {
//             res.status(200).json(camisetaEncontrada)
//         } else {
//             res.status(404).json({ message: "Camiseta no encontrada" })
//         }
//     }
// })

