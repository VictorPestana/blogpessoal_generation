import { forwardRef } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstants } from "./constants/constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [
		forwardRef(() => UsuarioModule),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1h' },
		})
	],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};
