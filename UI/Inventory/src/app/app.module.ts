import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './component/products/products.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { PurchaseOrderComponent } from './component/purchase-order/purchase-order.component';
import { SalesOrderComponent } from './component/sales-order/sales-order.component';
import { ReportComponent } from './component/report/report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { BarcodeComponent } from './component/barcode/barcode.component';
import { ExportImportComponent } from './component/export-import/export-import.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SupplierComponent,
    PurchaseOrderComponent,
    SalesOrderComponent,
    ReportComponent,
    BarcodeComponent,
    ExportImportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule, SidebarModule,ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
