import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postegem/entities/postagem.entity"

 
@Entity({name: "tb_usuarios"})
export class Usuario {
 
    @PrimaryGeneratedColumn() 
    id!: number
 
    @IsNotEmpty({message: "O nome nao pode ficar vazio!"})
    @Column({length: 255, nullable: false}) 
    nome!: string
 
    @IsEmail({}, {message: "O email precisa ser valido!"})
    @IsNotEmpty({message: "O Usuario nao pode ficar vazio!"})
    @Column({length: 255, nullable: false })
    usuario!: string
 
    @MinLength(8,{message: "A senha precisar ter o minimo de 8 caracteres"})
    @IsNotEmpty({message: "A senha é obrigatoria!"})
    @Column({length: 255, nullable: false }) 
    senha!: string
 
    @Column({length: 5000 }) 
    foto!: string
 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem!: Postagem[]
    
 
}