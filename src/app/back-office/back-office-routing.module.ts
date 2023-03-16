import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasRole, HasRoleGuard } from '../auth/guards/has-role.guard';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BackOfficeLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        canActivate: [hasRole(['Orders', 'Administrador'])],
        canLoad: [hasRole(['Orders', 'Administrador'])],
        // canActivate: [HasRoleGuard],
        // canLoad: [HasRoleGuard],
        // data: {
        //   allowedRoles: ['Orders', 'Manager'],
        // },
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'inventory',
        canActivate: [hasRole(['Inventory', 'Administrador'])],
        canLoad: [hasRole(['Inventory', 'Administrador'])],
        // canActivate: [HasRoleGuard],
        // canLoad: [HasRoleGuard],
        // data: {
        //   allowedRoles: ['Inventory', 'Manager'],
        // },
        loadChildren: () =>
          import('./inventory/inventory.module').then((m) => m.InventoryModule),
      },
      {
        path: 'accounting',
        canActivate: [hasRole(['Accounting', 'Administrador'])],
        canLoad: [hasRole(['Accounting', 'Administrador'])],
        // canActivate: [HasRoleGuard],
        // canLoad: [HasRoleGuard],
        // data: {
        //   allowedRoles: ['Accounting', 'Manager'],
        // },
        loadChildren: () =>
          import('./accounting/accounting.module').then(
            (m) => m.AccountingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficeRoutingModule {}
