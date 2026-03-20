import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @IsString()
  @Prop({ required: true })
  room!: string;

  @IsString()
  @Prop({ required: true })
  content!: string;

  @IsString()
  @Prop({ required: true })
  sender!: string;

  @IsString()
  @Prop({ default: Date.now })
  timestamp!: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
