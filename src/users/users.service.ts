import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationError } from 'sequelize';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {

    }

    async createUser(dto: CreateUserDto) {
        try {
            let user = new User(dto)
            await user.validate()
            const createdUser = this.userRepository.create(dto)
            return createdUser

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new HttpException(error, HttpStatus.BAD_REQUEST)
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }

    async findOne(
        first_name: string,
        last_name: string,
        email: string
    ): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    first_name,
                    last_name,
                    email
                }
            })
            return user
        } catch {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findByPk(id)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.destroy()
        return { message: 'User deleted successfully' }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.userRepository.findByPk(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const updatedUser = await user.update(dto)
        return updatedUser
    }

}
