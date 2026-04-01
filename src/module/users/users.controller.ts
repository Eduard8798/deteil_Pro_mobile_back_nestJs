import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ChangeRoleDto, CreateUserDTO, UpdateUserDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";
import {UserRole} from "../../model/User.model";
import {RolesGuard} from "../../guards/role-guard";

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

    @UseGuards(JwtAuthGuard, new RolesGuard(UserRole.ADMIN))
    @Patch('role')
    async changeRole(
        @Body() dto: ChangeRoleDto,
        @Req() req,
    ) {
        return this.userService.changeRole(
            dto.userId,
            dto.role,
            req.user.id,
        );
    }


}
