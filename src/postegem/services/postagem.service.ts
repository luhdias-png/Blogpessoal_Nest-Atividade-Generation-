import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';
import { TemaService } from '../../tema/services/tema.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postegemRepository: Repository<Postagem>, // injecao de dependencia
    private temaService: TemaService
  ) {}
  async findAll(): Promise<Postagem[]> {
    return await this.postegemRepository.find({ // select * from tb_postagem;
        relations:{
          tema: true
        }
    }); 
  }

  
  async findBy(id: number): Promise<Postagem>{
    
  const postagem = await this.postegemRepository.findOne({
    where: {
      id
    },
    relations:{tema:true

    }});

    if(!postagem)
      throw new HttpException('Postagem não encontrada pq nao tem no bd sua mula', HttpStatus.NOT_FOUND);
    
    return postagem;
  }

  async findAllbyTitulo(titulo: string): Promise<Postagem[]>{
    return await this.postegemRepository.find({
      where:{
        titulo: ILike(`%${titulo}%`)
      },
      relations:{
        tema: true
      }
    })
  }

   async create(postagem: Postagem): Promise<Postagem> {
       
        if (postagem.tema != null) {
           
            let tema = await this.temaService.findById(postagem.tema.id)
 
            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
 
              return await this.postegemRepository.save(postagem);
        }else{
            throw new HttpException('Tema nao pode ser nulo!', HttpStatus.NOT_FOUND);
        }
   
    }
 
  
  // async create(postagem: Postagem): Promise<Postagem>{
  //   await this.temaService.findById(postagem.tema.id)
  //   return await this.postegemRepository.save(postagem);
  // }
  
  async delete(id: number): Promise<DeleteResult>{
    await this.findBy(id);
    
    return await this.postegemRepository.delete(id);
  }
  
  async update(postagem: Postagem): Promise<Postagem> {
       
        let buscaPostagem: Postagem = await this.findBy(postagem.id);
 
        if (!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
 
        if (postagem.tema){
           
            let tema = await this.temaService.findById(postagem.tema.id)
               
            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
               
            return await this.postegemRepository.save(postagem);
   
        }else{
            throw new HttpException('Tema nao pode ser nulo!', HttpStatus.NOT_FOUND);
        }
       
    }
  // async update(postagem: Postagem): Promise<Postagem>{

  //   await this.findBy(postagem.id)

  //   await this.temaService.findById(postagem.tema.id)

  //   return await this.postegemRepository.save(postagem)
  // }
}
