import { Component } from '@angular/core';
import { ActiveService } from 'src/app/service/active.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products:Array<any>=[];
  filteredProducts:Array<any>=[];
  constructor(private ps:ProductService,private as:ActiveService){
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
      this.filteredProducts=data;
      this.products=data;
    })
  }
  
}
