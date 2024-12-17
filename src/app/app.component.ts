import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/auth/login/login.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory-system-app';
  isLoggedIn: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/products']);
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  
}
