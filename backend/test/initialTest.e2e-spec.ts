import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../src/entities/user.entity';
import { BoardMemberDto } from '../src/users/dto/boardMember.dto';
import { TenantEntity } from '../src/entities/tenant.entity';
import { Role } from '../../backend/src/users/Role';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let userRepository: Repository<UserEntity>;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userRepository = moduleFixture.get(getRepositoryToken(UserEntity));

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    /* await connection.dropDatabase();
    await connection.runMigrations(); */
    await moduleFixture.close();
  });

  /* describe('GET Bookings', () => {
    it('should retrieve all bookings (GET)', async () => {
      // Arrange
      await Promise.all([
        await bookingRepository.insert(
          new BookingDto(
            'Nikolaj',
            2,
            new Date(2023, 0, 15),
            '12345667',
            'nikolaj@nikolaj.dk',
            'We eat a lot',
          ),
        ),

        await bookingRepository.insert(
          new BookingDto(
            'Olga',
            2,
            new Date(2023, 0, 15),
            '12345667',
            'olga@olga.dk',
            'Table by the window',
          ),
        ),

        await bookingRepository.insert(
          new BookingDto(
            'Emilie',
            5,
            new Date(2023, 0, 15),
            '12345667',
            'emilie@emilie.dk',
            'One vegetarian',
          ),
        ),
      ]);

      // Act
      const { body }: { body: Booking[] } = await request(app.getHttpServer())
        .get('/bookings')
        .expect(200);

      // Assert (expect)
      expect(body.length).toEqual(3);
      expect(body[0].comment).toEqual('We eat a lot');
    });
  }); */

  describe('POST board member', () => {
    it('should create a new valid board member (POST)', async () => {
      const board_member = new BoardMemberDto(
        'Christian',
        'Kirschberg',
        '+45 12 34 56 78',
        'Parallelvej 12a 3th',
        2800,
        'Kongens Lyngby',
      );

      const user = {
        username: 'kirs@cphbusiness.dk',
        password: '123456789',
        role: Role.Admin,
      };

      await userRepository.insert(user);

      const savedUser = await request(app.getHttpServer())
        .post('/getUser')
        .send('kirs@cphbusiness.dk')
        .expect(200);

      board_member.user = savedUser.body;

      const savedBoardMember = await request(app.getHttpServer())
        .post('/auth/signup-board_member')
        .send(board_member)
        .expect(201);

      expect(savedBoardMember.body.firstname).toEqual('Christian');
    });
  });

  afterAll(() => {
    app.close();
  });
});
