import express from "express";
import type { Request, Response } from "express";
import Livro, { type InterfaceLivro } from "./models/Livro.js";


const app = express();

//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);


//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

//REQUISIÇÃO GET REFATORADO EM 11/11/2026
app.get("/livros", async (req: Request, res: Response) => {
    try{
        const listaLivros = await Livro.find({});
        res.status(200).json(listaLivros);
    }catch (error){
        res.status(500).json({ mensagem: "Erro ao buscar livro." });
    }
    
});

//REQUISIÇÃO POST (CADASTRAR NOVO LIVRO) REFATORADO EM 12/11/2026
app.post("/livros", async (req: Request<{},{},InterfaceLivro>, res:Response) => {
    
    try{
        const { title, author, ano_pub, publisher, genre, pages } = req.body;

        const novoLivro = await Livro.create({
            title,
            author,
            ano_pub: Number(ano_pub),
            publisher,
            genre,
            pages: Number(pages),
        });

        res.status(201).json({
            mensagem: "Livro cadastrado com sucesso!",
            livro: novoLivro
        });
    }catch (error){
        res.status(500).json({mensagem: "Erro ao cadastrar livro."})
    }
    });

//REQUISIÇÃO PUT (ATUALIZAR DADOS) REFATORADO EM 12/11/2026
app.put("/livros/:id", async (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) => {
    try{
        const { id } = req.params;

        const { title, author, ano_pub, publisher, genre, pages } = req.body;

        const livroAtualizado = await Livro.findByIdAndUpdate(
            id,
            {
            title,
                author,
                ano_pub: Number(ano_pub),
                publisher,
                genre,
                pages: Number(pages),
            },
            {new: true}
        );

        if(!livroAtualizado){
            res.status(404).json({mensagem: "Livro não encontrado!"});
            return;
        }

        res.status(200).json({
            mensagem: "Livro atualizado com sucesso!",
            livro: livroAtualizado
        });
    } catch (error){
        res.status(500).json({mensagem: "Erro ao atualizar livro."})
    }
});

//REQUISIÇÃO PATCH (ATUALIZAR PARCIALMENTE OS DADOS)
app.patch("/livros/:id", (req: Request, res: Response) => {
    const index = buscaLivro(String(req.params.id));

    if(index === -1){
        res.status(404).json({mensagem: "Livro não encontrado!"});
        return;
    }

    const { id, title, author, ano_pub, publisher, genre, pages } = req.body;
  
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