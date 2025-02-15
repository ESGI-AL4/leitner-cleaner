import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startApplication() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log("App listening on localhost:" + (process.env.PORT ?? 3000))
}

startApplication();
