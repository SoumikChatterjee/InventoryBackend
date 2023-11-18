import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id:any;
  product:any;
  constructor(private ar:ActivatedRoute,private ps:ProductService,public au:AuthService){
    ps.getProductsById(ar.snapshot.params['id']).subscribe(res=>{
      this.product=res;
      console.log(res);
      
    });
    
  }
}
