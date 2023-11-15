import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  editFormGroup: FormGroup
  data: any;
  id: any;
  constructor(private ps: ProductService, private fb: FormBuilder, private ar: ActivatedRoute, private router:Router) {
    this.id = ar.snapshot.params['id'];
    this.editFormGroup = fb.group({
      name: '',
      description: '',
      sku: '',
      manufacturer: '',
      category: '',
      price: '',
      quantity: '',
      sold: ''
    })
    this.ps.getProductsById(this.id).subscribe((res) => {
      this.data = res;
      this.fetchData();
    })
  }

  fetchData() {
    console.log(this.data);


    this.editFormGroup.patchValue({
      name: this.data.name,
      description: this.data.description,
      sku: this.data.sku,
      category: this.data.category,
      manufacturer: this.data.manufacturer,
      price: this.data.price,
      quantity: this.data.quantity,
      sold: this.data.sold
    });
  }
  submit() {
    const newProduct = {
      id: this.data.id,
      name: this.editFormGroup.get('name')?.value ?? '',
      description: this.editFormGroup.get('description')?.value ?? '',
      sku: this.editFormGroup.get('sku')?.value ?? '',
      category: this.editFormGroup.get('category')?.value ?? '',
      manufacturer: this.editFormGroup.get('manufacturer')?.value ?? '',
      price: this.editFormGroup.get('price')?.value ?? 0,
      quantity: this.editFormGroup.get('quantity')?.value ?? 0,
      sold: this.editFormGroup.get('sold')?.value ?? 0,
      images: this.data.images
    }
    console.log(newProduct);
    this.ps.putProductById(this.id,newProduct).subscribe((response) => {
      alert('Student updated successfully.');
      this.router.navigate(['products']);
    })

  }
}
