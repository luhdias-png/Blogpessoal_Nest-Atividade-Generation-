import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postegem/entities/postagem.entity';
import { PostagemModule } from './postegem/postagem.modules';
import { Tema } from './tema/entities/tema.entity';
import { temaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';


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
      entities: [Postagem, Tema, Usuario],
      synchronize: true,
    }),
    PostagemModule,
    temaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
