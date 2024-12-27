import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    const result = controller.findAll();

    expect(result).toHaveLength(2);
  });

  it('should return a user by id', () => {
    const user = controller.findOne('1');

    expect(user).toBeDefined();
    expect(user.name).toBe('Jan Kowalski');
  });

  it('should throw an error if user not found', () => {
    expect(() => controller.findOne('99')).toThrow();
  });

  it('should create a new user', () => {
    const user = { name: 'Test User', email: 'test@user.pl' };
    const result = controller.create(user);

    expect(result).toHaveProperty('id');
  });

  it('should update a user', () => {
    const result = controller.update('1', { name: 'Updated User' });

    expect(result.name).toBe('Updated User');
  });

  it('should delete a user', () => {
    controller.remove('1');

    expect(() => controller.findOne('1')).toThrow();
  });
});
