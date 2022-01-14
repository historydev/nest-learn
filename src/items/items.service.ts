import { Injectable } from '@nestjs/common';
import {ItemDto} from "./dto/item.dto";

@Injectable()
export class ItemsService {
	protected items: ItemDto[] = [];
	
	getAll():ItemDto[] {
		return this.items;
	}
	
	create(item:ItemDto):ItemDto {
		item.id = `${Math.floor(Math.random() * 100)}`;
		this.items.push(item);
		return item;
	}
	
	update(item:ItemDto):ItemDto {
		const changeItem = this.items.find(el => el.id === item.id);
		for(let prop in changeItem) {
			changeItem[prop] = item[prop];
		}
		return changeItem
	}
	
	delete(id:string):ItemDto[] {
		return this.items = this.items.filter(el => el.id !== id);
	}
	
}
