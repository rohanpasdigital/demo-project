/**
 * Response Transform Interceptor
 * Formats all responses in a consistent format
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If response is already formatted, return as is
        if (data && data.statusCode && data.message) {
          return data;
        }

        // Format successful response
        return {
          statusCode: context.switchToHttp().getResponse().statusCode || 200,
          message: 'Success',
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
