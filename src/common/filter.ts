import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse?.();

    let message = exception.message;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      message =
        (exceptionResponse as any).message || JSON.stringify(exceptionResponse);
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

