import Validate from '../validation/Validate.js'
import config from "../config/config.js"
import functions from '../util/functions.js'
import {open} from "sqlite"
import sqlite3 from "sqlite3"

class MainService {
    async main(obj) {
        let userObj = {};

        if (!Validate.validateObj(obj)) {
            return;
        }

        let dbPromise = await open({
            filename: config.pathToDb,
            driver: sqlite3.Database
        })
        try {
            let db = await dbPromise
            let sql = `
                CREATE TABLE IF NOT EXISTS users 
                (id INTEGER NOT NULL UNIQUE,
                name TEXT NOT NULL,
                surname TEXT NOT NULL,
                items TEXT NOT NULL,
                PRIMARY KEY(id AUTOINCREMENT))`
            await db.run(sql)

            sql = "SELECT * FROM users WHERE name=? AND surname=?"
            const data = await db.get(sql, [obj.name, obj.surname])
            if (!data) {
                sql = "INSERT INTO users (id, name, surname, items) VALUES (NULL, ?, ?, ?)"
                await db.run(sql, [obj.name, obj.surname, obj.wishlist.join(",")])


                sql = "SELECT * FROM users WHERE name=? AND surname=?"

                const userId = await db.get(sql, [obj.name, obj.surname])

                userObj = {
                    "userId": userId.id,
                    "message": "Successfully added to take part in the game"
                }

            } else {
                userObj = {
                    "userId": data.id,
                    "message": "You already take part in the game"
                }
                await db.close()
            }
        } catch (e) {
            throw new Error(e)
        }

        return userObj
    }

    async shuffle() {
        let dbPromise = await open({
            filename: config.pathToDb,
            driver: sqlite3.Database
        });

        try {
            let db = await dbPromise

            let sql = `
            CREATE TABLE IF NOT EXISTS gamers_pairs (
                id INTEGER NOT NULL UNIQUE,
                sender_id INTEGER NOT NULL,
                recipient_id INTEGER NOT NULL,
                PRIMARY KEY(id AUTOINCREMENT)
            );`
            await db.run(sql)

            sql = "SELECT * FROM gamers_pairs"
            let check = await db.all(sql)

            if (check.length) {
                await db.close()

                return {
                    msg: "You can shuffle only once"
                }
            }

            sql = "SELECT * FROM users"
            const data = await db.all(sql)
            if (data.length < 3 || data.length > 500) {
                await db.close()

                return {
                    msg: "Not enough/too much players to start the game"
                }
            }

            const idArr = data.map(item => item.id)
            const pairsArr = functions.shuffleArrayCompleted(idArr)

            for (let i = 0; i < idArr.length; i++) {
                sql = "INSERT INTO gamers_pairs (id, sender_id, recipient_id) VALUES (NULL, ?, ?)"
                await db.run(sql, [idArr[i], pairsArr[i]])
            }

            await db.close()
        } catch (e) {
            throw new Error(e)
        }
        return {msg: "Successfully shuffled"}
    }

    async recipient(id) {
        let recipientObj = {}
        if (!id) {
            throw new Error("Id not specified")
        }

        let dbPromise = await open({
            filename: config.pathToDb,
            driver: sqlite3.Database
        });

        try {
            let db = await dbPromise

            let sql = "SELECT recipient_id FROM gamers_pairs WHERE sender_id = ?"
            const recipientObjInPairsTable = await db.get(sql, id)
            sql = "SELECT name, surname, items FROM users WHERE id = ?"
            recipientObj = await db.get(sql, recipientObjInPairsTable["recipient_id"])
            await db.close()
        } catch (e) {
            throw new Error(e)
        }

        return recipientObj

    }

}

export default new MainService()