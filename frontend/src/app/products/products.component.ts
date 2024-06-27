import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import axios from "axios";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export class ProductsComponent {
  products: any[] = [];
  titles: any[] = [];
  excludedTitles: string[] = ["productTypeId"];

  constructor() {
    this.getProducts();
  }

  url = "http://localhost:3000/products";

  async getProducts() {
    try {
      const response = await axios.get(this.url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      this.products = response.data;
      this.titles = Object.keys(this.products[0]).filter(
        (header) => !this.excludedTitles.includes(header),
      );

      console.log(this.titles);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
}
