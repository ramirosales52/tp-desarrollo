import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { ProductI } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  tokenObject: {refreshToken: string, accessToken: string};

  constructor() { 
    this.tokenObject = JSON.parse(localStorage.getItem('token')??"{refreshToken:''}")
  }

  url = "http://localhost:3000";

  async createProduct(body: ProductI) {
    try {
      const response = (await axios.post(`${this.url}/products`,body , {
        headers: {
          "Authorization": this.tokenObject.accessToken,
          "Access-Control-Allow-Origin": "*",
        }
      })).data;
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProducts() {
    try {
      const response = (await axios.get(`${this.url}/products`, {
        headers: {
          "Authorization": this.tokenObject.accessToken,
          "Access-Control-Allow-Origin": "*",
        },
      })).data;
      return response
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProductTypes() {
    try {
      const response = (await axios.get(`${this.url}/product-types`, {
        headers: {
          "Authorization": this.tokenObject.accessToken,
          "Access-Control-Allow-Origin": "*",
        },
      })).data;
      return response
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
