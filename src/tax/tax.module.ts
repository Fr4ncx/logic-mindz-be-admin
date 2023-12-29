import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Tax, TaxSchema} from "./schemas/tax.schema";
import {TaxService} from "./services/tax.service";
import {TaxRepo} from "./repos/tax.repo";
import {TaxController} from "./tax.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Tax.name, schema: TaxSchema}])],
    controllers: [TaxController],
    providers: [TaxRepo, TaxService],
    exports: [TaxService],
})
export class TaxModule {
}
