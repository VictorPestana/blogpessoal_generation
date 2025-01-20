import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./services/usuario.services";
import { AuthModule } from "src/auth/auth.module";

 
@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService, TypeOrmModule.forFeature([Usuario])],
})
export class UsuarioModule {};
