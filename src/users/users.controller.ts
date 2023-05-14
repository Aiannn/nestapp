import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @Post('findOne')// here is a note refactor code if system couldn't find a user and send him a message that 
    //there is no such user or you did misspelling
    getOne(@Body() body: any) {
        const { first_name, last_name, email } = body
        return this.usersService.findOne(first_name, last_name, email)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id)
    }

    @Put(':id') //update that
    updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUser(id, userDto)
    }

}
