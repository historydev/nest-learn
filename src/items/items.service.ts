import { Injectable } from '@nestjs/common';
import {ItemDto} from "./dto/item.dto";

@Injectable()
export class ItemsService {
	protected items: ItemDto[] = [];
	
	getAll():ItemDto[] {
		return this.items;
	}
	
	create(item:ItemDto):ItemDto[] {
		this.items.push(item);
		return [item];
	}
	
	update(item:ItemDto):ItemDto[] {
		const index = this.items.findIndex(el => el.id === item.id);
		if(index !== -1) {
			this.items[index] = item;
			return [item]
		}
		return []
	}
	
	delete(id:string):ItemDto[] {
		const index = this.items.findIndex(el => el.id === id);
		let array = [...this.items];
		if(index !== -1) {
			const item = array[index];
			this.items.splice(index, 1);
			return [item]
		}
		return []
	}
	
}
