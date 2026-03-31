import { Injectable } from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postegemRepository: Repository<Postagem>, // injecao de dependencia
  ) {}
  async findAll(): Promise<Postagem[]> {
    return await this.postegemRepository.find(); // select * from tb_postagem;
  }
}
