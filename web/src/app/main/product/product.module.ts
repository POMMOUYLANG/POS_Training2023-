// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


// ==========================================================>> Custom Library
import { ProductModule} from 'app/main/product/product/product.module';


const productRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'all',
                loadChildren: () => import('app/main/product/product/product.module').then(m => m.ProductsModule)
            }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(productRoutes),
        MatTableModule,
        ProductsModule,
    ],
    exports: [
        ProductsModule
    ]
})
export class ProductModule{}
