import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDTO, LoginDto} from "../users/dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {
}
    // @Post('login')
    // login(@Body() userDto: CreateUserDTO) {
    //     console.log("controllerLoginMethod:",userDto)
    //     return this.authService.login(userDto)
    // }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        console.log("controllerLoginMethod:",loginDto)
        return this.authService.login(loginDto)
    }

    @Post('registration')
    registration(@Body() userDto: CreateUserDTO) {
        return this.authService.registration(userDto)
    }
}
