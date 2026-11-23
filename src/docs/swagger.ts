export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gerenciamento de Livros",
    version: "1.0.0",
    description:
      "Documentação completa da API REST para cadastro, consulta, filtragem, atualização e remoção de livros.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de Desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Livros",
      description: "Operações relacionadas ao catálogo de livros",
    },
  ],
  paths: {
    "/livros": {
      get: {
        tags: ["Livros"],
        summary: "Listar todos os livros",
        description: "Retorna uma lista com todos os livros cadastrados no banco de dados.",
        responses: {
          "200": {
            description: "Lista de livros retornada com sucesso.",
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
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Editora Garnier",
                    genre: "Romance",
                    pages: 256,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                ],
              },
            },
          },
          "500": {
            description: "Erro interno no servidor ao buscar os livros.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
        description: "Valida os dados enviados e cadastra um novo livro no banco de dados.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarLivroRequest",
              },
              example: {
                title: "Dom Casmurro",
                author: "Machado de Assis",
                ano_pub: 1899,
                publisher: "Editora Garnier",
                genre: "Romance",
                pages: 256,
                cover: "https://exemplo.com/capas/dom-casmurro.jpg",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Livro cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
                example: {
                  mensagem: "Livro cadastrado com sucesso!",
                  livro: {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Editora Garnier",
                    genre: "Romance",
                    pages: 256,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados (Zod).",
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
          "500": {
            description: "Erro interno no servidor ao cadastrar o livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
        summary: "Filtrar livros por critérios opcionais",
        description:
          "Busca livros utilizando parâmetros de consulta (query params). Editora e gênero usam correspondência exata; autor e título usam busca parcial sem distinção entre maiúsculas e minúsculas.",
        parameters: [
          {
            name: "editora",
            in: "query",
            required: false,
            description: "Filtra pelo nome exato da editora (campo publisher).",
            schema: {
              type: "string",
            },
            example: "Editora Garnier",
          },
          {
            name: "genero",
            in: "query",
            required: false,
            description: "Filtra pelo gênero literário exato (campo genre).",
            schema: {
              type: "string",
            },
            example: "Romance",
          },
          {
            name: "autor",
            in: "query",
            required: false,
            description: "Filtra por correspondência parcial (case-insensitive) do nome do autor.",
            schema: {
              type: "string",
            },
            example: "Machado",
          },
          {
            name: "titulo",
            in: "query",
            required: false,
            description: "Filtra por correspondência parcial (case-insensitive) do título do livro.",
            schema: {
              type: "string",
            },
            example: "Dom",
          },
        ],
        responses: {
          "200": {
            description: "Lista de livros filtrados retornada com sucesso.",
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
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Editora Garnier",
                    genre: "Romance",
                    pages: 256,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                ],
              },
            },
          },
          "500": {
            description: "Erro interno no servidor ao filtrar os livros.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
        description: "Retorna os detalhes de um livro específico a partir do seu identificador.",
        parameters: [
          {
            $ref: "#/components/parameters/LivroIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Livro encontrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Livro",
                },
                example: {
                  _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                  title: "Dom Casmurro",
                  author: "Machado de Assis",
                  ano_pub: 1899,
                  publisher: "Editora Garnier",
                  genre: "Romance",
                  pages: 256,
                  cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Livro não encontrado.",
                },
              },
            },
          },
          "500": {
            description: "Erro interno no servidor ao buscar o livro por ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
          "Substitui todos os dados de um livro existente pelo ID. Exige todos os campos obrigatórios definidos no schema de criação.",
        parameters: [
          {
            $ref: "#/components/parameters/LivroIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarLivroRequest",
              },
              example: {
                title: "Memórias Póstumas de Brás Cubas",
                author: "Machado de Assis",
                ano_pub: 1881,
                publisher: "Tipografia Nacional",
                genre: "Romance",
                pages: 320,
                cover: "https://exemplo.com/capas/memorias-postumas.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Livro atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
                example: {
                  mensagem: "Livro atualizado com sucesso!",
                  livro: {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    title: "Memórias Póstumas de Brás Cubas",
                    author: "Machado de Assis",
                    ano_pub: 1881,
                    publisher: "Tipografia Nacional",
                    genre: "Romance",
                    pages: 320,
                    cover: "https://exemplo.com/capas/memorias-postumas.jpg",
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados (Zod).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
                example: {
                  mensagem: "Erro de validação nos dados enviados.",
                  erros: [
                    {
                      campo: "pages",
                      mensagem: "O livro deve ter pelo menos 1 página.",
                    },
                  ],
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Livro não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno no servidor ao atualizar o livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
          "Atualiza apenas os campos informados no corpo da requisição de um livro existente.",
        parameters: [
          {
            $ref: "#/components/parameters/LivroIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizarLivroRequest",
              },
              example: {
                publisher: "Companhia das Letras",
                pages: 280,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Livro atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                    },
                    livro: {
                      $ref: "#/components/schemas/Livro",
                    },
                  },
                },
                example: {
                  mensagem: "Livro atualizado parcialmente com sucesso!",
                  livro: {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    title: "Dom Casmurro",
                    author: "Machado de Assis",
                    ano_pub: 1899,
                    publisher: "Companhia das Letras",
                    genre: "Romance",
                    pages: 280,
                    cover: "https://exemplo.com/capas/dom-casmurro.jpg",
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados (Zod).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
                example: {
                  mensagem: "Erro de validação nos dados enviados.",
                  erros: [
                    {
                      campo: "cover",
                      mensagem: "A capa deve ser uma URL válida.",
                    },
                  ],
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Livro não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno no servidor ao atualizar parcialmente o livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
        description: "Remove permanentemente um livro do banco de dados a partir do seu ID.",
        parameters: [
          {
            $ref: "#/components/parameters/LivroIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Livro removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                    },
                  },
                },
                example: {
                  mensagem: "Livro removido com sucesso!",
                },
              },
            },
          },
          "404": {
            description: "Livro não encontrado para o ID informado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Livro não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno no servidor ao remover o livro.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
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
  components: {
    parameters: {
      LivroIdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "Identificador único do livro (ObjectId do MongoDB).",
        schema: {
          type: "string",
        },
        example: "65f1a2b3c4d5e6f7a8b9c0d1",
      },
    },
    schemas: {
      Livro: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "Identificador único gerado pelo MongoDB.",
            example: "65f1a2b3c4d5e6f7a8b9c0d1",
          },
          title: {
            type: "string",
            minLength: 3,
            description: "Título do livro.",
            example: "Dom Casmurro",
          },
          author: {
            type: "string",
            minLength: 3,
            description: "Nome do autor do livro.",
            example: "Machado de Assis",
          },
          ano_pub: {
            type: "integer",
            maximum: new Date().getFullYear(),
            description: "Ano de publicação do livro.",
            example: 1899,
          },
          publisher: {
            type: "string",
            minLength: 2,
            description: "Nome da editora.",
            example: "Editora Garnier",
          },
          genre: {
            type: "string",
            minLength: 3,
            description: "Gênero literário do livro.",
            example: "Romance",
          },
          pages: {
            type: "integer",
            minimum: 1,
            description: "Quantidade total de páginas.",
            example: 256,
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description: "URL válida da imagem de capa do livro (opcional).",
            example: "https://exemplo.com/capas/dom-casmurro.jpg",
          },
        },
        required: ["_id", "title", "author", "ano_pub", "publisher", "genre", "pages"],
      },
      CriarLivroRequest: {
        type: "object",
        required: ["title", "author", "ano_pub", "publisher", "genre", "pages"],
        properties: {
          title: {
            type: "string",
            minLength: 3,
            description: "Título do livro (mínimo de 3 caracteres).",
            example: "Dom Casmurro",
          },
          author: {
            type: "string",
            minLength: 3,
            description: "Nome do autor (mínimo de 3 caracteres).",
            example: "Machado de Assis",
          },
          ano_pub: {
            type: "integer",
            maximum: new Date().getFullYear(),
            description: "Ano de publicação (número inteiro, no máximo o ano atual).",
            example: 1899,
          },
          publisher: {
            type: "string",
            minLength: 2,
            description: "Nome da editora (mínimo de 2 caracteres).",
            example: "Editora Garnier",
          },
          genre: {
            type: "string",
            minLength: 3,
            description: "Gênero literário (mínimo de 3 caracteres).",
            example: "Romance",
          },
          pages: {
            type: "integer",
            minimum: 1,
            description: "Número de páginas (inteiro positivo, mínimo 1).",
            example: 256,
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description:
              "URL válida da capa do livro. Aceita string vazia (convertida para undefined) ou pode ser omitido.",
            example: "https://exemplo.com/capas/dom-casmurro.jpg",
          },
        },
      },
      AtualizarLivroRequest: {
        type: "object",
        properties: {
          title: {
            type: "string",
            minLength: 3,
            description: "Título do livro (mínimo de 3 caracteres).",
            example: "Dom Casmurro",
          },
          author: {
            type: "string",
            minLength: 3,
            description: "Nome do autor (mínimo de 3 caracteres).",
            example: "Machado de Assis",
          },
          ano_pub: {
            type: "integer",
            maximum: new Date().getFullYear(),
            description: "Ano de publicação (número inteiro, no máximo o ano atual).",
            example: 1899,
          },
          publisher: {
            type: "string",
            minLength: 2,
            description: "Nome da editora (mínimo de 2 caracteres).",
            example: "Companhia das Letras",
          },
          genre: {
            type: "string",
            minLength: 3,
            description: "Gênero literário (mínimo de 3 caracteres).",
            example: "Romance",
          },
          pages: {
            type: "integer",
            minimum: 1,
            description: "Número de páginas (inteiro positivo, mínimo 1).",
            example: 280,
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description:
              "URL válida da capa do livro. Aceita string vazia (convertida para undefined) ou pode ser omitido.",
            example: "https://exemplo.com/capas/dom-casmurro.jpg",
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
                  example: "title",
                },
                mensagem: {
                  type: "string",
                  example: "O título deve ter pelo menos 3 caracteres.",
                },
              },
            },
          },
        },
      },
      MensagemErro: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Livro não encontrado.",
          },
        },
      },
    },
  },
};