import {PartialType} from "@nestjs/mapped-types";
import {CreateCoffeeDto} from "../create-coffee.dto/create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {} //makes all properties optional, inherites all the validation rules
