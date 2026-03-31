import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postegem/entities/postagem.entity';
import { PostagemModule } from './postegem/postagem.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // configuracao do banco de dados.
      type: 'mysql', // tipo do banco de dados
      host: 'localhost', // aqui é host da banco de dados
      port: 3306, // a porta do banco de dados
      username: 'root', // senha do banco de dados
      password: '110294', // senha do banco de dados
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
    }),
    PostagemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
