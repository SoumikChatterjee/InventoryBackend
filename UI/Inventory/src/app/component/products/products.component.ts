import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ActiveService } from 'src/app/service/active.service';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
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
  constructor(private ps:ProductService,private as:ActiveService, public au:AuthService, private ss:SupplierService, private os:OrderService){

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
  refreshProducts()
  {
    this.ps.getAllProducts().subscribe((data)=>{
      console.log(data);
      this.loading = false;
      this.filteredProducts=data;
      this.products=data;
    })
  }
  deleteProduct(id: string) {
    let orders:Array<any>;
    this.os.getAllOrders().subscribe(o=>{
      orders=o;
      orders=orders.filter(order=>order.item===id)
      console.log("Deleting product db");
      
      console.log(orders);
      orders.forEach(order=>{

        this.os.deleteOrdersById(order.id).subscribe(r=>{},(error)=>{});
      })
      
    })

    var pro=this.products.filter(p=>p.id===id);
    this.ss.deleteProducts(pro[0].manufacturer,id).subscribe(r=>{
    },(error)=>{
      this.ss.getSupplierByName(pro[0].manufacturer).subscribe(supplier=>{        
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

  order(id:string)
  {
    alert("Item Added");
    let orders:Array<any>;
    this.os.getAllOrders().subscribe(r=>{
      orders=r
      console.log(orders);
      
      orders=orders.filter(order=>{
       if(order.item===id){
        if((order.userType==='Admin'||order.userType==='Manager')&&(this.au.user.role==='Admin'||this.au.user.role==='Manager'))
        {
          return true;
          
        }
        else if(order.userType==='User'&&this.au.user.role==='User'){
          if(order.userEmail===this.au.user.email)
          return true;
          else
          return false;
        }
        else
        {
          return false;
        }
       }
       else
       return false;
      })
      console.log(orders);
      
      if(orders.length===0)
      {        
        const date = new Date();
        this.os.postOrder({
          id:'',
          userEmail:this.au.user.email,
          userType:this.au.user.role,
          orderDate:`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          item:id,
          quantity:1
        }).subscribe(res=>{})
      }
      else
      {
        orders[0].quantity=orders[0].quantity+1;
        this.os.putOrderById(orders[0].id,orders[0]).subscribe(r=>{});
      }

      // Updating product stock
      if(this.au.user.role==='User')
      {
        
        this.ps.getProductsById(id).subscribe(r=>{
          r.quantity-=1;
          r.sold+=1;
          console.log(r);
          
          this.ps.putProductById(r.id,r).subscribe(r2=>{
            if(r.quantity===9)
            {
              console.log("refreshed");              
              this.refreshProducts();
            }
          });
        })
      }
      else
      {
        this.ps.getProductsById(id).subscribe(r=>{
          r.quantity+=1;
          console.log(r);

          this.ps.putProductById(r.id,r).subscribe(r2=>{
            if(r.quantity===10)
            {
              console.log("refreshed");              
              this.refreshProducts();
            }
          });
        })
      }      

    });
    
   
  } 
  deleteOrder(id:string)
  {
    alert("Item Deleted");
    let orders:Array<any>;
    this.os.getAllOrders().subscribe(r=>{
      orders=r
      console.log(orders);
      
      orders=orders.filter(order=>{
       if(order.item===id){
        if((order.userType==='Admin'||order.userType==='Manager')&&(this.au.user.role==='Admin'||this.au.user.role==='Manager'))
        {
          return true;
        }
        else if(order.userType==='User'&&this.au.user.role==='User'){
          if(order.userEmail===this.au.user.email)
          return true;
          else
          return false;
        }
        else
        {
          return false;
        }
       }
       else
       return false;
      })
      
      if(orders.length===0)
      {        
        
      }
      else
      {
        orders[0].quantity=orders[0].quantity-1;
        if(orders[0].quantity>0)
        {
          this.os.putOrderById(orders[0].id,orders[0]).subscribe(r=>{});
        }
        else
        {
          
          this.os.deleteOrdersById(orders[0].id).subscribe(r=>{},(error)=>{});
        }
      }

      //Updating product stock
      this.ps.getProductsById(id).subscribe(r=>{
        
        r.quantity+=1;
        r.sold-=1;
        
        this.ps.putProductById(r.id,r).subscribe(r2=>{
          if(r.quantity==10)
          {
            console.log("refreshed");            
            this.refreshProducts();
          }
        });
      })

    });
  }
}
