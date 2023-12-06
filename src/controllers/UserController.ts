import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name){
            return response.status(400).json({ message: 'Bad request! Name obrigatório'})
        }
        if(!user.email){
            return response.status(400).json({ message: 'Bad request! Email obrigatório'})
        }
        if(!user.password){
            return response.status(400).json({ message: 'Bad request! password obrigatório'})
        }
        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getUser = async (request: Request, response: Response) => {
        const { id } = request.params
        const users = await this.userService.getUser(id)
        return response.status(200).json(users)
    } 

    getAllUser = async (request: Request, response: Response) => {
        const users = await this.userService.getUsers()
        return response.status(200).json({ message: users})
    }

    /* deleteUser = (request: Request, response: Response) => {
        const user = request.body
    
        const result = this.userService.deleteUser(user.name)
        if(result){
            return response.status(200).json({ message: 'Usuário deletado.' })
        } else {
            return response.status(404).json({ message: 'Usuário não encontrado.'})
        }
        
    } */
}
