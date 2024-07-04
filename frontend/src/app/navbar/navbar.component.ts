import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogged: boolean;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLogged = this.authService.isLogged();
    this.isAdmin = this.authService.isAdmin();
   }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
