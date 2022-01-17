
const Joi = require('joi');

import {string} from 'joi';

export const item = Joi.object({
	id:string().min(1),
	title:string().min(1),
	message: string().min(1)
});

export const id = Joi.object({
	id:string().min(1)
});