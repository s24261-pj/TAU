import { Test } from '@nestjs/testing';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { UsersService } from '../../src/users/users.service';

describe('UsersController', () => {
  let app: INestApplication;

  const usersService = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, name: 'Jan Kowalski', email: 'jan@kowalski.pl' },
      { id: 2, name: 'Anna Nowak', email: 'anna@nowak.pl' },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Jan Kowalski',
      email: 'jan@kowalski.pl'
    }),
    create: jest.fn().mockResolvedValue({
      id: 3,
      name: 'Nowy Użytkownik',
      email: 'nowy@uzytkownik.pl',
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Zaktualizowany Użytkownik',
      email: 'jan@kowalski.pl',
    }),
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
        .overrideProvider(UsersService)
        .useValue(usersService)
        .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return an array of users', () => {
      return request(app.getHttpServer())
          .get('/users')
          .expect(200)
          .expect([
            { id: 1, name: 'Jan Kowalski', email: 'jan@kowalski.pl' },
            { id: 2, name: 'Anna Nowak', email: 'anna@nowak.pl' },
          ]);
    });

    it('should return user data for existing user', () => {
      return request(app.getHttpServer())
          .get('/users/1')
          .expect(200)
          .expect({ id: 1, name: 'Jan Kowalski', email: 'jan@kowalski.pl' });
    });

    it('should return 404 for non-existing user', () => {
      usersService.findOne.mockRejectedValue(new HttpException('User with ID 99 not found', HttpStatus.NOT_FOUND));
      return request(app.getHttpServer())
          .get('/users/99')
          .expect(404)
          .expect({
            message: 'User with ID 99 not found',
            statusCode: 404,
          });
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return status 201', () => {
      const newUser = { name: 'Nowy Użytkownik', email: 'nowy@uzytkownik.pl' };

      return request(app.getHttpServer())
          .post('/users')
          .send(newUser)
          .expect(201)
          .expect({
            id: 3,
            name: 'Nowy Użytkownik',
            email: 'nowy@uzytkownik.pl',
          });
    });

    it('should return 400 when required fields are missing', () => {
      usersService.create.mockRejectedValue(new HttpException('Email is required', HttpStatus.BAD_REQUEST));

      return request(app.getHttpServer())
          .post('/users')
          .send({ name: '' })
          .expect(400)
          .expect({
            message: 'Email is required',
            statusCode: 400,
          });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user data and return updated user', () => {
      const updatedUser = { name: 'Zaktualizowany Użytkownik' };

      return request(app.getHttpServer())
          .put('/users/1')
          .send(updatedUser)
          .expect(200)
          .expect({
            id: 1,
            name: 'Zaktualizowany Użytkownik',
            email: 'jan@kowalski.pl',
          });
    });

    it('should return 404 for non-existing user', () => {
      const updatedUser = { name: 'Non Existing User' };

      usersService.update.mockRejectedValue(
          new HttpException('User with ID 99 not found', HttpStatus.NOT_FOUND),
      );

      return request(app.getHttpServer())
          .put('/users/99')
          .send(updatedUser)
          .expect(404)
          .expect({
            message: 'User with ID 99 not found',
            statusCode: 404,
          });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should remove user and return status 200', () => {
      return request(app.getHttpServer())
          .delete('/users/1')
          .expect(200);
    });

    it('should return 404 for non-existing user', () => {
      usersService.remove.mockRejectedValue(
          new HttpException('User with ID 99 not found', HttpStatus.NOT_FOUND),
      );

      return request(app.getHttpServer())
          .delete('/users/99')
          .expect(404)
          .expect({
            message: 'User with ID 99 not found',
            statusCode: 404,
          });
    });
  });
});
