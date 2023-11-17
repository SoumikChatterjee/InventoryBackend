import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ActiveService } from 'src/app/service/active.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  loading: boolean = true;
  products:Array<any>=[];
  filteredProducts:Array<any>=[];
  constructor(private ps:ProductService,private as:ActiveService, public au:AuthService, private ss:SupplierService){
    as.mySubject.subscribe((res)=>{
      this.filteredProducts = this.products.filter((product) => {
        return product.name.toLowerCase().includes(res.toLowerCase());
      });
    })
  }
  ngOnInit()
  {
    this.ps.getAllProducts().subscribe((data)=>{
      console.log(data);
      this.loading = false;
      this.filteredProducts=data;
      this.products=data;
    })
  }
  deleteProduct(id: string) {
    var pro=this.products.filter(p=>p.id===id);
    this.ss.deleteProducts(pro[0].manufacturer,id).subscribe(r=>{
    },(error)=>{
      this.ss.getSupplierByName(pro[0].manufacturer).subscribe(supplier=>{
        console.log(supplier.products.length);
        
        if(supplier.products.length===0)
        {
          this.ss.deleteSuppliersById(supplier.id).subscribe(r=>{},(error)=>{});
        }
    });
    })
    this.products = this.products.filter(p => p.id !== id);
      this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
    this.ps.deleteProductsById(id).subscribe((response) => {
      
    }, (error) => {
            
    });
  }
  
  
}
