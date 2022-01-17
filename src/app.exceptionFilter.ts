import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpCode, HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';
import {HttpResponseDto} from "./exceptionResponse.dto";

@Catch(HttpException)
export class HttpExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const data:HttpResponseDto = {
			statusCode: status,
			response: exception.getResponse()
		};
		
		if(data.statusCode === HttpStatus.BAD_REQUEST) {
			data.response = [];
			data.error = 'Bad Request';
		}
		
		response
			.status(data.statusCode)
			.json(data);
	}
}