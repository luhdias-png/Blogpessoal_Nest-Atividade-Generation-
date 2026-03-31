import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_postagem' }) //Cria uma tabela com o nome tb_postagem
export class Postagem {
  @PrimaryGeneratedColumn() // Cria uma chave primaria e auto increment
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  titulo!: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  texto!: string;

  @UpdateDateColumn()
  data!: Date;
}
