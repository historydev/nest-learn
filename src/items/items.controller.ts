import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put, Req,
	Res, UseFilters, UseInterceptors, UsePipes
} from "@nestjs/common";
import {Response} from "express";
import {ItemsService} from "./items.service";
import {ItemDto} from "./dto/item.dto";
import {JoiValidationPipe} from "./items.validation.pipe";
import {id, item} from "./items.shemes";

@Controller()
export class ItemsController {
	
	constructor(private readonly itemsService: ItemsService) {}
	
	@Get()
	async getAll(@Res() res: Response) {
		throw new HttpException(this.itemsService.getAll(), HttpStatus.OK);
	}
	
	@Post()
	@UsePipes(new JoiValidationPipe(item))
	create(@Res() res: Response, @Body() dto:ItemDto) {
		throw new HttpException(this.itemsService.create(dto), HttpStatus.CREATED);
	}
	
	@Delete()
	@UsePipes(new JoiValidationPipe(id))
	delete(@Res() res:Response, @Body() body) {
		throw new HttpException(this.itemsService.delete(body.id), HttpStatus.ACCEPTED);
	}
	
	@Put()
	@UsePipes(new JoiValidationPipe(item))
	update(@Res() res: Response, @Body() dto:ItemDto) {
		throw new HttpException(this.itemsService.update(dto), HttpStatus.ACCEPTED);
	}
	
}