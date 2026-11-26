import Livro from "../models/Livro.js";
import type { ILivroRepository, LivroDTO, FiltroLivroDTO } from "./ILivroRepository.js";

export class MongoLivroRepository implements ILivroRepository {

    async listar() {
        return await Livro.find({});
    }

    async buscarPorId(id: string){
        return await Livro.findById(id);
    }

    async buscarPorFiltro(filtros: FiltroLivroDTO){
        const filtro: Record<string, any> = {};

        if(filtros.editora) filtro.publisher = filtros.editora;
        if(filtros.genero) filtro.genre = filtros.genero;
        if(filtros.autor){
            filtro.author = { $regex: filtros.autor, $options: "i"};
        }
        if(filtros.titulo){
            filtro.title = { $regex: filtros.titulo, $options: "i"};
        }
        return await Livro.find(filtro);
    }

    async cadastrar(dados:LivroDTO){
        return await Livro.create({
                title: dados.title,
                author: dados.author,
                ano_pub: Number(dados.ano_pub),
                publisher: dados.publisher,
                genre: dados.genre,
                pages: Number(dados.pages),
                ...(dados.cover !== undefined ? { cover: dados.cover }: {}),
            });
    }

    async atualizar (id: string, dados:LivroDTO){
        return await Livro.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
    }

    async atualizarParcial(id: string, dados: Partial<LivroDTO>){
        return await Livro.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        )
    }

    async deletar (id: string){
        const livroDeletado = await Livro.findByIdAndDelete(id);
        return Boolean(livroDeletado);    }



}