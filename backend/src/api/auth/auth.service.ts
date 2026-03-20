import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../../user/user.schema';
import { CONSTANTS } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(username: string, password: string, name: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        username,
        password: hashedPassword,
        name,
      });
      await user.save();
      const { password: _, ...result } = user.toObject();
      return result;
    } catch (error: any) {
      // Handle MongoDB duplicate key error (E11000)
      if (error.code === 11000 && error.keyPattern?.username) {
        throw new BadRequestException(CONSTANTS.ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }
      // Re-throw other errors
      throw error;
    }
  }
}
