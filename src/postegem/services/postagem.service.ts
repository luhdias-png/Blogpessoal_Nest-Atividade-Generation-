import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postegemRepository: Repository<Postagem>, // injecao de dependencia
  ) {}
  async findAll(): Promise<Postagem[]> {
    return await this.postegemRepository.find(); // select * from tb_postagem;
  }

  
  async findBy(id: number): Promise<Postagem>{
    
  const postagem = await this.postegemRepository.findOne({
    where: {
      id
    }});

    if(!postagem)
      throw new HttpException('Postagem não encontrada pq nao tem no bd sua mula', HttpStatus.NOT_FOUND);
    
    return postagem;
  }

  
  async create(postagem: Postagem): Promise<Postagem>{
    return await this.postegemRepository.save(postagem);
  }
  
  async delete(id: number): Promise<DeleteResult>{
    await this.findBy(id);
    
    return await this.postegemRepository.delete(id);
  }
  
  async update(postagem: Postagem): Promise<Postagem>{

    await this.findBy(postagem.id)

    return await this.postegemRepository.save(postagem)
  }
}
