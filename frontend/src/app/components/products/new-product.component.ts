// import { ProductoService } from '../../../../../../nestjs-frontend/src/app/services/producto.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  newProductForm: FormGroup;
  submitted = false
  productTypes: any[] = [];

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.getProductTypes();
      this.newProductForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: [0, Validators.required],
        productTypeId: [null, Validators.required],
      });
     }

  async onSubmit() {
    this.submitted = true
    console.log(this.newProductForm.value)
    if (this.newProductForm.invalid) {
      return;
    }
    try {
      await this.productService.createProduct(this.newProductForm.value);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger ms-3"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Product created!",
        text: "Your product has been created successfully.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Create another product",
        cancelButtonText: "Go back to products",
      }).then((result) => {
        if (result.isDismissed) {
          this.goBack();
        } 
      });
    } catch (error: any) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger",
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        icon: "error",
        title: "Oops...",
        text: error.error.message,
        confirmButtonText: "Close",
      });
    }
  }

  async getProductTypes() {
    try {
      this.productTypes = await this.productService.getProductTypes();
      return this.productTypes;
    } catch (err) {
      return err;
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

}
