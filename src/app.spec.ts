import { Test } from '@nestjs/testing';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";

describe('ItemsModule', () => {
	let itemsController: ItemsController;
	let itemsService: ItemsService;
	let app: INestApplication;
	
	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [ItemsController],
			providers: [ItemsService],
		}).compile();
		
		itemsService = moduleRef.get<ItemsService>(ItemsService);
		itemsController = moduleRef.get<ItemsController>(ItemsController);
		
		app = moduleRef.createNestApplication();
		await app.init();
	});
	
	describe('End-points', () => {
		
		it('/GET Status 200', () => {
			
			return request(app.getHttpServer())
				.get('/')
				.expect(200)
				.expect({
					"items": [
						{
							id: '0',
							title: '',
							message: ''
						}
					]
				});
			
		});
		
		it('/GET Status 500', () => {
			
			return request(app.getHttpServer())
				.get('/')
				.expect(500)
				.expect({
					items: 'Items length: 0',
					status: 500
				});
			
		});
	});
});