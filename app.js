import express from 'express'
import config from './config/config.js'
import router from './router.js'
import sqlite3 from "sqlite3"
import {open} from 'sqlite'

const dbPromise = open({
    filename: config.pathToDb,
    driver: sqlite3.Database
});

const app = express()

const PORT = config.PORT;

app.use(express.json())
app.use(router)

async function startApp() {
    try {
        const db = await dbPromise

        await db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER NOT NULL UNIQUE,
                name TEXT NOT NULL,
                surname TEXT NOT NULL,
                items TEXT NOT NULL,
                PRIMARY KEY(id AUTOINCREMENT)
            );
`)

        await db.close()
        app.listen(PORT, () => console.log(`Server works on port: ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}

startApp()