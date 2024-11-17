import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(public validationErrors: any) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        validationErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class BusinessLogicException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Business Logic Error',
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
