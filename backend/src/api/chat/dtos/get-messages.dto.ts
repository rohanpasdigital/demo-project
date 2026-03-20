/**
 * Get Messages Query DTO
 */

import { IsString, IsNumber, Min, Max } from 'class-validator';

export class GetMessagesDto {
  @IsString()
  room!: string;

  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
