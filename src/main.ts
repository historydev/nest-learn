import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {LoggerMiddleware} from "./logger";
import {HttpExceptionFilter} from "./app.exceptionFilter";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
