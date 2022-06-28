const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')

router.post('/signup', authCtrl.signup)
router.post('/registerworker', authCtrl.signupWorker)
router.post('/login', authCtrl.login)
router.post('/loginworker', authCtrl.loginWorker)
router.get('/logout', authCtrl.logout)

module.exports = router;