const router = require('express').Router()
const roomCategoryCtrl = require('../controllers/roomCategoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/room_category')
    .get(roomCategoryCtrl.getRoomCategories)
    .post(auth, roomCategoryCtrl.createRoomCategory)

router.route('/room_category/:id')
    .delete(auth, roomCategoryCtrl.deleteRoomCategory)
    .put(auth, roomCategoryCtrl.updateRoomCategory)


module.exports = router