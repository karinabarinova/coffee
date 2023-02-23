import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {CoffeesService} from './coffees.service';
import {CreateCoffeeDto} from './dto/create-coffee.dto/create-coffee.dto';
import {UpdateCoffeeDto} from './dto/update-coffee.dto/update-coffee.dto';
import {PaginationQueryDto} from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import {Public} from 'src/common/decorators/public.decorator';
import {ParseIntPipe} from 'src/common/pipes/parse-int/parse-int.pipe';
import {Protocol} from 'src/common/decorators/protocol.decorator';
import {ApiForbiddenResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor (private readonly coffeesService: CoffeesService) {}

    @ApiForbiddenResponse({description: 'Forbidden.'})
    @Public()
    @Get()
    findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        console.log(protocol)
        return this.coffeesService.findAll(paginationQuery)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id)
        return this.coffeesService.findOne('' + id)
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id)
    }
}
