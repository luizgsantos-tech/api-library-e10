//Importação para processamento do .env
import "dotenv/config";

//Motor responsável por traduzir os comandos JS/TS em consultas SQL
import { PrismaClient } from "@prisma/client/extension";

//Adaptador oficial do Prisma para o Postgre (utilizar driver JS Externo)
import { PrismaPg } from "@prisma/adapter-pg";

//Biblioteca postgre (node-postgre)
import pg from "pg";

//Processar a string de conexão com o Postgre que está no arquivo .env
const connectionString = process.env.POSTGRE_URL;

//Pool ("Piscina de conexões")
const pool = new pg.Pool ({ connectionString });

//Incorpora o Pool no nosso adaptador
const adapter = new PrismaPg(pool);

//Instancia o PrismaClient e passa o adaptador como configuração
const prisma = new PrismaClient ({adapter});

export default prisma;