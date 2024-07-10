import { Router } from 'express'
import { login, me, register } from '../controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', verifyToken, me)

export default router
