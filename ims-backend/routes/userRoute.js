import express from 'express'
import { signup ,login , logout,getUser} from '../controllers/userController.js'
import { protectRoute } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/user',protectRoute,getUser)

// router.put('/update-profile',protectRoute,updateProfile)
export default router