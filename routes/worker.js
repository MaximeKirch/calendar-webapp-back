const express= require('express')
const router = express.Router()
const workerCtrl = require('../controllers/worker')
const auth = require('../middleware/auth')

router.get('/', workerCtrl.getAllWorkers)
router.get('/:id', workerCtrl.getOneWorker)
router.put('/:id', auth, workerCtrl.modifyWorker)
router.delete('/:id', auth, workerCtrl.deleteWorker)

module.exports = router