import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { mixinHasStickyInput } from '@angular/cdk/table';
import { OrderService } from 'src/app/service/order.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  editFormGroup: FormGroup
  id: any;
  constructor(private ps: ProductService, private fb: FormBuilder, private ar: ActivatedRoute, private router: Router, private ss: SupplierService, private os: OrderService, private au: AuthService) {
    this.editFormGroup = fb.group({
      name: '',
      description: '',
      sku: '',
      manufacturer: '',
      category: '',
      price: '',
      quantity: '',
      images: '',
      priceAgreement: ''
    })
  }
  submit() {
    const newProduct = {
      id: '',
      name: this.editFormGroup.get('name')?.value ?? '',
      description: this.editFormGroup.get('description')?.value ?? '',
      sku: this.editFormGroup.get('sku')?.value ?? '',
      category: this.editFormGroup.get('category')?.value ?? '',
      manufacturer: this.editFormGroup.get('manufacturer')?.value ?? '',
      price: this.editFormGroup.get('price')?.value ?? 0,
      priceAgreement: this.editFormGroup.get('priceAgreement')?.value ?? 0,
      quantity: this.editFormGroup.get('quantity')?.value ?? 0,
      sold:0,
      images: [this.editFormGroup.get('images')?.value] ?? 0,
    }
    console.log(newProduct);
    this.ps.postProduct(newProduct).subscribe((response) => {
      console.log("After posting");

      console.log(response);


      alert('Product added successfully.');
      this.ss.getSupplierByName(newProduct.manufacturer).subscribe(res => {
        this.ss.addProducts(newProduct.manufacturer, response.id).subscribe(r => { });
      }, (error) => {
        this.ss.postSupplier({
          id: '',
          name: newProduct.manufacturer,
          email: '-',
          phone: '-',
          products: [response.id]
        }).subscribe(res => { });
      })
      this.router.navigate(['products']);

      const date = new Date();

      this.os.postOrder({
        id: '',
        userEmail: "-",
        userType: this.au.user.role,
        orderDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        item: response.id,
        quantity: response.quantity
      }).subscribe(res => { });
    })
  }
}
