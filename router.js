import Router from 'express'
import MainController from "./controllers/MainController.js";

const router = new Router()

router.get('/recipient/:id', MainController.recipient)

router.post('/', MainController.main)

router.post('/shuffle', MainController.shuffle)

export default router