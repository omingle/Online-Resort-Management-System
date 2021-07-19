const router = require('express').Router()
const resortCtrl = require('../controllers/resortCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/resorts')
    .get(resortCtrl.getResorts)
    .post(auth, authAdmin, resortCtrl.createResort)


router.route('/resorts/:id')
    .delete(auth, authAdmin, resortCtrl.deleteResort)
    .put(auth, authAdmin, resortCtrl.updateResort)


module.exports = router