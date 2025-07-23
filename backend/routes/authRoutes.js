let express = require('express')
let multer = require('multer')
let path = require('path')
const { users, login, register, addPost } = require('../controllers/authControllers')
const { limiter, authenticateToken } = require('../middleware/authMiddleware')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req,file,cb)=>cb(null, 'uploads/'),
  filename: (req,file,cb)=>cb(null,Date.now()+ path.extname(file.originalname))
})

const fileFilter = (req,file,cb)=>{
    let allowed = ['image/jpeg','image/png','image/jpg']
    cb(null,allowed.includes(file.mimetype))
}

let upload = multer({storage,fileFilter})

router.get('/users',users)

router.post('/login',limiter,login)

router.post('/register',limiter,register)

router.post('/addPost', authenticateToken,upload.single('image'), addPost)

module.exports = router