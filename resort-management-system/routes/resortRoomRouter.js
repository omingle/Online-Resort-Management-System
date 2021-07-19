const router = require('express').Router()
const resortRoomCtrl = require('../controllers/resortRoomCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/rooms')
    .get(resortRoomCtrl.getResortRooms)
    .post(auth, authAdmin, resortRoomCtrl.createResortRoom)


router.route('/rooms/:id')
    .delete(auth, authAdmin, resortRoomCtrl.deleteResortRoom)
    .put(auth, authAdmin, resortRoomCtrl.updateResortRoom)


module.exports = router