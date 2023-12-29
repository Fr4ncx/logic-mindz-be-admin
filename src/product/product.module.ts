import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./schemas/product.schema";
import {ProductService} from "./services/product.service";
import {ProductRepo} from "./repos/product.repo";
import {ProductController} from "./product.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
    controllers: [ProductController],
    providers: [ProductRepo, ProductService],
    exports: [ProductService],
})
export class ProductModule {
}
