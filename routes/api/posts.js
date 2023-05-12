const express = require('express')
const router = express.Router();
const postCtrl = require('../../controllers/posts');
const multer = require('multer')
const upload = multer()

router.post('/', upload.single('photo'), postCtrl.create)
router.get('/', postCtrl.index)


module.exports = router;