import express from "express";

const app = express();

//MIDDLEWARE
app.use(express.json());

const livros = [
    {
        id: 1,
        title: "Sherlock Holmes: O Mistério",
        author: "Hans Donner",
        ano_pub: 1990
    },

     {
        id: 2,
        title: "Cidade de Papel",
        author: "Cora Coraline",
        ano_pub: 2016
    }
]

//FUNÇÕES
function buscaLivro(id){
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    });
}

//REQUISIÇÕES
app.get("/", (req, res) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

//REQUISIÇÃO POST (CADASTRAR NOVO LIVRO)
app.post("/livros", (req, res) => {
    const { id, title, author, ano_pub } = req.body;

    const novoLivro = {
        id,
        title,
        author,
        ano_pub
    };

    livros.push(novoLivro);

    res.status(201).json({
        mensagem: "Livro cadastrado com sucesso!",
        livro: novoLivro
    });
});

//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);

    const { title, author, ano_pub } = req.body;

    livros[index] = {
        ...livros[index],
        title,
        author,
        ano_pub
    };

    res.status(200).json({
        mensagem: "Livro atualizado com sucesso!",
        livro: livros[index]
    });
});

export default app;