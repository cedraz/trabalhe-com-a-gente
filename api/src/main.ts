import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Ou especifique domínios específicos em vez de '*'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Notro Challenge')
    .setDescription('Notro Fullstack Challenge API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log(
      `
      Server running on: http://localhost:${process.env.PORT ?? 3000}
      Swagger UI: http://localhost:${process.env.PORT ?? 3000}/api
      `,
    );
  })
  .catch((error) => {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  });
