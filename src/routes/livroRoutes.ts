//IMPORTA O MÉTODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTA O CONTROLLER DE LIVROS
import LivroController from "../controllers/livroControler.js";

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//1º - ROTAS FIXAS E DE BUSCA
router.get("/livros", LivroController.listar);
router.get("/livros/busca", LivroController.buscarPorFiltro);

//2º - ROTAS DE BUSCA COM PARÂMETRO DINÂMICO
router.get("/livros/:id", LivroController.buscarPorId);

//3º - ROTAS DE ESCRITA E REMOÇÃO (ESTÁTICAS E DINÂMICAS)
router.post("/livros", LivroController.cadastrar);
router.put("/livros/:id", LivroController.atualizar);
router.patch("/livros/:id", LivroController.atualizarParcial);
router.delete("/livros/:id", LivroController.deletar);

//EXPORTA AS ROTAS CONFIGURADAS PARA SEREM USADAS NO APP.TS
export default router;
