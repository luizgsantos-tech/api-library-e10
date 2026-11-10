import mongoose, {Schema, Document} from "mongoose";

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
export interface InterfaceLivro extends Document{
    title: string;
    author:string;
    ano_pub:number;
}

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS

