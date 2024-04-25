import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { UserComponent } from 'app/layout/common/user/user.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports     : [
        SharedModule,
        TranslocoModule
    ],
    exports     : [
        UserComponent
    ]
})
export class UserModule
{
}
