import mongoose, {Schema, Document, type InferSchemaType} from "mongoose";

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
// export interface InterfaceLivro extends Document{
//     title: string;
//     author:string;
//     ano_pub:number;
//     publisher:string;
//     genre:string;
//     pages:number;
// }

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const livroSchema = new Schema (
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        ano_pub: { type: Number, required: true },
        publisher: { type: String, required: true },
        genre: { type: String, required: true },
        pages: { type: Number, required: true },
    },
    { versionKey: false }
);

//EXTRAÇÃO AUTOMÁTICA DO TIPO (SUBSTITUIR A CRIAÇÃO MANUAL DA INTERFACE)
export type InterfaceLivro = InferSchemaType<typeof livroSchema>;

//CRIAÇÃO DO MODEL (MONGOOSE)
const Livro = mongoose.model("Livro", livroSchema);

//DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Livro;
