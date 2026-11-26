import type {Request, Response} from "express";
import Livro, { type InterfaceLivro } from "../models/Livro.js";
import type { ILivroRepository, LivroDTO, FiltroLivroDTO } from "../repositories/ILivroRepository.js";

class LivroController {

    private livroRepository: ILivroRepository;

    constructor(livroRepository: ILivroRepository){
        this.livroRepository = livroRepository;
    }

    //GET - LISTAR TODOS OS LIVROS DO BANCO
    async listar (req: Request, res: Response) {
            try{
            const listaLivros = await this.livroRepository.listar();
            res.status(200).json(listaLivros);
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao buscar livro." });
        }
    }

    //GET - BUSCAR UM LIVRO ESPECÍFICO PELO ID - REQ PARAMS
    async buscarPorId (req: Request<{ id: string }>, res: Response){
        try{
            const { id } = req.params;
            const livroEncontrado = await this.livroRepository.buscarPorId(id);

            if(!livroEncontrado) {
                res.status(404).json({mensagem: "Livro não encontrado."});
                return;
            }

            res.status(200).json(livroEncontrado);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar livro por ID."})
        }
    }

    //GET - FILTRAR LIVROS POR CRITÉRIOS OPCIONAIS - REQ QUERY
    async buscarPorFiltro (req: Request, res: Response) {
        try{
            //Extrair os possíveis filtros enviados após o "?" na URL
            const { editora, genero, autor, titulo,  } = req.query;

            //Criar um objeto vazio para receber apenas os filtros preenchidos
            const filtro: Record<string, any> = {};

            if(editora) {
                filtro.publisher = String(editora); //Busca exata
            }

            if(genero){
                filtro.genre = String(genero); //Busca exata
            }

            if(autor){
                 //$regex: busca parcial (ex: "Machado", encontra "Machado de Assis...")
                filtro.author = { $regex: String(autor), $options:"i"}
            }

            if(titulo){
                 //$regex: busca parcial (ex: "Dom", encontra "Dom Casmurro")
                filtro.title = { $regex: String(titulo), $options:"i"}
            }

            const livrosFiltrados = await this.livroRepository.buscarPorFiltro(filtro);

            res.status(200).json(livrosFiltrados);

        }catch (error){
            res.status(500).json({mensagem: "Erro ao filtrar livros."})
        }
    }

    //POST - CADASTRAR UM NOVO LIVRO NO BANCO
    async cadastrar (req: Request<{},{},InterfaceLivro>, res:Response) {
            try{
            const novoLivro = await this.livroRepository.cadastrar(req.body);

            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!",
                livro: novoLivro
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao cadastrar livro."})
        }
    }

    //PUT - ATUALIZAÇÃO COMPLETA
    async atualizar (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) {
        try{
                const { id } = req.params;
                const livroAtualizado = await this.livroRepository.atualizar(id, req.body);
        
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
    }

      //PATCH - ATUALIZAÇÃO PARCIAL
    async atualizarParcial (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) {
            try{
                const { id } = req.params;

                const livroAtualizado = await this.livroRepository.atualizarParcial(id, req.body);

                if(!livroAtualizado){
                    res.status(404).json({mensagem: "Livro não encontrado!"});
                    return;
                }

                res.status(200).json({
                    mensagem: "Livro atualizado parcialmente com sucesso!",
                    livro: livroAtualizado,
                });
        }catch(error){
                res.status(500).json({mensagem: "Erro ao atualizar parcialmente o livro."});
        }
    }

     //DELETE - REMOVER LIVRO
    async deletar (req: Request<{ id: string }>, res: Response) {
            try{
            const { id } = req.params;

            const livroDeletado = await this.livroRepository.deletar(id);


            if (!livroDeletado){
                res.status(404).json({mensagem: "Livro não encontrado!"});
                return;
            }

            res.status(200).json({
                mensagem: "Livro removido com sucesso!",
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao remover livro."});
        }
    }
};

export default LivroController;

