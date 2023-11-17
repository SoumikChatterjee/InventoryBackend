import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier.service';
import { mixinHasStickyInput } from '@angular/cdk/table';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  editFormGroup: FormGroup
  data: any;
  id: any;
  constructor(private ps: ProductService, private fb: FormBuilder, private ar: ActivatedRoute, private router: Router, private ss: SupplierService) {
    this.editFormGroup = fb.group({
      name: '',
      description: '',
      sku: '',
      manufacturer: '',
      category: '',
      price: '',
      quantity: '',
      sold: '',
      images: ''
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
      quantity: this.editFormGroup.get('quantity')?.value ?? 0,
      sold: this.editFormGroup.get('sold')?.value ?? 0,
      images: [this.editFormGroup.get('images')?.value] ?? 0,
    }
    console.log(newProduct);
    this.ps.postProduct(newProduct).subscribe((response) => {
      console.log("After posting");
      
      console.log(response);
      
      
      alert('Product added successfully.');
      this.ss.getSupplierByName(newProduct.manufacturer).subscribe(res => {
        this.ss.addProducts(newProduct.manufacturer, response.id).subscribe(r=>{});
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
    })

    

  }
}
