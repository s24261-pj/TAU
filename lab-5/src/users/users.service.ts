import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Jan Kowalski', email: 'jan@kowalski.pl' },
    { id: 2, name: 'Anna Nowak', email: 'anna@nowak.pl' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (user) {
      Object.assign(user, updateUserDto);
    }

    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return true;
  }
}
