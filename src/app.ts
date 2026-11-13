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
});

//REQUISIÇÃO POST (CADASTRAR NOVO LIVRO) REFATORADO EM 12/11/2026
app.post("/livros", async (req: Request<{},{},InterfaceLivro>, res:Response) => {
});

//REQUISIÇÃO PUT (ATUALIZAR DADOS) REFATORADO EM 12/11/2026
app.put("/livros/:id", async (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) => {
});

//REQUISIÇÃO PATCH (ATUALIZAR PARCIALMENTE OS DADOS)
app.patch("/livros/:id", async (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) => {
    
});

//REQUISIÇÃO DELETE (EXCLUIR DADOS)
app.delete("/livros/:id", async (req: Request<{ id: string }>, res: Response) => {
});

export default app;