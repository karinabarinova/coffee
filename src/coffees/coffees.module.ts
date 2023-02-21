import {Injectable, Module} from '@nestjs/common';
import {CoffeesController} from './coffees.controller';
import {CoffeesService} from './coffees.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Coffee} from './entities/coffee.entity';
import {Flavor} from './entities/flavor.entity';
import {COFFEE_BRANDS} from './coffees.constants';
import {Connection} from 'typeorm';


@Module({
    imports: [TypeOrmModule.forFeature(
        [Coffee, Flavor, Event]
    )],
    exports: [CoffeesService],
    controllers: [CoffeesController],
    providers: [CoffeesService, {
        provide: COFFEE_BRANDS,
        useFactory: async (connection: Connection): Promise<string[]> => {
            //const coffeeBrands = await connection.query('SELECT * ...');
            const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
            return coffeeBrands
        },
        inject: [Connection]
    }
    ]
})
export class CoffeesModule {}
