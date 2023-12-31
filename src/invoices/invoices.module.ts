import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Invoice, InvoiceSchema} from "./schemas/invoice.schema";
import {InvoiceService} from "./services/invoice.service";
import {InvoiceRepo} from "./repos/invoice.repo";
import {InvoiceController} from "./invoice.controller";
import {InvoiceStatisticsController} from "./invoice-statistics.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Invoice.name, schema: InvoiceSchema}])],
    controllers: [InvoiceController, InvoiceStatisticsController],
    providers: [InvoiceRepo, InvoiceService],
    exports: [InvoiceService],
})
export class InvoicesModule {
}
