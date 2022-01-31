import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT ?? 5000;
const pathToDb = path.resolve(__dirname, "db", "projectdb.db");

export default {PORT, pathToDb};