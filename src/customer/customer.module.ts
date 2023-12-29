import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Customer, CustomerSchema} from "./schemas/customer.schema";
import {CustomerService} from "./services/customer.service";
import {CustomerRepo} from "./repos/customer.repo";
import {CustomerController} from "./customer.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}])],
    controllers: [CustomerController],
    providers: [CustomerRepo, CustomerService],
    exports: [CustomerService],
})
export class CustomerModule {
}
