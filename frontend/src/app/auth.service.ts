import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginI, RegisterI, TokenI } from './interfaces/token';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';

  constructor(
    private router: Router
  ) {}

  async login(body: LoginI): Promise<TokenI> {
    try {
      const response = (await axios.post(`${this.url}/auth/login`, body)).data;
      localStorage.setItem('token', JSON.stringify(response));
      const time = moment(response.expirationTime).diff(moment());
      timer(time*0.5).subscribe(async () => {
        await this.refreshToken();
      });
      this.router.navigate(['/products']);
      return response;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  async register(body: RegisterI): Promise<void> {
    try {
      const response = (await axios.post(`${this.url}/auth/register`, body)).data;
      console.log(response)
      this.router.navigate(['/login']);
      return response;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  async refreshToken() {
    const tokenObject:{refreshToken: string, accessToken: string} = JSON.parse(localStorage.getItem('token')??"{refreshToken:''}")
    const response = (
      await axios.get(`${this.url}/auth/refresh-token`, {
        headers: {
          'refresh-token': tokenObject.refreshToken
        },
      })
    ).data;
    tokenObject.accessToken = response.accessToken
    localStorage.setItem('token', JSON.stringify(tokenObject));
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token')
    if (!token) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    const tokenObject: {refreshToken: string, accessToken: string} = JSON.parse(localStorage.getItem('token')??"{refreshToken:''}")
    if (!tokenObject) {
      return false;
    }
    const payload = tokenObject.accessToken.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.role;
    if (roles !== 'admin') {
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem('token')
  }

}
