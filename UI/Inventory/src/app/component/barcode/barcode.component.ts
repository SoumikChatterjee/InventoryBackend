import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Result,BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent {
  constructor(private ps:ProductService, private router: Router)
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