import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { JwtService } from "@nestjs/jwt";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";



@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any>{
        const buscarUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscarUsuario)
            throw new HttpException("Usuario nao encontrado!", HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscarUsuario.senha)

        if(buscarUsuario && matchPassword){
            const { senha, ...resposta } = buscarUsuario //O operador rest é representado por ... e serve para coletar o restante das propriedades ou elementos que não foram explicitamente desestruturados.Ex: 1.(nome, idade, cidade, profissao)/ 2.(nome,...resto) => 1.console.log(nome) = nome/ 2.console.log(resto) = idade, cidade, profissao.
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin){

        const buscarUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

        if(!buscarUsuario){
            throw new HttpException('Usuario ou a senha invalidos',401);
        }

        const senhaValida = await this.bcrypt.compararSenhas(usuarioLogin.senha, buscarUsuario.senha);

        if(!senhaValida){
            throw new HttpException('O USUARIO OU A SENHA INVALIDO!',401);
        }
        
        const payload = { sub: usuarioLogin.usuario };

        return{
            id: buscarUsuario.id,
            nome: buscarUsuario.nome,
            usuario: buscarUsuario.usuario,
            senha: '',
            foto: buscarUsuario.foto,
            token: `Bearer ${this.jwService.sign(payload)}`
        }
    }
}