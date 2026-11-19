const currentYear = new Date().getFullYear();

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Livros",
    version: "1.0.0",
    description:
      "Documentação completa da API REST de gerenciamento de livros (CRUD e busca filtrada).",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  tags: [
    {
      name: "Livros",
      description: "Operações de consulta, busca, cadastro, atualização e remoção de livros",
    },
  ],
  components: {
    schemas: {
      Livro: {
        type: "object",
        required: ["title", "author", "ano_pub", "publisher", "genre", "pages"],
        properties: {
          _id: {
            type: "string",
            example: "673c9f1b2a4d8e1234567890",
            description: "Identificador único do livro no banco de dados",
          },
          title: {
            type: "string",
            minLength: 3,
            example: "Dom Casmurro",
            description: "Título do livro",
          },
          author: {
            type: "string",
            minLength: 3,
            example: "Machado de Assis",
            description: "Autor do livro",
          },
          ano_pub: {
            type: "integer",
            maximum: currentYear,
            example: 1899,
            description: "Ano de publicação",
          },
          publisher: {
            type: "string",
            minLength: 2,
            example: "Garnier",
            description: "Editora do livro",
          },
          genre: {
            type: "string",
            minLength: 3,
            example: "Romance",
            description: "Gênero literário",
          },
          pages: {
            type: "integer",
            minimum: 1,
            example: 256,
            description: "Número total de páginas",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://exemplo.com/capas/dom-casmurro.jpg",
            description: "URL da capa do livro (opcional)",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-11-19T16:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-11-19T16:00:00.000Z",
          },
        },
      },
      CriarLivroInput: {
        type: "object",
        required: ["title", "author", "ano_pub", "publisher", "genre", "pages"],
        properties: {
          title: {
            type: "string",
            minLength: 3,
            example: "Memórias Póstumas de Brás Cubas",
          },
          author: {
            type: "string",
            minLength: 3,
            example: "Machado de Assis",
          },
          ano_pub: {
            type: "integer",
            maximum: currentYear,
            example: 1881,
          },
          publisher: {
            type: "string",
            minLength: 2,
            example: "Tipografia Nacional",
          },
          genre: {
            type: "string",
            minLength: 3,
            example: "Realismo",
          },
          pages: {
            type: "integer",
            minimum: 1,
            example: 368,
          },
          cover: {
            type: "string",
            format: "uri",
            example: "https://exemplo.com/capas/bras-cubas.jpg",
          },
        },
      },
      AtualizarLivroParcialInput: {
        type: "object",
        properties: {
          title: {
            type: "string",
            minLength: 3,
            example: "Dom Casmurro (Edição Comentada)",
          },
          author: {
            type: "string",
            minLength: 3,
            example: "Machado de Assis",
          },
          ano_pub: {
            type: "integer",
            maximum: currentYear,
            example: 1899,
          },
          publisher: {
            type: "string",
            minLength: 2,
            example: "Companhia das Letras",
          },
          genre: {
            type: "string",
            minLength: 3,
            example: "Romance",
          },
          pages: {
            type: "integer",
            minimum: 1,
            example: 280,
          },
          cover: {
            type: "string",
            format: "uri",
            example: "https://exemplo.com/capas/dom-casmurro-nova.jpg",
          },
        },
      },
      ErroValidacao: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Erro de validação nos dados enviados.",
          },
          erros: {
            type: "array",
            items: {
              type: "object",
              properties: {
                campo: {
                  type: "string",
                  example: "pages",
                },
                mensagem: {
                  type: "string",
                  example: "O livro deve ter pelo menos 1 página.",
                },
              },
            },
          },
        },
      },
      ErroNaoEncontrado: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Livro não encontrado.",
          },
        },
      },
      ErroServidor: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Erro interno no servidor.",
          },
        },
      },
    },
  },
  paths: {
    "/livros": {
      get: {
        tags: ["Livros"],
        summary: "Listar todos os livros",
        description: "Retorna todos os livros cadastrados no banco de dados.",
        responses: {
          "200": {
            description: "Lista de livros retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Livro",
                  },
                },
                example: [
                  {
                    _id: "673c9f1b2a4d8e1234567890",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Garnier",
                    genre: "Romance",
                    pages: 256,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                ],
              },
            },
          },
          "400": {
            description: "Requisição inválida",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Recurso não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
              },
            },
          },
          "500": {
            description: "Erro ao buscar livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao buscar livro.",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Livros"],
        summary: "Cadastrar um novo livro",
        description:
          "Valida os dados com `criarLivroValidator` e cria um novo registro de livro.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarLivroInput",
              },
              example: {
                title: "Memórias Póstumas de Brás Cubas",
                author: "Machado de Assis",
                ano_pub: 1881,
                publisher: "Tipografia Nacional",
                genre: "Realismo",
                pages: 368,
                cover: "https://exemplo.com/capas/bras-cubas.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Operação concluída",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Livro cadastrado com sucesso!",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
              },
            },
          },
          "201": {
            description: "Livro cadastrado com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Livro cadastrado com sucesso!",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
                example: {
                  mensagem: "Livro cadastrado com sucesso!",
                  livro: {
                    _id: "673ca04e2a4d8e1234567891",
                    title: "Memórias Póstumas de Brás Cubas",
                    author: "Machado de Assis",
                    ano_pub: 1881,
                    publisher: "Tipografia Nacional",
                    genre: "Realismo",
                    pages: 368,
                    cover: "https://exemplo.com/capas/bras-cubas.jpg",
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados do livro",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
                example: {
                  mensagem: "Erro de validação nos dados enviados.",
                  erros: [
                    {
                      campo: "title",
                      mensagem: "O título deve ter pelo menos 3 caracteres.",
                    },
                  ],
                },
              },
            },
          },
          "404": {
            description: "Recurso não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
              },
            },
          },
          "500": {
            description: "Erro ao cadastrar livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao cadastrar livro.",
                },
              },
            },
          },
        },
      },
    },
    "/livros/busca": {
      get: {
        tags: ["Livros"],
        summary: "Buscar livros por filtros opcionais",
        description:
          "Filtra livros por `editora` (busca exata em `publisher`), `genero` (busca exata em `genre`), `autor` (busca parcial case-insensitive em `author`) e `titulo` (busca parcial case-insensitive em `title`).",
        parameters: [
          {
            in: "query",
            name: "editora",
            required: false,
            schema: {
              type: "string",
            },
            example: "Garnier",
            description: "Filtro exato pela editora (`publisher`)",
          },
          {
            in: "query",
            name: "genero",
            required: false,
            schema: {
              type: "string",
            },
            example: "Romance",
            description: "Filtro exato pelo gênero (`genre`)",
          },
          {
            in: "query",
            name: "autor",
            required: false,
            schema: {
              type: "string",
            },
            example: "Machado",
            description: "Filtro parcial (case-insensitive) pelo autor (`author`)",
          },
          {
            in: "query",
            name: "titulo",
            required: false,
            schema: {
              type: "string",
            },
            example: "Dom",
            description: "Filtro parcial (case-insensitive) pelo título (`title`)",
          },
        ],
        responses: {
          "200": {
            description: "Livros filtrados retornados com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Livro",
                  },
                },
                example: [
                  {
                    _id: "673c9f1b2a4d8e1234567890",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Garnier",
                    genre: "Romance",
                    pages: 256,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                ],
              },
            },
          },
          "201": {
            description: "Criado (não aplicável para GET)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
              },
            },
          },
          "400": {
            description: "Parâmetros de consulta inválidos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Nenhum livro encontrado para os filtros informados",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
              },
            },
          },
          "500": {
            description: "Erro ao filtrar livros.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao filtrar livros.",
                },
              },
            },
          },
        },
      },
    },
    "/livros/{id}": {
      get: {
        tags: ["Livros"],
        summary: "Buscar livro por ID",
        description: "Retorna um livro específico a partir do seu ID.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            example: "673c9f1b2a4d8e1234567890",
            description: "ID do livro",
          },
        ],
        responses: {
          "200": {
            description: "Livro encontrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
                example: {
                  _id: "673c9f1b2a4d8e1234567890",
                  title: "Dom Casmurro",
                  author: "Machado de Assis",
                  ano_pub: 1899,
                  publisher: "Garnier",
                  genre: "Romance",
                  pages: 256,
                  cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                },
              },
            },
          },
          "201": {
            description: "Criado (não aplicável para GET)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
              },
            },
          },
          "400": {
            description: "ID inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
                example: {
                  mensagem: "ID inválido.",
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
                example: {
                  mensagem: "Livro não encontrado.",
                },
              },
            },
          },
          "500": {
            description: "Erro ao buscar livro por ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao buscar livro por ID.",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Livros"],
        summary: "Atualizar completamente um livro",
        description:
          "Valida os dados com `criarLivroValidator` e substitui os dados do livro correspondente ao `id`.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            example: "673c9f1b2a4d8e1234567890",
            description: "ID do livro",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarLivroInput",
              },
              example: {
                title: "Dom Casmurro",
                author: "Machado de Assis",
                ano_pub: 1899,
                publisher: "Garnier",
                genre: "Romance",
                pages: 264,
                cover: "https://exemplo.com/capas/dom-casmurro.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Livro atualizado com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Livro atualizado com sucesso!",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
                example: {
                  mensagem: "Livro atualizado com sucesso!",
                  livro: {
                    _id: "673c9f1b2a4d8e1234567890",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Garnier",
                    genre: "Romance",
                    pages: 264,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                },
              },
            },
          },
          "201": {
            description: "Criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados ou ID inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado!",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
                example: {
                  mensagem: "Livro não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro ao atualizar livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao atualizar livro.",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Livros"],
        summary: "Atualizar parcialmente um livro",
        description:
          "Valida os campos enviados com `atualizarLivroValidator` e aplica atualização parcial (`$set`) no livro correspondente ao `id`.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            example: "673c9f1b2a4d8e1234567890",
            description: "ID do livro",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizarLivroParcialInput",
              },
              example: {
                pages: 280,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Livro atualizado parcialmente com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Livro atualizado parcialmente com sucesso!",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
                example: {
                  mensagem: "Livro atualizado parcialmente com sucesso!",
                  livro: {
                    _id: "673c9f1b2a4d8e1234567890",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Garnier",
                    genre: "Romance",
                    pages: 280,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                },
              },
            },
          },
          "201": {
            description: "Criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados ou ID inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado!",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
                example: {
                  mensagem: "Livro não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro ao atualizar parcialmente o livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao atualizar parcialmente o livro.",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Livros"],
        summary: "Remover um livro",
        description: "Remove o livro correspondente ao `id` informado.",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            example: "673c9f1b2a4d8e1234567890",
            description: "ID do livro",
          },
        ],
        responses: {
          "200": {
            description: "Livro removido com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Livro removido com sucesso!",
                    },
                  },
                },
                example: {
                  mensagem: "Livro removido com sucesso!",
                },
              },
            },
          },
          "201": {
            description: "Criado (não aplicável para DELETE)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "400": {
            description: "ID inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado!",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontrado",
                },
                example: {
                  mensagem: "Livro não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro ao remover livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidor",
                },
                example: {
                  mensagem: "Erro ao remover livro.",
                },
              },
            },
          },
        },
      },
    },
  },
} as const;