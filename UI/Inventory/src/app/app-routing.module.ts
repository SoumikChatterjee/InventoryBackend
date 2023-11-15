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

const routes: Routes = [
  {
    component:ProductsComponent,
    path:"products"
  },
  {
    component:SupplierComponent,
    path:"supplier"
  },
  {
    component:SalesOrderComponent,
    path:"sales-order"
  },
  {
    component:PurchaseOrderComponent,
    path:"purchase-order"
  },
  {
    component:ReportComponent,
    path:"report"
  },
  {
    component:BarcodeComponent,
    path:"barcode"
  },
  {
    component:ExportImportComponent,
    path:"export-import"
  },
  {
    component:ProductDetailsComponent,
    path:"product-details/:id"
  },
  {
    component: EditProductComponent,
    path:"edit-product/:id"
  },
  {
    component:AddProductComponent,
    path:"add-product"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
