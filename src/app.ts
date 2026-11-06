import express from "express";
import type { Request, Response } from "express";

export interface Livro {
    id: number;
    title: string;
    author: string;
    ano_pub: number;
}

const app = express();

//MIDDLEWARE
app.use(express.json());

const livros: Livro[] = [
    {
        id: 1,
        title: "Sherlock Holmes: O Mistério",
        author: "Hans Donner",
        ano_pub: 1990,
    },

     {
        id: 2,
        title: "Cidade de Papel",
        author: "Cora Coraline",
        ano_pub: 2016,
    }
]

//FUNÇÕES
function buscaLivro(id: string | number): number {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    });
}

//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/livros", (req: Request, res: Response) => {
    res.status(200).json(livros);
});

//REQUISIÇÃO POST (CADASTRAR NOVO LIVRO)
app.post("/livros", (req: Request, res:Response) => {
    const { id, title, author, ano_pub } = req.body;

    const novoLivro: Livro = {
        id: Number(id),
        title,
        author,
        ano_pub: Number(ano_pub),
    };

    livros.push(novoLivro);

    res.status(201).json({
        mensagem: "Livro cadastrado com sucesso!",
        livro: novoLivro
    });
});

//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));
   

    if(index === -1){
        res.status(404).json({mensagem: "Livro não encontrado!"});
        return;
    }

    const { title, author, ano_pub } = req.body;

  livros[index] = {
        ...livros[index]!,
        title,
        author,
        ano_pub: Number(ano_pub),
    };

    res.status(200).json({
        mensagem: "Livro atualizado com sucesso!",
        livro: livros[index]
    });
});

//REQUISIÇÃO PATCH (ATUALIZAR PARCIALMENTE OS DADOS)
app.patch("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));

    if(index === -1){
        res.status(404).json({mensagem: "Livro não encontrado!"});
        return;
    }

    const { title, author, ano_pub } = req.body;
  
    livros[index] = {
        ...livros[index]!,
        ...(title !== undefined && {title}),
        ...(author !== undefined && {author}),
        ...(ano_pub !== undefined && {ano_pub: Number(ano_pub)}),
    };

    res.status(200).json({
        mensagem: "Livro atualizado parcialmente com sucesso!",
        livro: livros[index]
    });
});

//REQUISIÇÃO DELETE (EXCLUIR DADOS)
app.delete("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));


    if (index === -1){
        res.status(404).json({mensagem: "Livro não encontrado!"});
        return;
    }

    //Remove o livro do array base (livros) com base no índice (id)
    livros.splice(index,1);

    res.status(200).json({
    mensagem: "Livro removido com sucesso!",
    });
});

export default app;