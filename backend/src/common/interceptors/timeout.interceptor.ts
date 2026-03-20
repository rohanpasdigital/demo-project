/**
 * Request Timeout Interceptor
 * Adds timeout to all requests
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, timeout } from 'rxjs';
import { CONSTANTS } from '../constants';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(CONSTANTS.HTTP_TIMEOUT));
  }
}
