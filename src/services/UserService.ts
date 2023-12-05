export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    getUserByName = (name: string) => {
        
        const result = this.db.some(user => user.name === name)
        return result
    }

    deleteUser = (name: string) => {
        const result = this.getUserByName(name)
        if (result){
            this.db.filter(user => user.name !== name)
            return true
        }else return false
       
    }
}

