import * as dotenv from "dotenv";

dotenv.config();

if(!process.env.DB_HOST || !process.env.DB || !process.env.DB_USER || !process.env.DB_PASS){
  console.error('Faltan parámetros de la base de datos');
  process.exit(1);
}

export const env = {
  DB_HOST: process.env.DB_HOST,
  DB: process.env.DB,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS
};