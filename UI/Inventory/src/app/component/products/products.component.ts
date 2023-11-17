import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ActiveService } from 'src/app/service/active.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  loading: boolean = true;
  products:Array<any>=[];
  filteredProducts:Array<any>=[];
  constructor(private ps:ProductService,private as:ActiveService, public au:AuthService){
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
    this.products = this.products.filter(p => p.id !== id);
      this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
    this.ps.deleteProductsById(id).subscribe((response) => {
      this.products = this.products.filter(p => p.id !== id);
      this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
    }, (error) => {
      this.products = this.products.filter(p => p.id !== id);
      this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
    });
  }
  
  
}
