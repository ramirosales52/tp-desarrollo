export class Product {
  id?: number;
  name: string;
  price: number;
  productTypeId: number;

  constructor(name: string, price: number, productTypeId: number) {
      this.name = name;
      this.price = price;
      this.productTypeId = productTypeId;
  }
}