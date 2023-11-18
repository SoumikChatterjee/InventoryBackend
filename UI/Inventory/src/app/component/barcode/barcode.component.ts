import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Result,BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent {
  constructor(private ps:ProductService, private router: Router,private os:OrderService,private au:AuthService,private ss:SupplierService)
  {}

  availableDevices: MediaDeviceInfo[] =[];
  currentDevice: MediaDeviceInfo|undefined;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];



  qrResultString: string="";


  clearResult(): void {
    this.qrResultString = "";
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(this.qrResultString);
    //Add the product in db
    this.ps.postProduct(JSON.parse(resultString)).subscribe((response) => {
      alert('Product added successfully.');

      const date=new Date();
      this.os.postOrder({
        id: '',
        userEmail: "-",
        userType: this.au.user.role,
        orderDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        item: response.id,
        quantity: response.quantity
      }).subscribe(res => { });

      this.ss.getSupplierByName(response.manufacturer).subscribe(res => {
        this.ss.addProducts(response.manufacturer, response.id).subscribe(r => { });
      }, (error) => {
        this.ss.postSupplier({
          id: '',
          name: response.manufacturer,
          email: '-',
          phone: '-',
          products: [response.id]
        }).subscribe(res => { });
      })

      this.router.navigate(['products']);
    })
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
  }



}