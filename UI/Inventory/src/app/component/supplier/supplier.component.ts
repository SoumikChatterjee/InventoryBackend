import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {

  suppliers:any;

  constructor(private ss:SupplierService,public au:AuthService){
    ss.getAllSuppliers().subscribe((res)=>{
      this.suppliers=res;
      console.log(this.suppliers);
      
    })
  }

}
