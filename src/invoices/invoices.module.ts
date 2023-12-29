import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Invoice, InvoiceSchema} from "./schemas/invoice.schema";
import {InvoiceService} from "./services/invoice.service";
import {InvoiceRepo} from "./repos/invoice.repo";
import {InvoiceController} from "./invoice.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Invoice.name, schema: InvoiceSchema}])],
    controllers: [InvoiceController],
    providers: [InvoiceRepo, InvoiceService],
    exports: [InvoiceService],
})
export class InvoicesModule {
}
