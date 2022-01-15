import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res} from "@nestjs/common";
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
		
		res.status(HttpStatus.NO_CONTENT);
		return new HttpException({
			message: 'No content',
			status: HttpStatus.NO_CONTENT
		}, HttpStatus.NO_CONTENT).getResponse();
		
	}
	
	@Post()
	create(@Res({passthrough: true}) res: Response, @Body() dto:ItemDto):object {
		res.status(HttpStatus.CREATED);
		return this.itemsService.create(dto);
	}
	
	@Delete()
	delete(@Res({passthrough: true}) res:Response, @Body() body):string {
		res.status(HttpStatus.ACCEPTED);
		return this.itemsService.delete(body.id);
	}
	
	@Put()
	update(@Res({passthrough: true}) res: Response, @Body() dto:ItemDto):ItemDto {
		res.status(HttpStatus.ACCEPTED);
		return this.itemsService.update(dto);
	}
	
}