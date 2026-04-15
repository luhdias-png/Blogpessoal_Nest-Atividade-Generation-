import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagem' }) //Cria uma tabela com o nome tb_postagem
export class Postagem {

  @ApiProperty()
  @PrimaryGeneratedColumn() // Cria uma chave primaria e auto increment
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  titulo!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  texto!: string;

  @ApiProperty()
  @UpdateDateColumn()
  data!: Date;
  
  @ApiProperty({type: () => Tema})
  @ManyToOne(() => Tema, (tema) => tema.postagem,{ // varias postagem para um tema
    onDelete: "CASCADE"
  })
  tema!: Tema

  @ApiProperty({ type: () => Usuario})
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: "CASCADE"})
    usuario!: Usuario

  
}
