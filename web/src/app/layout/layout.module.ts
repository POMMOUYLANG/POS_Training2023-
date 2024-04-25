import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { DenseLayoutModule } from 'app/layout/layouts/dense/dense.module';
import { SharedModule } from 'app/shared/shared.module';

const layoutModules = [EmptyLayoutModule, DenseLayoutModule];

@NgModule({
    declarations: [LayoutComponent],
    imports: [SharedModule, ...layoutModules],
    exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
