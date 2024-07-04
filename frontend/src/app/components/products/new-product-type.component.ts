// import { ProductoService } from '../../../../../../nestjs-frontend/src/app/services/producto.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './new-product-type.component.html',
  styleUrls: ['./new-product-type.component.css']
})
export class NewProductTypeComponent {
  newProductTypeForm: FormGroup;
  submitted = false

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.newProductTypeForm = this.formBuilder.group({
        name: ['', Validators.required],
      });
     }

  async onSubmit() {
    this.submitted = true
    console.log(this.newProductTypeForm.value)
    if (this.newProductTypeForm.invalid) {
      return;
    }
    try {
      await this.productService.createProductType(this.newProductTypeForm.value);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger ms-3"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Product type created!",
        text: "Your product type has been created successfully.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Create another product type",
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

  goBack(): void {
    this.router.navigate(['/products']);
  }

}
