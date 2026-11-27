import prisma from "../config/dbConnectPostgres.js";
import type {
    ILivroRepository,
    LivroDTO,
    FiltroLivroDTO,
} from "./ILivroRepository.js";

interface LivroUpdateInput {
    title?: string;
    author?: string;
    ano_pub?: number;
    publisher?: string;
    genre?: string;
    pages?: number;
    cover?: string;
}

function isRecordNotFoundError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2025"
    );
}

export class PostgresLivroRepository implements ILivroRepository {
    async listar(): Promise<LivroDTO[]> {
        return await prisma.livro.findMany();
    }

    async buscarPorId(id: string): Promise<LivroDTO | null> {
        return await prisma.livro.findUnique({
            where: { id },
        });
    }

    async buscarPorFiltro(filtros: FiltroLivroDTO): Promise<LivroDTO[]> {
        const where: {
            publisher?: string;
            genre?: string;
            author?: { contains: string; mode: "insensitive" };
            title?: { contains: string; mode: "insensitive" };
        } = {};

        if (filtros.editora) {
            where.publisher = filtros.editora;
        }

        if (filtros.genero) {
            where.genre = filtros.genero;
        }

        if (filtros.autor) {
            where.author = {
                contains: filtros.autor,
                mode: "insensitive",
            };
        }

        if (filtros.titulo) {
            where.title = {
                contains: filtros.titulo,
                mode: "insensitive",
            };
        }

        return await prisma.livro.findMany({ where });
    }

    async cadastrar(dados: LivroDTO): Promise<LivroDTO> {
        return await prisma.livro.create({
            data: {
                title: dados.title,
                author: dados.author,
                ano_pub: Number(dados.ano_pub),
                publisher: dados.publisher,
                genre: dados.genre,
                pages: Number(dados.pages),
                ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
            },
        });
    }

    async atualizar(id: string, dados: LivroDTO): Promise<LivroDTO | null> {
        try {
            return await prisma.livro.update({
                where: { id },
                data: {
                    title: dados.title,
                    author: dados.author,
                    ano_pub: Number(dados.ano_pub),
                    publisher: dados.publisher,
                    genre: dados.genre,
                    pages: Number(dados.pages),
                    ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
                },
            });
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                return null;
            }
            throw error;
        }
    }

    async atualizarParcial(id: string, dados: Partial<LivroDTO>): Promise<LivroDTO | null> {
        const data: LivroUpdateInput = {};

        if (dados.title !== undefined) data.title = dados.title;
        if (dados.author !== undefined) data.author = dados.author;
        if (dados.ano_pub !== undefined) data.ano_pub = Number(dados.ano_pub);
        if (dados.publisher !== undefined) data.publisher = dados.publisher;
        if (dados.genre !== undefined) data.genre = dados.genre;
        if (dados.pages !== undefined) data.pages = Number(dados.pages);
        if (dados.cover !== undefined) data.cover = dados.cover;

        try {
            return await prisma.livro.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                return null;
            }
            throw error;
        }
    }

    async deletar(id: string): Promise<boolean> {
        try {
            await prisma.livro.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            if (isRecordNotFoundError(error)) {
                return false;
            }
            throw error;
        }
    }
}