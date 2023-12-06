import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class LoginControler {

  userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    getTokenLogin = async (req: Request, res: Response) => {
      const { name, password } = req.body
      const token = await this.userService.getUserByLogin(name, password)
      
      if(token === null) return res.status(404).json({ status: 'User not found' })
      return res.status(200).json({token: token})
    }

}