import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id:any;
  product:any;
  constructor(private ar:ActivatedRoute,private ps:ProductService){
    ps.getProductsById(ar.snapshot.params['id']).subscribe(res=>{
      this.product=res;
      console.log(res);
      
    });
    
  }
}
