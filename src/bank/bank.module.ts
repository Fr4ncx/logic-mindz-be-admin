import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Bank, BankSchema} from "./schemas/bank.schema";
import {BankService} from "./services/bank.service";
import {BankRepo} from "./repos/bank.repo";
import {BankController} from "./bank.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Bank.name, schema: BankSchema}])],
    controllers: [BankController],
    providers: [BankRepo, BankService],
    exports: [BankService],
})
export class BankModule {
}
