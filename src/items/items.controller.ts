import {Controller, Get, HttpException, HttpStatus, Param, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {ItemsService} from "./items.service";
import {ItemDto} from "./dto/item.dto";

@Controller()

export class ItemsController {
	
	constructor(private readonly itemsService: ItemsService) {}
	
	@Get()
	getAll(@Res({passthrough: true}) res: Response):string | object {
		
		const items = this.itemsService.getAll();
		
		if(!!items.length) {
			res.status(HttpStatus.OK);
			return new HttpException({
				items: items
			}, HttpStatus.OK).getResponse();
		}
		
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		
		return new HttpException({
			items: 'Items length: ' + items.length,
			status: HttpStatus.INTERNAL_SERVER_ERROR
		}, HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
		
	}
	
	@Post()
	create(@Param() params):ItemDto {
		return this.itemsService.create(params);
	}
	
}