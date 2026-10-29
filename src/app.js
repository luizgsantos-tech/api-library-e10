import express from "express";

const app = express();

const livros = [
    {
        id: 1,
        title: "Sherlock Holmes: O Mistério"
    },

     {
        id: 2,
        title: "Cidade de Papel"
    }
]

app.get("/", (req, res) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

export default app;