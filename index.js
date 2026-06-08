require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

//Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});

// app.get("/test-db", async (req, res) => {
//     try {
//         const resultado = await pool.query("SELECT NOW()");
//         res.json(resultado.rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


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


//POST una nueva camiseta
app.post("/camisetas", async (req, res) => {
    try {

        const {
            nombre,
            categoria,
            stock,
            precio
        } = req.body;

        const resultado = await pool.query(
            `INSERT INTO camisetas
            (nombre, categoria, stock, precio)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [nombre, categoria, stock, precio]
        );

        res.status(201).json({
            message: "Camiseta creada correctamente",
            camiseta: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

//PATCH valor de una camiseta

app.patch("/camisetas/:id", async (req, res) => {
    try {
        const { id } = Number(req.params.id);

        const { nombre, categoria, stock, precio } = req.body;

        const resultado = await pool.query(
            `UPDATE camisetas
                SET nombre = COALESCE($1,nombre),
                    categoria = COALESCE ($2, categoria),
                    stock = COALESCE ($3, stock)
                    precio = COALESCE ($4, precio)
                
                WHERE id_camiseta = $5
                RETURNING *`,
            [nombre, categoria, stock, precio]
        );

        if (resultado.rows.lenth === 0) {
            return res.status(400).json({
                error: "Camiseta no encontrada"
            })
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})