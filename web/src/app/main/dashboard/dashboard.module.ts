// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// ==========================================================>> Third Party Library
import { TranslocoModule } from '@ngneat/transloco';

// ==========================================================>> Custom Library
import { DashboardComponent } from './dashboard.component';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { SharedModule } from 'app/shared/shared.module';

const dashboardRoutes: Routes = [
  {
      path: '',
      component: DashboardComponent,
  },
];

@NgModule({
    declarations: [
      DashboardComponent,
    ],
    imports: [
      ScrollbarModule,
      SharedModule,
      RouterModule.forChild(dashboardRoutes),
      TranslocoModule
    ]
})
export class DashboardModule {}
