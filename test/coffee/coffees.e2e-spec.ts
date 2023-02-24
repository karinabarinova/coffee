import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication, ValidationPipe} from '@nestjs/common';
import {CoffeesModule} from './../../src/coffees/coffees.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {HttpExceptionFilter} from './../../src/common/filters/http-exception/http-exception.filter';
import {WrapResponseInterceptor} from './../../src/common/interceptors/wrap-response/wrap-response.interceptor';
import {TimeoutInterceptor} from './../../src/common/interceptors/timeout/timeout.interceptor';
import * as request from 'supertest'
import {CreateCoffeeDto} from 'src/coffees/dto/create-coffee.dto/create-coffee.dto';


describe('[Feature] Coffees - /coffees', () => {
    let app: INestApplication;
    const coffee = {
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla']
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CoffeesModule,
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgres',
                    password: 'pass123',
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true, //removes properties not listed in corresponding DTOs
            transform: true, //transforms payload to its corresponding type, make primitive types conversion
            forbidNonWhitelisted: true, //throws an error if any non whitelisted properties are present
            transformOptions: {
                enableImplicitConversion: true
            }
        }))
        app.useGlobalFilters(new HttpExceptionFilter())
        app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor())
        await app.init();
    });

    it('Create [POST /]', () => {
        return request(app.getHttpServer())
            .post('/coffees')
            .send(coffee as CreateCoffeeDto)
            .expect(HttpStatus.GONE)
            .then(({body}) => {
                const expectedCoffee = jasmine.objectContaining({
                    ...coffee,
                    flavors: jasmine.arrayContaining(
                        coffee.flavors.map(name => jasmine.objectContaining({name})),
                    ),
                    recommendations: 0
                })

                expect(body.data).toHaveProperty('name');
                expect(body.data.name).toEqual(coffee.name);
                expect(body.data).toHaveProperty('brand');
                expect(body.data.brand).toEqual(coffee.brand);
                expect(body.data).toHaveProperty('flavors');
                expect(body.data.flavors).toEqual(expect.arrayContaining(coffee.flavors.map(name => expect.objectContaining({name})),))
            })
    })
    it.todo('Get all [GET /]')
    it.todo('Get one [GET /:id]')
    it.todo('Update one [PATCH /:id]')
    it.todo('Delete one [DELETE /:id]')

    afterAll(async () => {
        await app.close()
    })
});
