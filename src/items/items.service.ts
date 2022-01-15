import { Injectable } from '@nestjs/common';
import {ItemDto} from "./dto/item.dto";

@Injectable()
export class ItemsService {
	protected items: ItemDto[] = [];
	
	getAll():ItemDto[] {
		return this.items;
	}
	
	create(item:ItemDto):ItemDto {
		this.items.push(item);
		return item;
	}
	
	update(item:ItemDto):ItemDto {
		const index = this.items.findIndex(el => el.id === item.id);
		if(index !== -1) this.items[index] = item;
		return item
	}
	
	delete(id:string):string {
		this.items = this.items.filter(el => el.id !== id);
		return id
	}
	
}
