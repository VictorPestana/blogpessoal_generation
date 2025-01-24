import { AuthModule } from "../auth/auth.module";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./services/usuario.services";

 
@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService, TypeOrmModule.forFeature([Usuario])],
})
export class UsuarioModule {};
