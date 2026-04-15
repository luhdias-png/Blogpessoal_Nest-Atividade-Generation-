import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postegem/entities/postagem.entity"
import { ApiProperty } from "@nestjs/swagger"

 
@Entity({name: "tb_usuarios"})
export class Usuario {
 
    @PrimaryGeneratedColumn() 
    @ApiProperty()
    id!: number
 
    @IsNotEmpty({message: "O nome nao pode ficar vazio!"})
    @Column({length: 255, nullable: false}) 
    @ApiProperty()
    nome!: string
 
    @IsEmail({}, {message: "O email precisa ser valido!"})
    @IsNotEmpty({message: "O Usuario nao pode ficar vazio!"})
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com"})
    usuario!: string
 
    @MinLength(8,{message: "A senha precisar ter o minimo de 8 caracteres"})
    @IsNotEmpty({message: "A senha é obrigatoria!"})
    @Column({length: 255, nullable: false }) 
    @ApiProperty({example: "12345678"})
    senha!: string
 
    @Column({length: 5000 }) 
    @ApiProperty()
    foto!: string
 
    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem!: Postagem[]
    
 
}