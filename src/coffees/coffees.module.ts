import {Injectable, Module} from '@nestjs/common';
import {CoffeesController} from './coffees.controller';
import {CoffeesService} from './coffees.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Coffee} from './entities/coffee.entity';
import {Flavor} from './entities/flavor.entity';
import {COFFEE_BRANDS} from './coffees.constants';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe']
    }
}

@Module({
    imports: [TypeOrmModule.forFeature(
        [Coffee, Flavor, Event]
    )],
    exports: [CoffeesService],
    controllers: [CoffeesController],
    providers: [CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(), inject: [CoffeeBrandsFactory]
        },
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
        }
    ]
})
export class CoffeesModule {}
