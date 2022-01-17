import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {ItemsModule} from "./items/items.module";
import {LoggerMiddleware} from "./logger";

@Module({
  imports: [ItemsModule],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes('*')
	}
}
