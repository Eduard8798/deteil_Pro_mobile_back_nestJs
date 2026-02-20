import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

export const jwtConfig: JwtModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('secret_jwt'),
        signOptions: {
            expiresIn: '24h',
        },
    })
}
