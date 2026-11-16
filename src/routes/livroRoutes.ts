//IMPORTA O MÉTODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTA O CONTROLLER DE LIVROS
import LivroController from "../controllers/livroControler.js";

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//CRIAÇÃO DE ROTAS DA ENTIDADE LIVRO
router.get("/livros", LivroController.listar);
router.post("/livros", LivroController.cadastrar);
router.put("/livros/:id", LivroController.atualizar);
router.patch("/livros/:id", LivroController.atualizarParcial);
router.delete("/livros/:id", LivroController.deletar);

//EXPORTA AS ROTAS CONFIGURADAS PARA SEREM USADAS NO APP.TS
export default router;
