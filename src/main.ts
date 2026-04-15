import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // configuracao de aplicacao nest, ela cria a aplicacao.

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Lucas Dias", "https://github.com/luhdias-png","andre_lucas.94@hotmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; // configuracao da timezone

  app.useGlobalPipes(new ValidationPipe()); // configuracao de validacao de dados de entrada

  app.enableCors(); // configura cors para permitir requisicoes de outras origens

  await app.listen(process.env.PORT ?? 4000); // execucao da aplicacao nest, configuracao da porta do servidor
}
bootstrap();
