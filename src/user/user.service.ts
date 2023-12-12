import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isEmailUnique = await this.findByEmail(createUserDto.email);

    if (isEmailUnique) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findUsers(): Promise<User[] | undefined> {
    const users = this.userRepository.find({
      order: { id: 'ASC' },
    });

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: number, newUserData: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException('user not found');
    }

    if ('email' in newUserData && userToUpdate.email !== newUserData.email) {
      const emailIsUnique = await this.findByEmail(newUserData.email);
      if (emailIsUnique) {
        throw new BadRequestException('Email already in use.');
      }
    }

    if (newUserData.password) {
      const hashedPassword = await bcrypt.hash(newUserData.password, 10);
      this.userRepository.merge(userToUpdate, {
        ...newUserData,
        password: hashedPassword,
      });
    } else {
      this.userRepository.merge(userToUpdate, newUserData);
    }
    await this.userRepository.save(userToUpdate);
    return userToUpdate;
  }

  async deleteUser(id: number): Promise<User> {
    const userToDelete = await this.userRepository.findOne({ where: { id } });

    if (!userToDelete) {
      throw new NotFoundException('user not found');
    }

    await this.userRepository.remove(userToDelete);
    return userToDelete;
  }
}
