import type {Request, Response} from "express";
import Livro, { type InterfaceLivro } from "../models/Livro.js";

class LivroController {

    //GET - LISTAR TODOS OS LIVROS DO BANCO
    static async listar (req: Request, res: Response) {
            try{
            const listaLivros = await Livro.find({});
            res.status(200).json(listaLivros);
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao buscar livro." });
        }
    }

    //GET - BUSCAR UM LIVRO ESPECÍFICO PELO ID - REQ PARAMS
    static async buscarPorId (req: Request<{ id: string }>, res: Response){
        try{
            const { id } = req.params;
            const livroEncontrado = await Livro.findById(id);

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
    static async buscarPorFiltro (req: Request, res: Response) {
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

            const livrosFiltrados = await Livro.find(filtro);

            res.status(200).json(livrosFiltrados);

        }catch (error){
            res.status(500).json({mensagem: "Erro ao filtrar livros."})
        }
    }

    //POST - CADASTRAR UM NOVO LIVRO NO BANCO
    static async cadastrar (req: Request<{},{},InterfaceLivro>, res:Response) {
            try{
            const { title, author, ano_pub, publisher, genre, pages, cover } = req.body;

            const novoLivro = await Livro.create({
                title,
                author,
                ano_pub: Number(ano_pub),
                publisher,
                genre,
                pages: Number(pages),
                cover
            });

            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!",
                livro: novoLivro
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao cadastrar livro."})
        }
    }

    //PUT - ATUALIZAÇÃO COMPLETA
    static async atualizar (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) {
        try{
                const { id } = req.params;
        
                const { title, author, ano_pub, publisher, genre, pages, cover } = req.body;
        
                const livroAtualizado = await Livro.findByIdAndUpdate(
                    id,
                    {
                        title,
                        author,
                        ano_pub: Number(ano_pub),
                        publisher,
                        genre,
                        pages: Number(pages),
                        cover
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
    }

      //PATCH - ATUALIZAÇÃO PARCIAL
    static async atualizarParcial (req: Request<{id: string}, {}, InterfaceLivro>, res: Response) {
            try{
                const { id } = req.params;

                const livroAtualizado = await Livro.findByIdAndUpdate(
                    id,
                    { $set: req.body },
                    { returnDocument: 'after' }
                );

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
    static async deletar (req: Request<{ id: string }>, res: Response) {
            try{
            const { id } = req.params;

            const livroDeletado = await Livro.findByIdAndDelete(id);


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

