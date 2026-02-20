import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('user-order-list')
    getOrderList(@Req() req) {

         return this.userService.getOrderList(req.user.id);
    }

    // @Post('create-user')
    // createUsers(@Body() dto: CreateUserDTO) {
    //     return this.userService.createUser(dto);
    // }

    @UseGuards(JwtAuthGuard)
    @Patch('update-user')
    updateUser (@Body() dto: UpdateUserDTO,
                @Req() req) {
        const updateUserId = req.user.id;
        return this.userService.updateUser(dto,updateUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser (@Req() req,
                @Param('id') id : number) {
        const deleteUserId = req.user.id;
        return this.userService.deleteUser(deleteUserId,id);
    }


}
