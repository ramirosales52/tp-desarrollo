import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import axios from "axios";
import { NavbarComponent } from "../../navbar/navbar.component";
import { ProductsService } from "../../products.service";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css",
})
export class ListComponent {
  products: any[] = [];
  isAdmin: boolean;

  constructor(
    private productService: ProductsService,
    private authService: AuthService
  ) { 
    this.isAdmin = this.authService.isAdmin();
    this.getProducts();
  }

  async getProducts() {
    try {
      this.products = await this.productService.getProducts();
    } catch (err) {
      console.log(err);
    }
  }
}
