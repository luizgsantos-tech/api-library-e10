import  { z } from "zod";

//CRIAR AS REGRAS PARA CADASTRO (POST) E ATUALIZAÇÃO (PUT)
export const criarLivroValidator = z.object ({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
    author: z.string().min(3, "O autor deve ter pelo menos 3 caracteres."),
    ano_pub: z.number().int("O ano de publicação deve ser um número inteiro.").max(new Date().getFullYear()),
    publisher: z.string().min(2, "A editora deve ter pelo menos 2 caracteres."),
    genre: z.string().min(3, "A editora deve ter pelo menos 3 caracteres."),
    pages: z.number().int("O nº de páginas deve ser inteiro.").positive("O livro deve ter pelo menos 1 página."),
    cover: z
        .string()
        .url("A capa deve ser uma URL válida.")
        .optional()
        .or (z.literal(""))
        .transform((val) => (val === "" ? undefined:val)),
});

export const atualizarLivroValidator = criarLivroValidator.partial();

