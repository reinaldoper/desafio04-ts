import { LoginControler } from './controllers/LoginControler';
import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authenticateToken} from './middleware/validateToken'

export const router = Router()

const userController = new UserController()
const loginControler = new LoginControler()

router.post('/user', userController.createUser)
router.get('/user', authenticateToken, userController.getUser)
router.patch('/user', authenticateToken, userController.getAllUser)
router.post('/login', loginControler.getTokenLogin)
router.delete('/user', authenticateToken, userController.deleteUser)