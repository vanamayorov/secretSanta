import MainService from "../services/MainService.js"

class MainController {
    async main(req, res) {
        try {
            const receivedObj = await MainService.main(req.body)
            res.json(receivedObj)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async recipient(req, res) {
        try {
            const recipientObj = await MainService.recipient(req.params.id)
            res.json(recipientObj)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async shuffle(req, res) {
        try {
            const shuffleObj = await MainService.shuffle()
            res.json(shuffleObj)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new MainController()