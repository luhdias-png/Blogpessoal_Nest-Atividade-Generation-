import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controller/postagem.controller';
import { temaModule } from '../tema/tema.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), temaModule],
  providers: [PostagemService],
  controllers: [PostagemController],
  exports: [TypeOrmModule],
})
export class PostagemModule {}
