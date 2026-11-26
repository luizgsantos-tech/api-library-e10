export interface LivroDTO {
    id?: string;
    title: string;
    author: string;
    ano_pub: number;
    publisher: string;
    genre: string;
    pages: number;
    cover?: string | undefined;
}

export interface FiltroLivroDTO{
    editora?: string;
    genero?: string;
    autor?: string;
    titulo?: string;
}

export interface ILivroRepository{
    listar(): Promise<LivroDTO[]>;
    buscarPorId(id: string): Promise<LivroDTO | null>;
    buscarPorFiltro(filtros: FiltroLivroDTO): Promise<LivroDTO[]>;
    cadastrar(dados: LivroDTO): Promise<LivroDTO>;
    atualizar(id: string, dados: LivroDTO): Promise<LivroDTO | null>;
    atualizarParcial(id: string, dados:Partial<LivroDTO>): Promise<LivroDTO | null>;
    deletar(id: string): Promise<boolean>;
}