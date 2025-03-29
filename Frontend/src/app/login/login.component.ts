import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';
  users: User[] = []; // List of users

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania użytkowników:', error);
      }
    });
  }

  onSubmit(): void {
    // Attempt to log in the user based on entered credentials.
    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.email === this.credentials.email && u.password === this.credentials.password);
      if (user) {
        if (user.id !== undefined && user.id !== null) {
          localStorage.setItem('userId', user.id.toString());
        }
        this.successMessage = 'Poprawnie zalogowano!';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      } else {
        this.errorMessage = 'Nieprawidłowe dane logowania';
        this.successMessage = '';
      }
    });
  }
}
