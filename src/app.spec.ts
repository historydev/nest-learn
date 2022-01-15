import { Test } from '@nestjs/testing';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import * as request from 'supertest';
import {HttpStatus, INestApplication} from "@nestjs/common";

describe('AppModule', () => {
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
	
	describe('Items endpoints', () => {
		
		it('test add/get/remove/error', async () => {
			
				await request(app.getHttpServer())
					.post('/')
					.send({
						id: '1',
						title: 'Test title',
						message: 'Test message'
					})
					.expect(HttpStatus.CREATED)
					.expect({
						id: '1',
						title: 'Test title',
						message: 'Test message'
					});
			
				await request(app.getHttpServer())
					.get('/')
					.expect(HttpStatus.OK)
					.expect({
						items: [
							{
								id: '1',
								title: 'Test title',
								message: 'Test message'
							}
						]
					});
			
				await request(app.getHttpServer())
					.put('/')
					.send({
						id: '1',
						title: 'New test title',
						message: 'New test message'
					})
					.expect(HttpStatus.ACCEPTED)
					.expect({
						id: '1',
						title: 'New test title',
						message: 'New test message'
					});
			
				await request(app.getHttpServer())
					.delete('/')
					.send({
						id: '1'
					})
					.expect(HttpStatus.ACCEPTED)
					.expect('1');
			
				await request(app.getHttpServer())
					.get('/')
					.expect(HttpStatus.NO_CONTENT)
					.expect({});
			
		});
	});
	
	afterEach(() => false);
	
});