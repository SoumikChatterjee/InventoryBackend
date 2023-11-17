import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './component/products/products.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { SalesOrderComponent } from './component/sales-order/sales-order.component';
import { PurchaseOrderComponent } from './component/purchase-order/purchase-order.component';
import { ReportComponent } from './component/report/report.component';
import { BarcodeComponent } from './component/barcode/barcode.component';
import { ExportImportComponent } from './component/export-import/export-import.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { EditSupplierComponent } from './component/edit-supplier/edit-supplier.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:"login"
  },
  {
    component:RegisterComponent,
    path:"register"
  },
  {
    component: HomeComponent,
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        component: ProductsComponent,
        path: "products",
        canActivate: [AuthGuard]
      },
      {
        component: SupplierComponent,
        path: "supplier",
        canActivate: [AuthGuard]
      },
      {
        component: SalesOrderComponent,
        path: "sales-order",
        canActivate: [AuthGuard]
      },
      {
        component: PurchaseOrderComponent,
        path: "purchase-order",
        canActivate: [AuthGuard]
      },
      {
        component: ReportComponent,
        path: "report",
        canActivate: [AuthGuard]
      },
      {
        component: BarcodeComponent,
        path: "barcode",
        canActivate: [AuthGuard]
      },
      {
        component: ExportImportComponent,
        path: "export-import",
        canActivate: [AuthGuard]
      },
      {
        component: ProductDetailsComponent,
        path: "product-details/:id",
        canActivate: [AuthGuard]
      },
      {
        component: EditProductComponent,
        path: "edit-product/:id",
        canActivate: [AuthGuard]
      },
      {
        component: AddProductComponent,
        path: "add-product",
        canActivate: [AuthGuard]
      },
      {
        component:UserListComponent,
        path:"user-list",
        canActivate: [AuthGuard]
      },
      {
        component:EditSupplierComponent,
        path:'edit-supplier/:id',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
