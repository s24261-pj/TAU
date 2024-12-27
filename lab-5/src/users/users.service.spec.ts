import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('should return all users', () => {
    const users = service.findAll();

    expect(users).toHaveLength(2);
  });

  it('should return a user by id', () => {
    const user = service.findOne(1);

    expect(user).toBeDefined();
    expect(user.name).toBe('Jan Kowalski');
  });

  it('should add a new user', () => {
    const newUser = { name: 'Piotr Nowy', email: 'piotr@nowy.pl' };
    const createdUser = service.create(newUser);

    expect(createdUser).toHaveProperty('id');
    expect(service.findAll()).toHaveLength(3);
  });

  it('should update a user', () => {
    const updatedUser = service.update(1, { name: 'Janek Kowalski' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Janek Kowalski');
  });

  it('should delete a user', () => {
    const result = service.remove(1);

    expect(result).toBe(true);
  });
});
