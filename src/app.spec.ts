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
						id: '0',
						title: '',
						message: ''
					})
					.expect(HttpStatus.CREATED)
					.expect({
						id: '0',
						title: '',
						message: ''
					});
			
				await request(app.getHttpServer())
					.get('/')
					.expect(HttpStatus.OK)
					.expect({
						items: [
							{
								id: '0',
								title: '',
								message: ''
							}
						]
					});
			
				await request(app.getHttpServer())
					.put('/')
					.send({
						id: '0',
						title: 'title',
						message: 'My text'
					})
					.expect(HttpStatus.ACCEPTED)
					.expect({
						id: '0',
						title: 'title',
						message: 'My text'
					});
			
				await request(app.getHttpServer())
					.delete('/')
					.send({
						id: '0'
					})
					.expect(HttpStatus.ACCEPTED)
					.expect('0');
			
				await request(app.getHttpServer())
					.get('/')
					.expect(HttpStatus.OK)
					.expect({
						message: 'No content',
						status: HttpStatus.OK
					});
			
		});
	});
	
	afterEach(() => false);
	
});